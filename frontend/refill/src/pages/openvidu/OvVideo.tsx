import React, { useEffect, useRef } from "react";

interface OpenViduVideoComponentProps {
  streamManager: {
    addVideoElement: (element: HTMLVideoElement | null) => void;
  };
  customStyle?: React.CSSProperties;
}

const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = ({
  streamManager,
  customStyle,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const addVideoElement = () => {
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  };

  const resultStyle = {
    width: "100%",
    height: "auto",
    float: "left" as const,
    cursor: "pointer",
    ...customStyle,
  };

  useEffect(() => {
    addVideoElement();
  }, [streamManager]);

  return <video autoPlay={true} ref={videoRef} style={resultStyle} />;
};

export default OpenViduVideoComponent;
