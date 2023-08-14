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

const Main = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 4;
  min-height: 70px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #505050;
`;

type OutModalProps = {
  onClose: () => void;
  onOpen: () => void;
};

const OutModal: React.FC<OutModalProps> = (props) => {
  const ismember = useSelector((state: RootState) => state.login.ismember);
  const ishospital = useSelector((state: RootState) => state.login.ishospital);

  const [text, setText] = React.useState("");

  const handleOut = async () => {
    if (ismember) {
      await props.onOpen();
      console.log("리뷰페이지로 이동");
      await props.onClose();
    } else if (ishospital) {
      console.log("소견서 작성 페이지로 이동");
      await props.onClose();
    }
  };

  const handleReturn = () => {
    console.log("상담 돌아가기");
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
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
              sx={{ fontWeight: "700", justifySelf: "left", minWidth: "400px" }}
            >
              현재 상담이 진행 중입니다. 상담을 종료 하시겠습니까?
            </Typography>
            <CloseIcon
              onClick={props.onClose}
              sx={{ cursor: "pointer" }}
              fontSize="large"
            />
          </Header>
          <Main>
            * 상담 진행중 상담을 일방적으로 종료시 추후 서비스 이용에 어려움이
            있을 수 있습니다.
          </Main>
          <Footer>
            <Button onClick={props.onClose} variant="contained" color="primary">
              상담으로 돌아가기
            </Button>
            <Button onClick={handleOut} variant="contained" color="error">
              상담 종료
            </Button>
          </Footer>
        </StyleContainer>
      </Box>
    </>
  );
};

export default OutModal;
