import React from "react";
import axios from "axios";
import Button from "components/elements/Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const ConnectPrevLink = () => {
    navigate(-1);
  };

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
    console.log(arrayString);
    axios
      .post("api/v1/diagnosis/", formData, {
        headers: {
          Authorization:
            "Bearer" +
            " eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoibWVtYmVyMCIsInJvbGUiOiJST0xFX01FTUJFUiIsImlhdCI6MTY5MTEzMzU1MSwiZXhwIjoxNjkxMTM3MTUxfQ.Ab0PfVAXpp2o0rvWG4bfxNTg5HfxNBxjFJLH4Vqo76A",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("ok");
        console.log(response.data);
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
      if (arrayString) {
        navigate(nextLink, { state: { arrayString } }); // 이동할 경로 전달
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
