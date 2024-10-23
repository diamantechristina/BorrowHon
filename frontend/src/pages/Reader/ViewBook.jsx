import { set } from "mongoose";
import React, { useState } from "react";
import { Modal, Backdrop, Box } from "@mui/material";


const ViewBook = () => {
  const [openModal, setOpenModal] = useState(true);


  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={openModal}
      onClose={handleCloseModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        "& .MuiBox-root": {
          border: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          height: "70vh",
          bgcolor: "#225560",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#F4F4F4",
          flexDirection: "column",
          // overflow: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F4F4F4",
            width: "70%",
            height: "100%",
            left: 0,
            position: "absolute",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        ></Box>
        <Box
          sx={{
            backgroundColor: "#F4F4F4",
            width: "20%",
            height: "100%",
            right: 0,
            position: "absolute",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        ></Box>
      </Box>
    </Modal>
  );
};

export default ViewBook;
