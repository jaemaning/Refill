import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/material/TextareaAutosize';


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
  border-radius : 5px;
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

type OutModalProps = {
  consultingId : number;
  consultingDetailInfo? : string;
  consultingReviewInfo? : string;
};

const ReviewModal : React.FC<OutModalProps> = (props) => {

  const ismember = useSelector((state: RootState) => state.login.ismember);
  const ishospital = useSelector((state: RootState) => state.login.ishospital);

  const [detailText, setDetailText] = React.useState(props.consultingDetailInfo || '');
  const [reviewText, setReviewText] = React.useState(props.consultingReviewInfo || '');

  const handleOut = () => {
    console.log('나가기');
  };

  const handleReturn = () => {
    console.log('상담 돌아가기');
  };

  const handleReviewChange = (event : any) => {
    setReviewText(event.target.value);
  };

  const handleDetailChange = (event : any) => {
    setDetailText(event.target.value);
  };


  return (
    <>
    {
      ismember ?
      <Box>
        <StyleContainer>
          <Header>
            <CheckIcon fontSize='large' sx={{color: 'green'}} />
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: '700', justifySelf: 'left'}}>
              상담 리뷰를 남겨 주세요!
            </Typography>
            <CloseIcon fontSize='large' sx={{cursor: 'pointer'}} />
          </Header>
          <StyledTextarea value={reviewText} onChange={handleReviewChange} placeholder="리뷰를 작성해주세요." />
          <Footer>
          <div> </div>
            <Button onClick={handleOut} variant="contained" color="primary">
              확인
            </Button>
          </Footer>
        </StyleContainer>
      </Box>
      :
      <Box>
        <StyleContainer>
          <Header>
            <CheckIcon fontSize='large' color='warning' />
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: '700', justifySelf: 'left'}}>
              상담 소견서 작성 해주세요
            </Typography>
            <CloseIcon fontSize='large' sx={{cursor: 'pointer'}} />
          </Header>
          <StyledTextarea value={detailText} onChange={handleDetailChange} placeholder="상담 소견서를 작성해주세요." />
          <Footer>
            <div></div>
            <Button onClick={handleOut} variant="contained" color="primary">
              확인
            </Button>
          </Footer>
        </StyleContainer>
      </Box>
    }
    </>
  );
};

export default ReviewModal;
