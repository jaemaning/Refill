import React, { useState } from "react";
import axios from "axios";
import Button from "components/elements/Button";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";

interface LinkProps {
  nextLink: string;
  arrayString?: string;
  imgFile?: File | null;
  isResult?: boolean;
}

const NextPrevButtons: React.FC<LinkProps> = ({
  nextLink = "",
  isResult = false,
  imgFile,
  arrayString,
}) => {
  // 탈모진행도, 정확도 useState
  // const [hairLossScore, setHairLossScore] = useState(0)
  // const [certainty, setCertainty] = useState(0)
  // const [diagnosisImage, setDiagnosisImage] = useState("")

  const [jsonDataString, setJsonDataString] = useState({});

  const navigate = useNavigate();

  const ConnectPrevLink = () => {
    navigate(-1);
  };
  const token = useSelector((state: RootState) => state.login.token);
  const handleSubmit = () => {
    const aiDiagnosisRequest = {
      surveyResult: arrayString,
    };

    const json = JSON.stringify(aiDiagnosisRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });

    const formData = new FormData();
    formData.append("aiDiagnosisRequest", jsonBlob);

    if (imgFile) {
      formData.append("hairImg", imgFile);
    }
    axios
      .post("api/v1/diagnosis/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("ok");
        console.log(response.data);
        const jsonData = response.data;
        const newJsonDataString = JSON.stringify(jsonData);
        setJsonDataString(newJsonDataString); // Update jsonDataString state // Update jsonDataString state
        // setHairLossScore(response.data.hairLossScore)
        // setCertainty(response.data.certainty)
        // setDiagnosisImage(response.data.diagnosisImage)
      })
      .catch((err) => {
        console.log(aiDiagnosisRequest);
        console.log(err.response.data);
      });
  };

  const ConnectNextLink = () => {
    if (isResult) {
      console.log(isResult);
      console.log(imgFile);
      console.log(arrayString);
      handleSubmit();

      navigate(nextLink);
    } else {
      if (jsonDataString) {
        navigate(nextLink, { state: { jsonDataString } }); // 이동할 경로 전달
      } else {
        navigate(nextLink);
      }
    }
  };

  return (
    <div className="flex justify-center mt-2.5">
      <div className="next-prev-buttons-box flex justify-end sm:min-w-full md:w-11/12 lg:w-5/6">
        <div className="mr-2.5">
          <Button
            variant="danger"
            content="이전 페이지"
            onClick={ConnectPrevLink}
          />
        </div>

        <Button content="다음 페이지" onClick={ConnectNextLink} />
      </div>
    </div>
  );
};
export default NextPrevButtons;
