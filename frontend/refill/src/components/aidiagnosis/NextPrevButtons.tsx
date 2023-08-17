import React, { useState } from "react";
import axios from "axios";
import Button from "components/elements/Button";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import LoaderModal from "components/LoaderModal";
import NotCheckModal from "./children/NotCheckModal";

interface LinkProps {
  nextLink: string;
  arrayString?: string;
  imgFile?: File | null;
  isResult?: boolean;
  // open일 경우 에러 뜸
}

const NextPrevButtons: React.FC<LinkProps> = ({
  nextLink = "",
  isResult = false,
  imgFile,
  arrayString,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [notCheckedNumbers, setNotCheckedNumbers] = useState<number[]>(Array);
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false)

  const [loading, setLoading] = useState(false);
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
      const convertToEnglishName = (filename: string) => {
        const extension = filename.split(".").pop();
        const nameWithoutExtension = filename.replace(`.${extension}`, "");

        const englishName = Array.from(nameWithoutExtension)
          .map((char) => {
            return String.fromCharCode(97 + (char.charCodeAt(0) % 26));
          })
          .join("");

        return `${englishName}.${extension}`;
      };

      const newFileName = convertToEnglishName(imgFile.name);
      const newFile = new File([imgFile], newFileName, { type: imgFile.type });
      formData.append("hairImg", newFile);
    }
    axios
      .post("api/v1/diagnosis/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("ok");
        return response.data;
      })
      .then((response) => {
        setLoading(true);
        console.log("ok");
        const jsonData = response;
        const newJsonDataString = JSON.stringify(jsonData);
        navigate(nextLink, { state: { jsonDataString: newJsonDataString } });
      })
      .catch((err) => {
        setIsError(false)
        console.log(err.response.data);
      });
  };

  const ConnectNextLink = () => {
    if (isResult) {
      handleSubmit();
    } else {
      // 여기서 전부 선택했는지 확인해야됨
      // arrayString에 N이 있으면 아직 고르지 않은 문항이 있습니다. 문항 번호 모달로 보여주기

      const notCheckedIndices: number[] = [];

      // arrayString이 실제로 존재할 때만 실행
      if (arrayString) {
        for (let i = 0; i < arrayString.length; i++) {
          if (arrayString.charAt(i) === "N") {
            // 인덱스 번호 + 1을 해서 notCheckedIndices에 추가
            notCheckedIndices.push(i + 1);
          }
        }
      }

      if (notCheckedIndices.length > 0) {
        setIsValid(false);
        setNotCheckedNumbers(notCheckedIndices);
        setOpenModal(true);
      } else {
        setIsValid(true);
        navigate(nextLink, { state: { arrayString } }); // 이동할 경로 전달
      }
    }
  };

  return (
    <div className="flex justify-center mt-2.5">
      {loading ? <LoaderModal /> : <></>}
      {openModal ? (
        <NotCheckModal
          notCheckedNumbers={notCheckedNumbers}
          setOpenModal={setOpenModal}
        />
      ) : (
        <></>
      )}
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
