import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import {
  Button,
  Box,
  Card,
  CardActions,
  Backdrop,
  Typography,
  TextField,
} from "@mui/material";
import { Modal, styled } from "@mui/material";
import { ArrowSmallLeft, Books } from "react-flaticons";
import { useBook } from "../../library/book.js";
import BookCard from "../../components/BookCard.jsx";

const ListOfBooks = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmClose = () => setConfirmOpen(false);

  const [selectedFiles, setSelectedFiles] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    coverImage: "",
  });

  const { createBook } = useBook();

  const { fetchBook, books } = useBook();
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmOpen = () => {
    // setOpen(false);
    console.log(books);
    console.log(newBook.coverImage);
    setConfirmOpen(true);
  };

  const handleAddBook = async () => {
    const { success, message } = await createBook(newBook);
    console.log("Success:", success);
    console.log("Message:", message);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setSelectedFiles(files);
    console.log(files);
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

  const backgroundImageUrl = useMemo(() => {
    if (selectedFiles && selectedFiles[0]) {
      return URL.createObjectURL(selectedFiles[0]);
    }
    return "";
  }, [selectedFiles]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    const image = await resizeFile(file);
    setNewBook((prevBook) => ({
      ...prevBook,
      coverImage: image,
    }));
    console.log(image);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#191919",
        position: "relative",
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          margin: 0,
          borderRadius: "20px",
          color: "#E8E8E8",

          "&:hover": {
            backgroundColor: "transparent",
            filter: "drop-shadow(0 0 1px white)",
            color: "#FFFFFF",
          },
          position: "absolute",
          left: 10,
          top: 15,
        }}
      >
        <ArrowSmallLeft
          size={"3rem"}
          style={{
            marginTop: "-10px",
            marginLeft: "-15px",
            marginRight: "-10px",
            marginBottom: "-10px",
          }}
        />
      </Button>
      <Typography
        sx={{
          margin: 0,
          position: "absolute",
          left: 75,
          top: 10,
          color: "#E8E8E8",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
        }}
      >
        List of Books
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          backgroundColor: "red",
          width: "100vw",
          marginTop: "10vh",
          paddingY: "5vh",
          marginX: "3vw",
          rowGap: "3vh",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            width: "22.5vw",
            height: "67.5vh",
            borderRadius: "20px",
            transition: "300ms",
            "&:hover": {
              transform: "scale(1.025)",
            }
          }}
        >
          <CardActions>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                width: "22.5vw",
                height: "67.5vh",
                backgroundColor: "#2e2e2e",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
              }}
            >
              Add Book
            </Button>
            <Modal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              // slots={{ backdrop: StyledBackdrop }}
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
                  width: "65vw",
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
                  // overflow: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                >
                  ADD BOOK
                </Typography>
                <Box
                  sx={{
                    width: "55vw",
                    height: "65vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    // backgroundColor: "yellow",
                  }}
                >
                  <Box
                    sx={{
                      width: "50vw",
                      height: "inherit",
                      // backgroundColor: "red",
                      // marginLeft: "30px",
                      display: "flex",
                      // justifyContent: "center",
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
                        //   backgroundColor: "pink",
                        height: "50vh",
                        width: "270px",
                        borderRadius: "20px",
                        border: selectedFiles
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
                        tabIndex={-1}
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
                          borderRadius: "20px",
                          backgroundColor: "transparent",
                          textTransform: "none",
                          fontSize: "18px",
                          backgroundImage: `url(${backgroundImageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          "&:hover": {
                            boxShadow: "none",
                          },
                          boxShadow: "none",
                        }}
                        style={{
                          filter: selectedFiles
                            ? "drop-shadow(0 0 5px black)"
                            : "",
                        }}
                        // startIcon={<CloudUploadIcon />}
                      >
                        {selectedFiles ? (
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
                          onChange={(event) =>
                            setSelectedFiles(event.target.files)
                          }
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
                      // backgroundColor: "blue",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "left",
                      flexDirection: "column",
                      gap: "20px",
                      // marginRight: "30px",
                    }}
                  >
                    <TextField
                      required
                      type="text"
                      variant="outlined"
                      label="Title"
                      name="title"
                      value={newBook.title}
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
                          // marginTop: "-18px",
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
                          // backgroundColor: "#F4F4F4", // background color
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
                      value={newBook.author}
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
                      value={newBook.genre}
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
                      value={newBook.isbn}
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
                      value={newBook.description}
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
                    borderRadius: "20px", // border radius
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
                  Confirm
                </Button>
                <Modal
                  aria-labelledby="unstyled-modal-title"
                  aria-describedby="unstyled-modal-description"
                  open={confirmOpen}
                  onClose={handleConfirmClose}
                  // slots={{ backdrop: StyledBackdrop }}
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
                      // marginTop:
                      gap: "20px",
                      // overflow: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "4vw",
                        fontWeight: "bold",
                        fontFamily: "montserrat",
                        //   marginTop: "-5vh",
                      }}
                    >
                      CONFIRM ADD BOOK
                    </Typography>
                    <Box
                      sx={{
                        width: "60vw",
                        height: "55vh",
                        // backgroundColor: "yellow",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        // overflow: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          width: "30vw",
                          height: "inherit",
                          // backgroundColor: "blue",
                        }}
                      >
                        <Box
                          sx={{
                            //   width: "25vw",
                            height: "55vh",

                            backgroundImage: `url(${backgroundImageUrl})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            mx: "1.5vw",
                          }}
                        ></Box>
                      </Box>
                      <Box
                        sx={{
                          width: "50vw",
                          height: "inherit",
                          // backgroundColor: "red",
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
                            // fontWeight: "bold",
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
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontFamily: "montserrat",
                          }}
                        >
                          {newBook.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        width: "clamp(10rem, 12vw, 40rem)",
                        height: "70px",
                        borderRadius: "20px", // border radius
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
                      onClick={handleAddBook}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Modal>
              </Box>
            </Modal>
          </CardActions>
        </Card>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </Box>
    </Box>
  );
};

export default ListOfBooks;
