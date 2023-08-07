import React, { ChangeEvent, useState } from "react";

interface UploadImgProps {
  doctorName: string;
  selectedDate: string;
  selectedTime: string;
}

const UploadImg: React.FC<UploadImgProps> = ({
  doctorName,
  selectedDate,
  selectedTime,
}) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // file reader to generate a preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImgFile(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div>
      <hr className="border-2 border-black my-2" />
      <hr className="border-2 border-black my-2" />

      <hr className="border-2 border-black my-2" />
      <div className="flex justify-center mt-5">
        <div>
          <div className="flex justify-center">
            <img
              src={preview ? preview : "#"}
              alt={preview ? "Selected Image" : "사진을 업로드 해주세요."}
              className="h-64"
            />
          </div>
          <div>
            <div>
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
      <hr className="border-2 border-black my-2" />
    </div>
  );
};

export default UploadImg;
