import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Container, Grid } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { red } from "@mui/material/colors";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

const Clickbutton = styled.button`
  width: 90px;
  color: white;
  font-size: 15px;
  border: 1px solid;
  height: 40px;
  border-radius: 5px;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffcdd2",
  border: "2px solid #ef9a9a",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface DeleteModal {
  open: boolean;
  handleMOpen: () => void;
  handleMClose: () => void;
  hospitalname: string;
  doctorname: string;
  onDeleteDoctor: () => void;
}

const DeleteDoctor: React.FC<DeleteModal> = ({
  open,
  handleMOpen,
  handleMClose,
  hospitalname,
  doctorname,
  onDeleteDoctor,
}) => {
  console.log(doctorname);
  console.log(hospitalname);
  return (
    <div>
      <div onClick={handleMOpen}>
        <DisabledByDefaultIcon
          sx={{ fontSize: 35, color: red[600] }}
          className="cursor-pointer"
        />
      </div>
      <Modal
        open={open}
        onClose={handleMClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }} className="rounded-lg">
          <div className="flex justify-between my-3 pb-4">
            <div className="flex justify-center items-center">
              <ReportGmailerrorredIcon
                sx={{ fontSize: 35, color: red[500] }}
              ></ReportGmailerrorredIcon>
              <p className="text-xl ml-3">
                {hospitalname} - {doctorname} 의사
              </p>
            </div>
            <CloseIcon
              onClick={handleMClose}
              className="cursor-pointer"
              sx={{ fontSize: 35 }}
            />
          </div>
          <Container>
            <div className="flex justify-center itmes-center">
              <span className="text-3xl font-bold">
                정말로 삭제 하시겠습니까?
              </span>
            </div>
            <div className="flex justify-end pt-10">
              <Clickbutton
                style={{ backgroundColor: "#EA4643" }}
                onClick={() => onDeleteDoctor()}
              >
                삭제하기
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

export default DeleteDoctor;
