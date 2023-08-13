import * as React from "react";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";

const ReportSuccessModal = () => {
  return (
    <>
      <Box>
        <Alert severity="info">신고가 접수되었습니다!</Alert>
      </Box>
    </>
  );
};

export default ReportSuccessModal;
