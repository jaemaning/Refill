import React from "react";
import { useNavigate } from "react-router-dom";

interface AProps {
  content: string;
  buttonName: string;
  connectNextLink: string;
  isValid?: boolean
}

interface BProps {
  content: string;
  subContent: string;
  isValid?: boolean
}

const A: React.FC<AProps> = ({ content, buttonName, connectNextLink}) => {
  const navigate = useNavigate();

  const onClickEvent = () => {
    navigate(connectNextLink);
  };

  return (
    <div className="flex justify-center text-center">
      <div>
        <div>
          <p className="lg:text-xl mb:text-lg">{content}</p>
        </div>
        <div className="py-4">
          <button
            onClick={onClickEvent}
            className="result-btn rounded-full w-52 h-10"
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

const B: React.FC<BProps> = ({ content, subContent }) => (
  <div className="lg:px-5 md:px-3 sm:px-1">
    <p className="lg:text-2xl md:text-xl sm:text-lg">{content}</p>
    <ul className="list-disc p-5 lg:text-lg md:text-base sm:text-sm">
      <li>{subContent}</li>
    </ul>
  </div>
);

interface ContentChildProps {
  service: boolean;
  content: string;
  subContent?: string;
  buttonName?: string;
  connectNextLink?: string;
}

const ContentChild: React.FC<ContentChildProps> = ({
  service,
  content,
  subContent,
  buttonName,
  connectNextLink,
}) => {
  return (
    <div>
      {service ? (
        <A
          content={content}
          buttonName={buttonName || ""}
          connectNextLink={connectNextLink || ""}
        />
      ) : (
        <B content={content} subContent={subContent || ""} />
      )}
    </div>
  );
};
export default ContentChild;
