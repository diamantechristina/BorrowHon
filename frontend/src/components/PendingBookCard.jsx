import { Box, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import "@fontsource/arimo";
import { useState } from "react";
import PendingConfirm from "./PendingConfirm";

const PendingBookCard = ({ book, account, history }) => {
  const [open, setOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const handleDeclineOpen = () => setDeclineOpen(true);
  const handleOpen = () => setOpen(true);
  return (
    <Box
      sx={{
        width: "20vw",
        height: "60vh",
        objectFit: "contain",
        background:
          book?.coverImage !== undefined
            ? `url(${book?.coverImage})`
            : 'url("src/resources/defaultCover.png")',
        backgroundColor: "#225560",
        backgroundSize: book?.coverImage !== undefined ? "cover" : "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        borderRadius: "20px",
        flexDirection: "column",
        justifyContent: "flex-end",
        transition: "300ms",
        "&:hover": {
          transform: "scale(1.025)",
        },
        boxShadow: "0px 0px 20px 3px rgba(34,85,96,0.9)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "50%",
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "left",
          borderRadius: "20px",
          transition: "300ms",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "clamp(0.75rem, 1.125rem, 1.5rem)",
            fontFamily: "Montserrat",
            fontWeight: "900",
            color: "#f4f4f4",
            paddingX: "1vw",
            marginBottom: "0.75vh",
          }}
          gutterBottom
        >
          {book?.title.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: "clamp(0.5rem, 0.75rem, 1rem)",
            color: "#f4f4f4",
            paddingLeft: "1vw",
            marginBottom: "2vh",
          }}
        >
          {account?.firstName} {account?.lastName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "1vh",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleOpen}
            sx={{
              color: "#f4f4f4",
              borderRadius: "20px",
              width: "8vw",
              borderColor: "#f4f4f4",
              "&:hover": {
                borderColor: "#f4f4f4",
              },
              fontFamily: "Arimo",
              fontWeight: "bold",
              fontSize: "clamp(0.5rem, 0.75rem, 1rem)",
              textTransform: "none",
            }}
          >
            Accept
          </Button>
          <PendingConfirm
            open={open}
            setOpen={setOpen}
            book={book}
            account={account}
            userHistory={history}
            pageTitle={"Accept Pending"}
          />
          <Button
            variant="outlined"
            onClick={handleDeclineOpen}
            sx={{
              color: "#f4f4f4",
              borderRadius: "20px",
              width: "8vw",
              borderColor: "#f4f4f4",
              "&:hover": {
                borderColor: "#f4f4f4",
              },
              fontFamily: "Arimo",
              fontWeight: "bold",
              fontSize: "clamp(0.5rem, 0.75rem, 1rem)",
              textTransform: "none",
            }}
          >
            Decline
          </Button>
          <PendingConfirm
            open={declineOpen}
            setOpen={setDeclineOpen}
            book={book}
            account={account}
            userHistory={history}
            pageTitle={"Decline Pending"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PendingBookCard;
