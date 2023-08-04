import React from "react";

interface titleProps {
  title: string;
}

const HeadAID: React.FC<titleProps> = ({ title }) => {
  return (
    <div>
      <div className="title-large-box flex items-center justify-center">
        <h1 className="ai-diagnosis-title text-6xl">{title}</h1>
      </div>
      <div className="flex justify-center">
        <hr className="title-hr sm:min-w-full md:w-11/12 lg:w-5/6" />
      </div>
    </div>
  );
};
export default HeadAID;
