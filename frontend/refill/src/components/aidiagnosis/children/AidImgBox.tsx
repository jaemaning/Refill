import React from "react";

interface ImgProps {
  title: string;
  src: string;
  content?: string;
  colorClassName?: string;
}

const AidImgBox: React.FC<ImgProps> = ({
  title,
  src,
  content,
  colorClassName = "normal-class-color",
}) => {
  return (
    <div className="aid-img-box text-center content-center">
      <div
        className={`aid-img-title h-1/4 flex items-center justify-center rounded-t-xl ${colorClassName}`}
      >
        <div className="aid-img-text text-2xl">
          <p>{title}</p>
          <p>{content}</p>
        </div>
      </div>
      <img src={src} className="aid-img-img h-3/4 w-full" />
    </div>
  );
};
export default AidImgBox;
