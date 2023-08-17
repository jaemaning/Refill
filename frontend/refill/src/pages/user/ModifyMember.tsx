import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Container, Grid } from "@mui/material";
import "../../styles/Loginsignup.css";
import styled from "@emotion/styled";
import Button from "components/elements/Button";

declare global {
  interface Window {
    daum: any;
  }
}

interface Addr {
  address: string;
}

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

const Addressbutton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #142cf9;
  color: #fff;
  border: 1 solid transparent;
  border-radius: 7px;
  cursor: pointer;
  outline: none;
  font-weight: 600;
  transition:
    background 0.2s ease,
    color 0.1s ease;
  line-height: 26px;
  font-size: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
`;

interface ModifyModal {
  open: boolean;
  handleMOpen: () => void;
  handleMClose: () => void;
  name: string;
  address: string;
  birthday: string;
  tel: string;
  nickname: string;
  email: string;
  onModify: (formData: any) => void;
  profile: string;
  userData: any;
  setuserData: any;
}

interface InputImageState {
  profileImg: File | null;
}

const ModifyMember: React.FC<ModifyModal> = ({
  open,
  handleMOpen,
  handleMClose,
  name,
  address,
  birthday,
  tel,
  nickname,
  email,
  onModify,
  profile,
  userData,
  setuserData,
}) => {
  const [inputData, setInputData] = useState({
    address: "",
  });

  const changeInput = (e: any) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const changeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  function stringToFile(content: string, filename: string): File {
    const blob = new Blob([content], { type: "image/png" });
    return new File([blob], filename);
  }

  const modifysubmit = () => {
    const memberInfoUpdateRequest = {
      name: userData.name,
      address: addcheck
        ? (document.getElementById("addr") as HTMLInputElement).value +
          ", " +
          inputData.address
        : userData.address,
      birthDay: userData.birthDay,
      tel: userData.tel,
      nickname: userData.nickname,
      email: userData.email,
    };

    console.log(memberInfoUpdateRequest);

    const json = JSON.stringify(memberInfoUpdateRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });
    const formData = new FormData();

    formData.append("memberInfoUpdateRequest", jsonBlob);
    if (inputImage.profileImg) {
      console.log(inputImage.profileImg);
      formData.append("profileImg", inputImage.profileImg);
    } else {
      formData.append(
        "profileImg",
        stringToFile("profileImg", userData.profile),
      );
    }

    console.log(formData);
    onModify(formData);
    handleMClose();
  };
  //

  const defaultValueRef = useRef();

  useEffect(() => {
    defaultValueRef.current = userData;
    console.log(defaultValueRef.current);
  }, []);

  const closeModal = () => {
    setuserData(defaultValueRef.current);
    handleMClose();
  };

  const [inputImage, setInputImage] = useState<InputImageState>({
    profileImg: null,
  });

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // 선택한 파일을 가져옵니다. 없으면 null로 설정합니다.

    setInputImage((prevInputImage: any) => ({
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

  const [addcheck, setAddcheck] = useState(false);
  const onClickAddr = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAddcheck(true);
    new window.daum.Postcode({
      oncomplete: function (data: Addr) {
        (document.getElementById("addr") as HTMLInputElement).value =
          data.address;
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };

  return (
    <div>
      <div>
        <Button
          content="정보 수정"
          variant="menuSelected"
          width="80px"
          onClick={handleMOpen}
        />
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
              회원정보 수정하기
            </p>
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
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="name"
                  value={userData.name}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">생년월일</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="birthday"
                  value={userData.birthDay}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">전화번호</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="tel"
                  value={userData.tel}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">닉네임</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="nickname"
                  value={userData.nickname}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">이메일</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="email"
                  value={userData.email}
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
                  value={userData.profile}
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
                <h1 className="text-lg font-bold">주소</h1>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="addr"
                  readOnly
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={userData.address}
                ></input>
              </Grid>
              <Grid item xs={2}>
                <Addressbutton
                  style={{
                    backgroundColor: "#142CF9",
                    height: "41.6px",
                    width: "78.91px",
                  }}
                  onClick={onClickAddr}
                >
                  조회
                </Addressbutton>
              </Grid>
              {addcheck && (
                <Container className="mt-3">
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <h1 className="text-lg font-bold">상세주소</h1>
                    </Grid>
                    <Grid item xs={8}>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        onChange={(e) => {
                          changeAddress(e);
                        }}
                        name="address"
                        style={{ marginLeft: "7px", width: "448px" }}
                        value={inputData.address}
                      ></input>
                    </Grid>
                  </Grid>
                </Container>
              )}
            </Grid>

            <div className="flex justify-end pt-2">
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

export default ModifyMember;
