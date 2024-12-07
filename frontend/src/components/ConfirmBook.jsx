import React, { useEffect } from "react";
import { Box, Typography, Button, Modal, Backdrop } from "@mui/material";
import { useBook } from "../library/book.js";
import { useSnackbar } from "../library/snackbar.js";
import { set } from "mongoose";

const ConfirmBook = ({
  pageTitle,
  confirmOpen,
  setOpen,
  setConfirmOpen,
  handleHover,
  newBook,
  handleCloseModal
}) => {
  const { createBook, deleteBook, updateBook } = useBook();
  const { setOpenSnackbar, setSnackbarSuccess, setSnackbarMessage } =
    useSnackbar();

  useEffect(() => {
    if (pageTitle === "Confirm Book") console.log("Confirm Book: ", newBook);
  });
  const handleClose = () => {
    setConfirmOpen(false);
  };
  const handleAddBook = async () => {
    const updatedBook = { ...newBook, genre:newBook.genre.includes(", ") ? newBook.genre.split(", ").map((genre) => genre.trim()) : newBook.genre.trim() };
    const { success, message } = await createBook(updatedBook);
    console.log("Success:", success);
    console.log("Message:", message);
    handleCloseModal();
    setConfirmOpen(false);
    setOpenSnackbar(true);

    setSnackbarSuccess(success);
    setSnackbarMessage(message);
    setOpen !== null ? setOpen(false) : () => {};
  };
  const handleDeleteBook = async () => {
    setOpenSnackbar(true);
    if (newBook.status === "unavailable") {
      setSnackbarMessage("Book is currently being borrowed.");
      setSnackbarSuccess(false);
      return;
    }
    const { success, message } = await deleteBook(newBook._id);
    setConfirmOpen(false);
    setSnackbarSuccess(success);
    setSnackbarMessage(message);
    // setOpen !== null ? setOpen(false) : () => {};
    const setOpenFunction = setOpen !== null ? () => setOpen(false) : () => {};
  };

  const handleUpdateBook = async () => {
    const updatedBook = { ...newBook, genre:newBook.genre.includes(", ") ? newBook.genre.split(", ").map((genre) => genre.trim()) : newBook.genre.trim() };
    const { success, message } = await updateBook(updatedBook._id, updatedBook);
    console.log("Success:", success);
    console.log("Message:", message);
    setConfirmOpen(false);
    setOpenSnackbar(true);
    setSnackbarSuccess(success);
    setSnackbarMessage(message);
    setOpen !== null ? setOpen(false) : () => {};
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    if (handleHover) handleHover(false);
  };

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={confirmOpen}
      onClose={handleConfirmClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "80vh",
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
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "0vh",
            marginTop: "-3.5vh",
            marginRight: "-3.5vw",
          }}
        >
          <i
            className="fi fi-bs-cross-small"
            style={{ fontSize: "2vw", cursor: "pointer" }}
            onClick={handleClose}
          ></i>
        </Box>
        <Typography
          sx={{
            fontSize: "4vw",
            fontWeight: "bold",
            fontFamily: "montserrat",
          }}
        >
          {pageTitle.toUpperCase()}
        </Typography>
        <Box
          sx={{
            width: "60vw",
            maxHeight: "50vh",
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "30vw",
              height: "inherit",
            }}
          >
            <Box
              sx={{
                height: "50vh",
                backgroundImage: newBook.coverImage
                  ? `url(${newBook.coverImage})`
                  : 'url("src/resources/defaultCover.png")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                mx: "1.5vw",
                marginTop: !newBook.coverImage ? "10vh" : "",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              width: "50vw",
              height: "inherit",
              color: "#F4F4F4",
              marginRight: "2vw",
            }}
          >
            <Typography
              sx={{
                fontSize: "2.5vw",
                fontWeight: "bold",
                fontFamily: "montserrat",
                textTransform: "uppercase",
              }}
            >
              {newBook.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "montserrat",
              }}
            >
              {newBook.genre}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.5vw",
                fontWeight: "bold",
                fontFamily: "montserrat",
              }}
            >
              {newBook.author}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "montserrat",
                my: "2vh",
              }}
            >
              ISBN: {newBook.isbn}
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "#F4F4F4",
                my: "2vh",
              }}
            ></Box>

            <Box
              sx={{
                overflow: "hidden",
                maxHeight: "15vh",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "15vh",
                  overflow: "scroll",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1vw",
                    fontFamily: "montserrat",
                    textAlign: "justify",
                  }}
                >
                  {newBook.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "clamp(10rem, 12vw, 40rem)",
            height: "70px",
            borderRadius: "20px",
            bgcolor: "#1FAA70",
            color: "#F4F4F4",
            "&:hover": {
              bgcolor: "#4dc995",
              color: "#F4F4F4",
              boxShadow: "none",
            },
            fontFamily: "Montserrat",
            fontWeight: "bold",
            boxShadow: "none",
            textTransform: "none",
            fontSize: "18px",
          }}
          tabIndex={-1}
          onClick={
            pageTitle === "Confirm Add Book"
              ? handleAddBook
              : pageTitle === "Delete Book"
              ? handleDeleteBook
              : handleUpdateBook
          }
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmBook;
