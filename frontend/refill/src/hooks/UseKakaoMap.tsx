import { useState, useEffect } from "react";

export const useKakaoMapScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
      script.onload = () => setScriptLoaded(true);
      script.async = true;
      document.head.appendChild(script);
      console.log(scriptLoaded);
    } else {
      setScriptLoaded(true);
    }
  }, []);
};
