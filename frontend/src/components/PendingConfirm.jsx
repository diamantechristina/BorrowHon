import { Modal, Box, Backdrop, Typography, Button } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/200.css";
import { useBook } from "../library/book.js";
import { useHistory } from "../library/history.js";
import { useNotification } from "../library/notification.js";
import { useSnackbar } from "../library/snackbar.js";

const PendingConfirm = ({
  open,
  setOpen,
  pageTitle,
  book,
  account,
  userHistory,
}) => {
  const {setOpenSnackbar, setSnackbarSuccess, setSnackbarMessage} = useSnackbar();

  const { updateBook } = useBook();
  const { fetchHistory, updateHistory, deleteHistory, history } = useHistory();
  const { createNotification } = useNotification();
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);



  const handleClose = () => setOpen(false);
  const [titleHover, setTitleHover] = useState(false);
  const handleTitleHover = useMemo(() => {
    return () => setTitleHover(true);
  }, [titleHover]);
  const handleTitleLeave = useMemo(() => {
    return () => setTitleHover(false);
  }, [titleHover]);

  const handleUpdateBook = async (id, book) => {
    const { success, message } = await updateBook(id, book);
    console.log("Success:", success);
    console.log("Message:", message);
  };

  const handleUpdateHistory = async (id, history) => {
    const { success, message } = await updateHistory(id, history);
    console.log("Success:", success);
    console.log("Message:", message);
  };

  const handleDeleteHistory = async (acc_id, history) => {
    const { success, message } = await deleteHistory(history._id);
    console.log("Success:", success);
    console.log("Message:", message);
    handleNotification(acc_id,"Book Request Declined", `Your book request for ${book.title} has been declined!`);
    setOpen !== null ? setOpen(false) : () => {};
  };

  const handleNotification = async (acc_id,title, messages) => {
    const { success, message } = await createNotification({
      acc_id: acc_id,
      title: title,
      message: messages,
      date: new Date(),
    })
  }

  const handleAcceptPending = () => {
    const pendingHistories = history.filter((item) => item.status === "pending" && item.book_id === book.book_id && item.acc_id !== account.acc_id);
    console.log("pendingHistories: ", pendingHistories);
    const updatedBook = { ...book };
    updatedBook.status = "unavailable";
    const updatedUserHistory = { ...userHistory };
    updatedUserHistory.status = "onhand";
    updatedUserHistory.borrowdate = borrowDate;
    updatedUserHistory.returndate = returnDate;
    pendingHistories.map(async (history) => {
      handleDeleteHistory(history.acc_id, history);
    });
    handleUpdateBook(updatedBook._id, updatedBook);
    handleUpdateHistory(updatedUserHistory._id, updatedUserHistory);
    setOpenSnackbar(true);
    setSnackbarSuccess(true);
    setSnackbarMessage("Book request Accepted!");

    handleNotification(updatedUserHistory.acc_id,"Book Request Accepted", `Your book request for ${book.title} has been accepted!`);
    setOpen !== null ? setOpen(false) : () => {};
  };

  const handleDeclinePending = () => {
    handleDeleteHistory(userHistory.acc_id,userHistory)
    setOpenSnackbar(true);
    setSnackbarSuccess(true);
    setSnackbarMessage("Book request Declined!");
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const borrowDate = `${month} ${day}, ${year}`;
  const returnDate = `${month} ${day + 5}, ${year}`;

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "52.5vw",
          height: "80vh",
          bgcolor: "#225560",
          boxShadow: 24,
          p: 4,
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#F4F4F4",
          flexDirection: "column",
          tabindex: "-1",
        }}
      >
        <i
          class="fi fi-bs-cross-small"
          style={{ fontSize: "2vw", cursor: "pointer", position: "absolute", top: "1vh", right: "1vh" }}
          onClick={handleClose}
        ></i>
        <Box>
          <Typography
            sx={{
              color: "#F4F4F4",
              fontFamily: "Montserrat",
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              fontWeight: "bold",
              width: "100%",
              height: "100%",
              display: "flex",
              marginTop: "-1.5vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pageTitle.toUpperCase()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              marginTop: "5vh",
            }}
          >
            <Box
              sx={{
                marginLeft: "1vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "16vw",
                height: "55vh",
                objectFit: "contain",
                background:
                  book?.coverImage !== undefined
                    ? `url(${book?.coverImage})`
                    : 'url("src/resources/defaultCover.png")',
                backgroundColor: "#225560",
                backgroundSize:
                  book?.coverImage !== undefined ? "cover" : "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "80vw",
              height: "60vh",
              flexDirection: "column",
              paddingLeft: "1vw",
              marginTop: "-3vh",
            }}
          >
            <Box
              sx={{
                width: "29vw",
                overflow: "hidden",
              }}
            >
              {book?.title.length > 17 ? (
                <Typography
                  onMouseEnter={handleTitleHover}
                  onMouseLeave={handleTitleLeave}
                  sx={{
                    "@keyframes text-overflow": {
                      "0%": {
                        transform: "translateX(0%)",
                      },
                      "50%": {
                        transform: `translateX(-${
                          6.2 * (book?.title.length - 17)
                        }%)`,
                      },
                      "100%": {
                        transform: "translateX(0%)",
                      },
                    },

                    color: "#F4F4F4",
                    fontFamily: "Montserrat",
                    fontSize: "clamp(1.5rem, 2.75vw, 2.5rem)",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    animation: "none",
                    textOverflow: titleHover ? "none" : "ellipsis",
                    "&:hover": {
                      overflow: "visible",
                      transition: "3000ms",
                      animation: "text-overflow 10s linear infinite",
                    },
                  }}
                >
                  {book?.title.toUpperCase()}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontFamily: "Montserrat",
                    fontSize: "clamp(1.5rem, 2.75vw, 2.5rem)",
                    fontWeight: "600",
                  }}
                >
                  {book?.title.toUpperCase()}
                </Typography>
              )}
            </Box>
            <Typography
              sx={{
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(0.5rem, 1vw, 1.5rem)",
                fontWeight: "300",
              }}
            >
              {book?.genre}
            </Typography>
            <Typography
              sx={{
                marginTop: "1vh",
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1rem, 1.45vw, 1.75rem)",
                fontWeight: "500",
              }}
            >
              {book?.author}
            </Typography>
            <Box
              sx={{
                marginTop: "3vh",
                width: "25vw",
                height: "0.1vh",
                backgroundColor: "#F4F4F4",
              }}
            />
            <Typography
              sx={{
                marginTop: "2.5vh",
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1.5rem, 1.65vw, 2.5rem)",
                fontWeight: "600",
              }}
            >
              {account?.firstName} {account?.lastName}
            </Typography>
            <Typography
              sx={{
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1rem, 1vw, 1.75rem)",
                fontWeight: "200",
              }}
            >
              {account?.username}
            </Typography>
            <Typography
              sx={{
                marginTop: "3vh",
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1rem, 1vw, 1.75rem)",
                fontWeight: "500",
              }}
            >
              Date of Borrow
            </Typography>
            <Typography
              sx={{
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1.25rem, 1.25vw, 2rem)",
                fontWeight: "300",
              }}
            >
              {borrowDate}
            </Typography>
            <Typography
              sx={{
                marginTop: "3.5vh",
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1rem, 1vw, 1.75rem)",
                fontWeight: "500",
              }}
            >
              Date of Return
            </Typography>
            <Typography
              sx={{
                color: "#F4F4F4",
                fontFamily: "Montserrat",
                fontSize: "clamp(1.25rem, 1.25vw, 2rem)",
                fontWeight: "300",
              }}
            >
              {returnDate}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={
              pageTitle === "Accept Pending"
                ? handleAcceptPending
                : handleDeclinePending
            }
            sx={{
              backgroundColor: "#1FAA70",
              color: "#F4F4F4",
              borderRadius: "15px",
              height: "7.5vh",
              width: "12.5vw",
              textTransform: "none",
              fontFamily: "Montserrat",
              fontSize: "clamp(1rem, 1.25vw, 1.5rem)",
              fontWeight: "600",
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PendingConfirm;
