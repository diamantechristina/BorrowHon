import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { Modal, Backdrop, Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useHistory } from "../../library/history";
// import  BorrowBook from "../../components/BorrowBook.jsx";
import { ArrowSmallLeft } from "react-flaticons";
import { useNavigate } from "react-router-dom";
import "@fontsource/montserrat";

const ViewBook = () => {
  const location = useLocation();
  const bookData = location.state.bookData;
  const userLoggedIn = location.state.user;

  // useEffect(() => {
  //   console.log(bookData);
  //   console.log("user: ", userLoggedIn.acc_id, userLoggedIn.username);
  // });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { createHistory } = useHistory();
  const handleBorrowBook = async () => {
    const newHistory = {
      book_id: bookData.book_id,
      acc_id: userLoggedIn.acc_id,
    };
    const { success, message } = await createHistory(newHistory);
    console.log("Success:", success);
    console.log("Message:", message);
  };

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
            position:"absolute",
            left:10,
            top:10,
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
              borderRadius: "20px",
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
                borderRadius: "20px",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "93%",
                  height: "90%",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${bookData.coverImage})`,
                    backgroundSize: "cover",
                    borderRadius: "20px",
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
                }}
              >
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontSize: "40px",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                  }}
                >
                  {bookData.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                  }}
                >
                  {bookData.genre.join(", ")}
                </Typography>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontWeight: "bold",
                  }}
                >
                  {bookData.author}
                </Typography>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                  }}
                >
                  ISBN: {bookData.isbn}
                </Typography>
                <Box
                  sx={{
                    width: "90%",
                    height: "1px",
                    left: 0,
                    backgroundColor: "#F4F4F4",
                  }}
                ></Box>
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    textAlign: "justify",
                  }}
                >
                  &emsp;&emsp;{bookData.description}
                </Typography>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  sx={{
                    width: "10vw",
                    boxShadow: "none",
                    border: "2px solid #f4f4f4",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Borrow
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

                            backgroundImage: `url(${bookData.coverImage})`,
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
                          {bookData.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            // fontWeight: "bold",
                            fontFamily: "montserrat",
                          }}
                        >
                          {bookData.genre}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1.5vw",
                            fontWeight: "bold",
                            fontFamily: "montserrat",
                          }}
                        >
                          {bookData.author}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontFamily: "montserrat",
                            my: "2vh",
                          }}
                        >
                          ISBN: {bookData.isbn}
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
                          {bookData.description}
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
