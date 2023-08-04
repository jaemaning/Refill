import React, { ChangeEvent, useState } from "react";

interface UploadImgItemProps {
  onChange: (file: File | null) => void;
}

const UploadImgItem: React.FC<UploadImgItemProps> = ({ onChange }) => {
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
    } else {
      setPreview(null);
    }

    onChange(file); // 선택된 파일을 부모 컴포넌트로 전달
  };
  return (
    <div className="flex justify-center mt-5">
      <div className="img-upload-box">
        <div className="img-upload-small-box flex justify-center">
          <img
            src={preview ? preview : "#"}
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
