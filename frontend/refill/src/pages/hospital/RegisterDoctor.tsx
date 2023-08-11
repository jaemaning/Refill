import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";

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

interface RegisterModal {
  open: boolean;
  handleMOpen: () => void;
  handleMClose: () => void;
  hospitalname: string;
}

interface InputImageState {
  profileImg: File | null;
  licenseImg: File | null;
}

const RegisterDoctor: React.FC<RegisterModal> = ({
  open,
  handleMOpen,
  handleMClose,
  hospitalname,
}) => {
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    educationBackgrounds: [],
    majorAreas: [],
    licenseNumber: "",
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const [inputImage, setInputImage] = useState<InputImageState>({
    profileImg: null,
    licenseImg: null,
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
      } else if (e.target.name === "licenseImg") {
        (document.getElementById("regname") as HTMLInputElement).value =
          file.name;
      }
    }
  };

  const [ecount, setEcount] = useState(0);
  const [mcount, setMcount] = useState(0);

  // const addEducationBackground = () => {
  //   setInputData({
  //     ...inputData,
  //     educationBackgrounds: [...inputData.educationBackgrounds, ""],
  //   });

  // };

  // const addMajorArea = () => {
  //   setInputData({
  //     ...inputData,
  //     majorAreas: [...inputData.majorAreas, ""],
  //   });
  // };

  return (
    <div>
      <Button onClick={handleMOpen}>
        <span className="text-2xl font-bold text-black">의사 등록하기</span>
      </Button>
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
            <p className="text-xl">의사 등록하기</p>
          </div>
          <Container>
            <Grid container spacing={3} className="my-10">
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">이름</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="이름을 입력해주세요"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="name"
                  value={inputData.name}
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
                  placeholder="프로필 사진을 등록해주세요"
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
                <h1 className="text-lg font-bold">면허번호</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="면허번호를 입력해주세요"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="licenseNumber"
                  value={inputData.licenseNumber}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">면허사진</h1>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="licenseImg"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="면허 사진을 등록해주세요"
                ></input>
              </Grid>
              <Grid item xs={2}>
                <label htmlFor="licenseImg" className="file-input-btn">
                  업로드
                  <input
                    type="file"
                    accept="image/*"
                    id="licenseImg"
                    name="licenseImg"
                    className="file-input"
                    onChange={handleImgChange}
                  />
                </label>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">약력</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="한 줄로 간단한게 작성해주세요"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="description"
                  value={inputData.description}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">학력</h1>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="educationBackgrounds"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="면허 사진을 등록해주세요"
                ></input>
              </Grid>
              <Grid item xs={2}>
                <label htmlFor="licenseImg" className="file-input-btn">
                  업로드
                  <input
                    type="file"
                    accept="image/*"
                    id="licenseImg"
                    name="licenseImg"
                    className="file-input"
                    onChange={handleImgChange}
                  />
                </label>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterDoctor;
