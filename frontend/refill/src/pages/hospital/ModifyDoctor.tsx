import React, { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Container, Grid } from "@mui/material";
import "../../styles/Loginsignup.css";
import styled from "@emotion/styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Clickbutton = styled.button`
  width: 90px;
  color: white;
  font-size: 15px;
  border: 1px solid;
  height: 40px;
  border-radius: 5px;
`;

interface ModifyModal {
  open: boolean;
  handleMOpen: () => void;
  handleMClose: () => void;
  description: string;
  education: string[];
  major: string[];
  profile: string;
  hospitalname: string;
  onModify: (formData: any) => void;
}

interface InputImageState {
  profileImg: File | null;
}

const ModifyDoctor: React.FC<ModifyModal> = ({
  open,
  handleMOpen,
  handleMClose,
  description,
  education,
  major,
  profile,
  hospitalname,
  onModify,
}) => {
  const [inputData, setInputData] = useState({
    description: description,
    educationBackgrounds: education,
    majorAreas: major,
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const [inputImage, setInputImage] = useState<InputImageState>({
    profileImg: null,
  });

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // 선택한 파일을 가져옵니다. 없으면 null로 설정합니다.

    setInputImage((prevInputImage) => ({
      ...prevInputImage,
      [e.target.name]: file,
    }));
    if (file) {
      if (e.target.name === "profileImg") {
        (document.getElementById("profilename") as HTMLInputElement).value =
          file.name;
      }
    }
  };

  const modifysubmit = () => {
    const temp = FinalModify();
    // onModifyDoctorSubmit 콜백 함수 호출 시 수정된 formData 전달
    onModify(temp);
  };

  function stringToFile(content: string, filename: string): File {
    const blob = new Blob([content], { type: "image/jpeg" });
    return new File([blob], filename);
  }

  const [eString, seteString] = useState("");
  const [mString, setmString] = useState("");

  useEffect(() => {
    const educationString: string = inputData.educationBackgrounds.join(",");
    const majorString: string = inputData.majorAreas.join(",");

    seteString(educationString);
    setmString(majorString);
  }, []);

  const handleEStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    seteString(event.target.value);
  };

  const handleMStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmString(event.target.value);
  };

  const FinalModify = () => {
    const tempEdu: string[] = eString.split(",");
    const tempMaj: string[] = mString.split(",");

    const doctorUpdateRequest = {
      description: inputData.description,
      educationBackgrounds: tempEdu,
      majorAreas: tempMaj,
    };

    const json = JSON.stringify(doctorUpdateRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });
    const formData = new FormData();

    formData.append("doctorUpdateRequest", jsonBlob);
    if (inputImage.profileImg) {
      formData.append(
        "profileImg",
        `https://ssafyfinal.s3.ap-northeast-2.amazonaws.com/${inputImage.profileImg}`,
      );
    } else {
      const filename = `${profile}`;
      const test = stringToFile(profile, filename);
      formData.append("profileImg", test);
    }
    return formData;
  };

  return (
    <div>
      <div onClick={handleMOpen}>
        <EditNoteIcon sx={{ fontSize: 35 }} className="cursor-pointer" />
      </div>
      <Modal
        open={open}
        onClose={handleMClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <div className="flex justify-between my-3 pb-4">
            <p className="text-xl" style={{ color: "#20A4F3" }}>
              {hospitalname}
            </p>
            <p className="text-xl">의사 수정하기</p>
          </div>
          <Container>
            <Grid container spacing={3} className="my-10">
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">약력</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="description"
                  value={inputData.description}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">프로필사진</h1>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="profilename"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder={profile}
                ></input>
              </Grid>
              <Grid item xs={2}>
                <label htmlFor="profileImg" className="file-input-btn">
                  업로드
                  <input
                    type="file"
                    accept="image/*"
                    id="profileImg"
                    name="profileImg"
                    className="file-input"
                    onChange={handleImgChange}
                  />
                </label>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">학력</h1>
              </Grid>
              <Grid item xs={8}>
                <div className="flex-col">
                  <input
                    id="educationBackgrounds"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={eString}
                    onChange={handleEStringChange}
                  ></input>
                </div>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">주요분야</h1>
              </Grid>
              <Grid item xs={8}>
                <div className="flex-col">
                  <input
                    id="majorAreas"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={mString}
                    onChange={handleMStringChange}
                  ></input>
                </div>
              </Grid>
            </Grid>

            <div className="flex justify-end pt-2">
              <Clickbutton
                style={{ backgroundColor: "#20A4F3" }}
                onClick={FinalModify}
              >
                수정적용
              </Clickbutton>
              <Clickbutton
                style={{ backgroundColor: "#2E5077" }}
                onClick={modifysubmit}
              >
                수정하기
              </Clickbutton>
              <Clickbutton
                className="ml-4"
                style={{ backgroundColor: "#F8A300" }}
                onClick={handleMClose}
              >
                취소하기
              </Clickbutton>
            </div>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default ModifyDoctor;
