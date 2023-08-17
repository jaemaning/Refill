import React from "react";
import Right from "assets/aidiagnosis/right_img.png";
import Wrong from "assets/aidiagnosis/wrong_img.png";
import Wrong1 from "assets/aidiagnosis/wrong_img2.png";
import Wrong2 from "assets/aidiagnosis/wrong_img3.png";

import AidImgBox from "./children/AidImgBox";

const PhotoGuideLine: React.FC = () => {
  return (
    <div className="aid-pgl-box grid lg:grid-cols-4 lg:gap-6 md:grid-cols-3 md:gap-6 sm: grid-cols-2 sm:gap-6 font-black text-white">
      <AidImgBox
        src={Right}
        title="올바른 사진 등록 예시"
        colorClassName="bg-green-600"
      />
      <AidImgBox
        src={Wrong}
        title="부적절한 사진 등록 예시"
        content="흐린 사진"
      />
      <AidImgBox
        src={Wrong1}
        title="부적절한 사진 등록 예시"
        content="배경이 보이는 사진"
      />
      <AidImgBox
        src={Wrong2}
        title="부적절한 사진 등록 예시"
        content="탈색한 머리"
      />
    </div>
  );
};
export default PhotoGuideLine;
