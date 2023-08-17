from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.layers import Dropout
from PIL import Image, ImageOps
import cv2
import numpy as np
import pickle
import io

app = Flask(__name__)

class TrainingDropout(Dropout):
    def call(self, inputs, **kwargs):
        return super().call(inputs, training=True)

# Load the models
model = load_model('final_model.h5', custom_objects={'TrainingDropout': TrainingDropout}, compile=False)
teachable_model = load_model("keras_model.h5", compile=False)

# Load the label encoders
with open('label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the request
    image_data = request.files['image'].read()

    # Convert the binary data to an image
    image = Image.open(io.BytesIO(image_data))

    # Convert the image to an array and preprocess for the original model
    image_array = img_to_array(image)
    image_array = cv2.resize(image_array, (224, 224))
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    # Make predictions using the original model
    predictions = []
    for i in range(100):
        predictions += [model.predict([image_array])]

    predictions = np.array(predictions)
    mean = np.mean(predictions, axis=0)
    var = np.var(predictions, axis=0)
    average_variance = np.mean(var)
    epsilon = 1e-7
    uncertainty = 0
    for i in range(7):
        uncertainty += np.log(mean[:, i] + epsilon) * mean[:, i]
    uncertainty = -uncertainty
    predicted_label = np.argmax(mean)
    class_label = label_encoder.inverse_transform([predicted_label])
    certainty = (1 - uncertainty) * 100
    certainty_from_variance = (1 - average_variance) * 100
    certainty_from_variance_rounded = round(certainty_from_variance, 1)

    size = (224, 224);
    teachable_image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    teachable_image_array = np.asarray(teachable_image)

    normalized_image_array = (teachable_image_array.astype(np.float32) / 127.5) - 1
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    data[0] = normalized_image_array

    teachable_pre = teachable_model.predict(data)
    confidence_score = teachable_pre[0][0]
    confidence_score_percent = round(confidence_score * 100, 1)



    # # Process the image for the teachable machine model
    # teachable_image_array = np.asarray(image_array)  # 이미지 객체에서 배열로 바로 변환
    # normalized_teachable_image_array = (teachable_image_array.astype(np.float32) / 127.5) - 1
    # data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    # data[0] = normalized_teachable_image_array
    #
    # # Make prediction using the teachable machine model
    # teachable_prediction = teachable_model.predict(data)
    # teachable_confidence_score = teachable_prediction[0][0]
    # teachable_confidence_score_percent = round(teachable_confidence_score * 100, 1)

    # Return the combined results
    result = {
        'result': class_label[0],
        'certainty': str(certainty_from_variance_rounded),
        'modelConfidence': str(confidence_score_percent)
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run()