import React, { useState, useEffect } from "react";
import { Modal, Backdrop, Box, Typography, Button } from "@mui/material";
import Resizer from "react-image-file-resizer";
import { TextField, styled } from "@mui/material";
import ConfirmAddBook from "./ConfirmBook.jsx";
import { useSnackbar } from "../library/snackbar.js";

const ManageBook = ({
  open,
  setOpen,
  pageTitle,
  confirmPageTitle,
  handleHover,
  book,
}) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    coverImage: "",
  });
  const { setOpenSnackbar, setSnackbarSuccess, setSnackbarMessage } =
    useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClose = () => {
    setNewBook({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      coverImage: "",
    });
    setOpen(false);
    if (handleHover) handleHover(false);
  };

  const handleConfirmOpen = () => {
    if (
      book === undefined &&
      (newBook.title.trim() === "" ||
        newBook.author.trim() === "" ||
        newBook.genre.trim() === "" ||
        newBook.isbn.trim() === "" ||
        newBook.description.trim() === "")
    ) {
      setOpenSnackbar(true);
      setSnackbarSuccess(false);
      setSnackbarMessage("Please fill in all fields!");
      return;
    }
    if (
      book?.title.trim() === "" ||
      book?.author.trim() === "" ||
      book?.genre.trim() === "" ||
      book?.isbn.trim() === "" ||
      book?.description.trim() === ""
    ) {
      setOpenSnackbar(true);
      setSnackbarSuccess(false);
      setSnackbarMessage("Please fill in all fields!");
      return;
    }
    if (isNaN(newBook.isbn)) {
      setOpenSnackbar(true);
      setSnackbarSuccess(false);
      setSnackbarMessage("Invalid ISBN!");
      return;
    }
    setConfirmOpen(true);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      setSnackbarMessage("Invalid image format!");
      setSnackbarSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    const image = await resizeFile(file);
    setNewBook((prevBook) => ({
      ...prevBook,
      coverImage: image,
    }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (book !== undefined) {
      book[name] = value;
    }

    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const onChange = async (event) => {
    const file = event.target.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      setSnackbarMessage("Invalid image format!");
      setSnackbarSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    const image = await resizeFile(file);
    setNewBook((prevBook) => ({
      ...prevBook,
      coverImage: image,
    }));
  };
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={typeof open === "boolean" ? open : true}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ tabindex: "-1" }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "65vw",
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
          className="fi fi-bs-cross-small"
          style={{
            fontSize: "2vw",
            cursor: "pointer",
            position: "absolute",
            top: "1vh",
            right: "1vh",
          }}
          onClick={handleClose}
        ></i>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "montserrat",
          }}
        >
          {pageTitle.toUpperCase()}
        </Typography>
        <Box
          sx={{
            width: "55vw",
            height: "65vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "50vw",
              height: "inherit",
              display: "flex",
              alignItems: "left",
              flexDirection: "column",
              gap: "2px",
              paddingLeft: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                paddingTop: "30px",
                fontFamily: "arimo",
                color: "#F4F4F4",
              }}
            >
              Cover Image
            </Typography>
            <Box
              sx={{
                height: "50vh",
                width: "250px",
                borderRadius: "20px",
                border: (
                  book !== undefined ? book.coverImage : newBook.coverImage
                )
                  ? "3px solid transparent"
                  : "3px dashed #F4F4F4",
                marginRight: "50px",
                marginBottom: "20px",
              }}
            >
              <Button
                component="label"
                role={undefined}
                name="coverImage"
                variant="contained"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onChange={onChange}
                sx={{
                  height: "inherit",
                  width: "inherit",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius:
                    book?.coverImage || newBook?.coverImage ? "0px" : "20px",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  fontSize: "18px",
                  backgroundImage: `url(${
                    book !== undefined ? book.coverImage : newBook.coverImage
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  "&:hover": {
                    boxShadow: "none",
                  },
                  boxShadow: "none",
                }}
              >
                {(book !== undefined ? book.coverImage : newBook.coverImage) ? (
                  ""
                ) : (
                  <>
                    <img
                      src="src/resources/upload.png"
                      alt=""
                      style={{
                        filter: "grayscale(1)",
                      }}
                    />
                    Drag & Drop Here
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50px",
                          height: "1px",
                          backgroundColor: "#F4F4F4",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      ></Box>
                      OR
                      <Box
                        sx={{
                          width: "50px",
                          height: "1px",
                          backgroundColor: "#F4F4F4",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      ></Box>
                    </Box>
                    Upload an Image
                  </>
                )}
                <VisuallyHiddenInput
                  type="file"
                  onChange={async (event) => {
                    image = await resizeFile(event.target.files[0]);
                    setNewBook((prevBook) => ({
                      ...prevBook,
                      coverImage: image,
                    }));
                  }}
                  multiple
                />
              </Button>
            </Box>
          </Box>
          <Box
            component={"form"}
            sx={{
              width: "50vw",
              height: "inherit",
              display: "flex",
              justifyContent: "center",
              alignItems: "left",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              required
              type="text"
              variant="outlined"
              label="Title"
              name="title"
              value={book === undefined ? newBook.title : book.title}
              onChange={handleInputChange}
              InputLabelProps={{ required: false }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#F4F4F4",
                  paddingLeft: "6px",
                  fontFamily: "arimo",
                  paddingTop: "2px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#F4F4F4",
                },
                "& .MuiOutlinedInput-root": {
                  width: "clamp(10rem, 25vw, 40rem)",
                  height: "60px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                  tabindex: "1",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F4F4F4", // border color
                  borderRadius: "20px", // border radius
                  borderWidth: "2px", // border width
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // focus border color
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // hover border color
                  },
              }}
              InputProps={{
                style: {
                  color: "#F4F4F4",
                  fontFamily: "arimo",
                },
              }}
            />
            <TextField
              required
              type="text"
              variant="outlined"
              label="Author"
              name="author"
              value={book === undefined ? newBook.author : book.author}
              onChange={handleInputChange}
              InputLabelProps={{ required: false }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#F4F4F4",
                  paddingLeft: "6px",
                  fontFamily: "arimo",
                  paddingTop: "2px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#F4F4F4",
                },
                "& .MuiOutlinedInput-root": {
                  width: "clamp(10rem, 25vw, 40rem)",
                  height: "60px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F4F4F4", // border color
                  borderRadius: "20px", // border radius
                  borderWidth: "2px", // border width
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // focus border color
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // hover border color
                  },
              }}
              InputProps={{
                style: {
                  color: "#F4F4F4",
                  fontFamily: "arimo",
                },
              }}
            />
            <TextField
              required
              type="text"
              variant="outlined"
              label="Genre"
              name="genre"
              value={book === undefined ? newBook.genre : book.genre}
              onChange={handleInputChange}
              InputLabelProps={{ required: false }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#F4F4F4",
                  paddingLeft: "6px",
                  fontFamily: "arimo",
                  paddingTop: "2px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#F4F4F4",
                },
                "& .MuiOutlinedInput-root": {
                  width: "clamp(10rem, 25vw, 40rem)",
                  height: "60px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F4F4F4", // border color
                  borderRadius: "20px", // border radius
                  borderWidth: "2px", // border width
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // focus border color
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // hover border color
                  },
              }}
              InputProps={{
                style: {
                  color: "#F4F4F4",
                  fontFamily: "arimo",
                },
              }}
            />
            <TextField
              required
              type="text"
              variant="outlined"
              label="International Standard Book Number"
              name="isbn"
              value={book === undefined ? newBook.isbn : book.isbn}
              onChange={handleInputChange}
              InputLabelProps={{ required: false }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#F4F4F4",
                  paddingLeft: "6px",
                  fontFamily: "arimo",
                  paddingTop: "2px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#F4F4F4",
                },
                "& .MuiOutlinedInput-root": {
                  width: "clamp(10rem, 25vw, 40rem)",
                  height: "60px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F4F4F4", // border color
                  borderRadius: "20px", // border radius
                  borderWidth: "2px", // border width
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // focus border color
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // hover border color
                  },
              }}
              InputProps={{
                style: {
                  color: "#F4F4F4",
                  fontFamily: "arimo",
                },
              }}
            />
            <TextField
              required
              type="text"
              variant="outlined"
              label="Description"
              name="description"
              value={
                book === undefined ? newBook.description : book.description
              }
              onChange={handleInputChange}
              InputLabelProps={{ required: false }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#F4F4F4",
                  paddingLeft: "6px",
                  fontFamily: "arimo",
                  paddingTop: "2px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#F4F4F4",
                },
                "& .MuiOutlinedInput-root": {
                  width: "clamp(10rem, 25vw, 40rem)",
                  height: "60px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F4F4F4", // border color
                  borderRadius: "20px", // border radius
                  borderWidth: "2px", // border width
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // focus border color
                  },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#F4F4F4", // hover border color
                  },
              }}
              InputProps={{
                style: {
                  color: "#F4F4F4",
                  fontFamily: "arimo",
                },
                sx: {
                  overflow: "hidden",
                },
              }}
            />
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
          onClick={handleConfirmOpen}
        >
          {confirmPageTitle === "Edit Book" ? "Change" : "Confirm"}
        </Button>
        <ConfirmAddBook
          setOpen={setOpen}
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
          pageTitle={confirmPageTitle}
          newBook={book === undefined ? newBook : book}
          handleCloseModal={handleClose}
        />
      </Box>
    </Modal>
  );
};

export default ManageBook;
