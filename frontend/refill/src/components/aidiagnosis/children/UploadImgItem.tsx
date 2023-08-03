import React, { ChangeEvent, useState } from "react";

interface InputImageState {
  uploadImg: File | null;
}

const UploadImgItem: React.FC = () => {
  const [inputImage, setInputImage] = useState<InputImageState>({
    uploadImg: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // 선택한 파일을 가져옵니다. 없으면 null로 설정합니다.

    setInputImage({
      uploadImg: file,
    });

    // file reader to generate a preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="img-upload-box">
        <div className="img-upload-small-box flex justify-center">
          <img
            src={preview ? preview : '#'}
            alt={preview ? "Selected Image" : "사진을 업로드 해주세요."}
            className="img-upload-img"
          />
        </div>
        <div className="img-upload-input">
          <div className="upload-img-item">
            <label htmlFor="uploadImg">
              사진을 선택해 주세요
              <input
                type="file"
                id="uploadImg"
                onChange={handleImgChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImgItem;
