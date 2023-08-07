import React, { useEffect, useRef } from 'react';

interface OpenViduVideoComponentProps {
    streamManager: {
        addVideoElement: (element: HTMLVideoElement | null) => void;
    };
}

const OpenViduVideoComponent: React.FC<OpenViduVideoComponentProps> = ({ streamManager }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const addVideoElement = () => {
        if (videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    };

    useEffect(() => {
        addVideoElement();
    }, [streamManager]);

    return <video autoPlay={true} ref={videoRef} style={{ width: '100%', height: 'auto', float: 'left', cursor: 'pointer' }} />;
};

export default OpenViduVideoComponent;
