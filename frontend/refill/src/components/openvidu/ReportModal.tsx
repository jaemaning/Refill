import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import Modal from "@mui/material/Modal";
import ReportSuccessModal from "components/openvidu/ReportSuccessModal";

const StyleContainer = styled.div`
  display: grid;
  padding: 30px;
  background-color: white;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50px 1fr 50px;
  align-items: center;
  justify-items: center;
  width: 700px;
  background-color: #e8c2c2;
  border-radius: 5px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  grid-column: 1 / 4;
  width: 100%;
  min-height: 100px;
  resize: none;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 20px;
`;

const Header = styled.div`
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Footer = styled.div`
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

type ReportModalProps = {
  onClose: () => void;
  consultingId: number;
};

const ReportModal: React.FC<ReportModalProps> = (props) => {
  const loginToken = useSelector((state: RootState) => state.login.token);

  const [openReporSuccesstModal, setOpenReportSuccessModal] =
    React.useState(false);
  const handleOpenReportSuccessModal = () => setOpenReportSuccessModal(true);

  const url = `api/v1/consulting/report/${props.consultingId}`;

  const openAlert = (timeToDelay: number) =>
    new Promise((handleCloseReportSuccessModal) =>
      setTimeout(handleCloseReportSuccessModal, timeToDelay),
    );

  const submitReport = () => {
    console.log(props.consultingId);
    console.log(url);
    console.log(text);
    if (text) {
      axios
        .post(
          url,
          { content: text },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginToken}`,
            },
          },
        )
        .then(async () => {
          await handleOpenReportSuccessModal();

          await openAlert(1500);

          props.onClose();
        })
        .catch((error) => {
          console.log("에러:", error);
        });
    } else {
      alert("신고 내용을 작성해주세요.");
    }
  };

  const [text, setText] = React.useState("");

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const asdf = () => {
    setOpenReportSuccessModal(true);
  };

  return (
    <>
      <Box>
        <StyleContainer>
          <Header>
            <ReportGmailerrorredIcon color="warning" fontSize="large" />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "700", justifySelf: "left", color: "red" }}
            >
              신고하기
            </Typography>
            <CloseIcon
              fontSize="large"
              onClick={props.onClose}
              sx={{ cursor: "pointer" }}
            />
          </Header>
          <StyledTextarea
            value={text}
            onChange={handleChange}
            placeholder="시고사유를 적어주세요."
          />
          <Footer>
            <Button onClick={props.onClose} variant="contained" color="warning">
              취소하기
            </Button>
            <Button onClick={submitReport} variant="contained" color="error">
              신고하기
            </Button>
          </Footer>
        </StyleContainer>
        <Modal
          open={openReporSuccesstModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReportSuccessModal></ReportSuccessModal>
        </Modal>
      </Box>
    </>
  );
};

export default ReportModal;
