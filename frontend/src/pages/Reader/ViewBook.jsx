import { set } from "mongoose";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useHistory } from "../../library/history";
// import  BorrowBook from "../../components/BorrowBook.jsx";
import { ArrowSmallLeft, EyeCrossed, Eye } from "react-flaticons";
import { useNavigate } from "react-router-dom";
import { useLog } from "../../library/log";
import "@fontsource/montserrat";

const ViewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(location.state?.bookData);
  const [userLoggedIn, setUserLoggedIn] = useState(location.state?.user);
  console.log("bookData: ", bookData);
  const { fetchHistory, history } = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [pass, setPass] = useState({
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPass((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  console.log("User: ", userLoggedIn);

  // Locate the specific history entry that matches the current book and user
  const currentBookHistory = useMemo(() => {
    return history?.find(
      (entry) =>
        entry.book_id === bookData?.book_id &&
        entry.acc_id === userLoggedIn?.acc_id
    );
  }, [history, bookData, userLoggedIn]);

  useMemo(() => {
    setBookData(location.state?.bookData);
    setUserLoggedIn(location.state?.user);
  }, [location.state]);

  console.log("bookData: ", bookData);

  //get book dat
  useEffect(() => {
    if (bookData === undefined && userLoggedIn === undefined) {
      navigate("/login");
    }
  }, [bookData, userLoggedIn]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { createHistory } = useHistory();
  const handleBorrowBook = async () => {
    if (userLoggedIn?.password === pass.password) {
      const newHistory = {
        book_id: bookData.book_id,
        acc_id: userLoggedIn.acc_id,
      };
      const { success, message } = await createHistory(newHistory);
      console.log("Success:", success);
      console.log("Message:", message);
      setOpen(false);
      setSnackbarMessage("Book borrow request sent!");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Incorrect password!");
      setOpenSnackbar(true);
    }
  };
  const statusRef = useRef(null);

  const statusContent = statusRef.current?.textContent
  // console.log("statusContent: ", statusContent);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(src/resources/readerdashboardbg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(20%)",
          zIndex: -1, // To keep the background behind all the other content
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent 
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarMessage === "Book borrow request sent!" ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          // backgroundColor: "gray",
        }}
      >
              {/* navbar */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "15vh",
            backgroundColor: "transparent",
            zIndex: 1000, // Ensures it stays on top
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
              top: 10,
            }}
          >
            <ArrowSmallLeft
              size={"75px"}
              style={{
                marginTop: "-10px",
                marginLeft: "-15px",
                marginRight: "-10px",
                marginBottom: "-10px",
              }}
            />
          </Button>
          <img
            src="src/resources/logo.png"
            alt="BorrowHon"
            style={{
              width: "20vw",
              marginTop: "20px",
              marginLeft: "100px",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "70vh",
            bgcolor: "transparent",
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
              backgroundColor: "#225560",
              width: "75%",
              height: "100%",
              left: 0,
              position: "absolute",
              borderRadius: "30px",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                // backgroundColor: "red",
                width: "35%",
                height: "100%",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  marginLeft: "10px",
                  width: "100%",
                  height: "96%",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${bookData?.coverImage})`,
                    backgroundSize: "cover",
                    borderRadius: "25px",
                    width: "100%",
                    height: "100%",
                  }}
                ></Box>
              </Box>
            </Box>
            <Box
              sx={{
                // backgroundColor: "green",
                width: "65%",
                height: "100%",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "20px",
                  // alignItems: "center",
                  // backgroundColor: "red",
                  gap: "10px",
                }}
              >
                <Typography
                  ref={statusRef}
                  sx={{
                    color: "#F4F4F4",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                    textUnderlineOffset: "7px",
                  }}
                >
                  {currentBookHistory
                    ? currentBookHistory?.status
                    : "Available"}
                </Typography>
                {/* <Box
                  sx={{
                    width: "20%",
                    height: "0.5px",
                    left: 0,
                    right: 0,
                    backgroundColor: "#F4F4F4",
                  }}
                ></Box> */}
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontSize: "clamp(1.5vw, 3vw, 3vw)",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                    textTransform: "uppercase",
                  }}
                >
                  {bookData?.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontFamily: "montserrat",
                  }}
                >
                  {bookData?.genre.join(", ")}
                </Typography>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                >
                  {bookData?.author}
                </Typography>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontFamily: "montserrat",
                  }}
                >
                  ISBN: {bookData?.isbn}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "1px",
                    left: 0,
                    backgroundColor: "#F4F4F4",
                  }}
                ></Box>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    textAlign: "justify",
                    fontFamily: "montserrat",
                  }}
                >
                  &emsp;&emsp;{bookData?.description}
                </Typography>
                {statusContent === "Available" ? (
                  
                
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  sx={{
                    width: "clamp(10vw, 10vw, 10vw)",
                    height: "clamp(6vh, 6vh, 6vh)",
                    boxShadow: "none",
                    border: "2px solid #f4f4f4",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                    borderRadius: "13px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    marginTop: "20px",
                  }}
                >
                  Borrow
                </Button>
                ): null}
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
                      width: "60vw",
                      height: "80vh",
                      p: 4,
                      backgroundColor: "#225560",
                      borderRadius: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#F4F4F4",
                      flexDirection: "column",
                      gap: "20px",
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
                      BORROW BOOK
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

                            backgroundImage: `url(${bookData?.coverImage})`,
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
                          {bookData?.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            // fontWeight: "bold",
                            fontFamily: "montserrat",
                          }}
                        >
                          {bookData?.genre}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1.5vw",
                            fontWeight: "bold",
                            fontFamily: "montserrat",
                          }}
                        >
                          {bookData?.author}
                        </Typography>
                        {/* <Typography
                          sx={{
                            fontSize: "20px",
                            fontFamily: "montserrat",
                            my: "2vh",
                          }}
                        >
                          ISBN: {bookData?.isbn}
                        </Typography> */}
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
                            height: "20vh",
                            overflowY: "scroll",
                            // backgroundColor: "#F4F4F4",
                            "&::-webkit-scrollbar": {
                              display: "none", // Hide scrollbars for WebKit browsers
                            },
                            // backgroundImage:
                            //   "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
                          }}
                        >
                          <Typography
                            sx={{
                              textAlign: "justify",
                              fontFamily: "montserrat",
                            }}
                          >
                            {bookData?.description}
                          </Typography>
                        </Box>
                        <TextField
                          required
                          type={showPassword ? "text" : "password"}
                          // id='outlined-basic'
                          variant="outlined"
                          label="Password"
                          name="password"
                          // value={login.password}
                          onChange={handleInputChange}
                          InputLabelProps={{ required: false }}
                          sx={{
                            "& .MuiInputLabel-root": {
                              color: "#F4F4F4", // label color
                              paddingLeft: "6px",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "#F4F4F4",
                            },
                            "& .MuiOutlinedInput-root": {
                              width: "clamp(10rem, 23vw, 40rem)",
                              height: "52px",
                              paddingLeft: "6px",
                              paddingRight: "6px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#F4F4F4", // border color
                              borderRadius: "20px", // border radius
                              borderWidth: "2px",
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
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button
                                  aria-label="toggle password visibility"
                                  onClick={togglePasswordVisibility}
                                  sx={{
                                    color: "#F4F4F4",
                                    // backgroundColor: "red",
                                    marginRight: "15px",
                                    minWidth: 0,
                                  }}
                                >
                                  {showPassword ? (
                                    <Eye size={17} />
                                  ) : (
                                    <EyeCrossed size={17} />
                                  )}
                                </Button>
                              </InputAdornment>
                            ),
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
                      onClick={handleBorrowBook}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#225560",
              width: "23%",
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
      </Box>
    </Box>
  );
};

export default ViewBook;
