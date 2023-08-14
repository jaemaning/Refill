import React, { ChangeEvent, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../../components/elements/Button";
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

interface ChangepwyModal {
  open: boolean;
  handleMOpen: () => void;
  handleMClose: () => void;
  onChangemember: (data: any) => void;
  children: never[];
}

const ChangePassword: React.FC<ChangepwyModal> = ({
  open,
  handleMOpen,
  handleMClose,
  onChangemember,
}) => {
  const [inputData, setInputData] = useState({
    oldpw: "",
    newpw: "",
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const inputdata = () => {
    const data = {
      oldPassword: inputData.oldpw,
      newPassword: inputData.newpw,
    };

    return data;
  };

  const changesubmit = () => {
    const temp = inputdata();

    onChangemember(temp);
  };

  return (
    <div>
      <Button
        content="변경하기"
        variant="menuSelected"
        width="80px"
        onClick={handleMOpen}
      />
      <Modal
        open={open}
        onClose={handleMClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <div className="flex justify-between my-3 pb-4">
            <p className="text-xl" style={{ color: "#20A4F3" }}>
              비밀번호 변경하기
            </p>
          </div>
          <Container>
            <Grid container spacing={3} className="my-10">
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">이전 비밀번호</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="oldpw"
                  value={inputData.oldpw}
                ></input>
              </Grid>
              <Grid item xs={4}>
                <h1 className="text-lg font-bold">새 비밀번호</h1>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                  name="newpw"
                  value={inputData.newpw}
                ></input>
              </Grid>
            </Grid>
            <Clickbutton
              style={{ backgroundColor: "#F8A300" }}
              onClick={changesubmit}
            >
              변경하기
            </Clickbutton>
            <Clickbutton
              className="ml-4"
              style={{ backgroundColor: "#EA4643" }}
              onClick={handleMClose}
            >
              취소하기
            </Clickbutton>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangePassword;
