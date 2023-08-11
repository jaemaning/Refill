import { useState, useEffect } from "react";

export const useKakaoMapScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
      script.onload = () => setScriptLoaded(true);
      script.async = true;
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  return scriptLoaded; // 이 값을 반환하여 커스텀 훅 사용자가 알 수 있도록 합니다.
};