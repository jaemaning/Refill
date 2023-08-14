import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import Rating from "@mui/material/Rating";

const StyleContainer = styled.div`
  display: grid;
  padding: 30px;
  background-color: white;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50px 1fr 50px;
  align-items: center;
  justify-items: center;
  width: 700px;
  background-color: #e8ffea;
  border-radius: 5px;
`;

const StyleReviewContainer = styled.div`
  display: grid;
  padding: 30px;
  background-color: white;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50px 50px 1fr 50px;
  align-items: center;
  justify-items: center;
  width: 700px;
  background-color: #e8ffea;
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

const StyleRating = styled(Rating)`
  grid-column: 1 / 4;
  /* width: 100%;
  min-height: 100px; */
`;

type OutModalProps = {
  consultingId: number;
  consultingDetailInfo?: string;
  consultingReviewInfo?: string;
  sessionPk: string;
  leaveSession: () => void;
};

const ReviewModal: React.FC<OutModalProps> = (props) => {
  const ismember = useSelector((state: RootState) => state.login.ismember);
  const ishospital = useSelector((state: RootState) => state.login.ishospital);
  const loginToken = useSelector((state: RootState) => state.login.token);

  const [detailText, setDetailText] = React.useState(
    props.consultingDetailInfo || "",
  );
  const [reviewText, setReviewText] = React.useState(
    props.consultingReviewInfo || "",
  );
  const [score, setScore] = React.useState<number | null>(0);

  const reviewUrl = "api/v1/review";
  const doctorDatailUrl = "";

  const handleRating = (
    event: React.ChangeEvent<unknown>,
    val: number | null,
  ) => {
    if (val) {
      console.log(score);
      setScore(val);
    }
    console.log(val);
  };

  const submitReview = () => {
    console.log(score);
    console.log("a??");
    // if (reviewText) {
    //   axios
    //   .post(
    //     url,
    //     {content : reviewText},
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${loginToken}`,
    //       }
    //     }
    //   )
    //   .then(async () => {
    //     await handleOpenReportSuccessModal()
    //     await openAlert(1500)
    //     props.onClose()
    //   })
    //   .catch((error) => {
    //     console.log("에러:", error);
    //   });
    // } else {
    //   alert('리뷰 내용을 작성해주세요.')
    // }
  };

  const submitDoctorPaper = () => {
    if (detailText) {
      axios
        .post(
          "api/v1/consulting/leave",
          {
            consultingId: props.consultingId,
            sessionId: props.sessionPk,
            consultingDetailInfo: detailText, // 이건 상담 기록 내용
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginToken}`,
            },
          },
        )
        .then((response) => {
          console.log(response.data);
          props.leaveSession();
        })
        .catch((error) => {
          console.log("에러:", error);
        });
    } else {
      alert("소견서 내용을 작성해주세요.");
    }
  };

  const handleOut = () => {
    console.log("나가기");
  };

  const handleReturn = () => {
    console.log("상담 돌아가기");
  };

  const handleReviewChange = (event: any) => {
    setReviewText(event.target.value);
  };

  const handleDetailChange = (event: any) => {
    setDetailText(event.target.value);
  };

  return (
    <>
      {ismember ? (
        <Box>
          <StyleReviewContainer>
            <Header>
              <CheckIcon fontSize="large" sx={{ color: "green" }} />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "700", justifySelf: "left" }}
              >
                상담 리뷰를 남겨 주세요!
              </Typography>
              <div></div>
            </Header>
            <StyleRating
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              sx={{ fontSize: "50px" }}
              onChange={handleRating}
            />
            <StyledTextarea
              value={reviewText}
              onChange={handleReviewChange}
              placeholder="리뷰를 작성해주세요."
            />
            <Footer>
              <div> </div>
              <Button
                onClick={submitReview}
                variant="contained"
                color="primary"
              >
                확인
              </Button>
            </Footer>
          </StyleReviewContainer>
        </Box>
      ) : (
        <Box>
          <StyleContainer>
            <Header>
              <CheckIcon fontSize="large" sx={{ color: "green" }} />
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "700", justifySelf: "left" }}
              >
                상담 소견서 작성 해주세요
              </Typography>
              <div></div>
            </Header>
            <StyledTextarea
              value={detailText}
              onChange={handleDetailChange}
              placeholder="상담 소견서를 작성해주세요."
            />
            <Footer>
              <div></div>
              <Button
                onClick={submitDoctorPaper}
                variant="contained"
                color="primary"
              >
                확인
              </Button>
            </Footer>
          </StyleContainer>
        </Box>
      )}
    </>
  );
};

export default ReviewModal;
