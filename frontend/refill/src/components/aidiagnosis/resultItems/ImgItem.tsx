import React from "react";

interface ImgItemProps {
  colStart: string;
  colEnd: string;
  src: string;
  title: string;
  content?: string;
}

const ImgItem: React.FC<ImgItemProps> = ({
  src,
  title,
  colStart,
  colEnd,
  content,
}) => {
  return (
    <div className={`${colStart} ${colEnd} font-black text-white`}>
      <div className="mb-2">
        <p className="p-2 text-3xl">{title}</p>
      </div>
      <div className="w-full aspect-square">
        <img src={src} alt="noHave" className="rounded-xl w-full h-full" />
      </div>
      <p className="p-2">{content}</p>
    </div>
  );
};
export default ImgItem;
