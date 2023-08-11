import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Error {
  message: string;
  open: boolean;
  onClose: () => void;
}

const LoginSignupModal: React.FC<Error> = ({ message, open, onClose }) => {
  console.log(open);
  console.log("success");
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center items-center">
            <span className="text-2xl font-bold">{message}</span>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginSignupModal;
