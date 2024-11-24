import _, { toInteger } from "lodash";
import React, { useRef, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Backdrop,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import "@flaticon/flaticon-uicons/css/all/all.rounded.css";
import Navbar from "../../components/Navbar";
import { useBook } from "../../library/book.js";
import Carousel from "react-spring-3d-carousel";
import { Modal } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../library/store.js";
import { useAccount } from "../../library/account.js";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { useHistory } from "../../library/history.js";
import { useSnackbar } from "../../library/snackbar.js";

const Dashboard = () => {
  const {
    currentUser,
    setBookData,
    setCurrentUser,
    isFirstLogin,
    setIsFirstLogin,
    setCurrentPage,
  } = useStore();
  const { fetchHistory, history } = useHistory();
  const { fetchAccount, account } = useAccount();

  const { openSnackbar, setOpenSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    if (account)
      setCurrentUser(account.find((acc) => acc.acc_id === currentUser.acc_id));
  }, [account]);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      setDisplay(true);
    }
  }, []);

  const { fetchBook, books } = useBook();
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [bookCreation, setBookCreation] = useState([]);

  const [openModal, setOpenModal] = useState(true);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsFirstLogin(false);
    setOpenModal(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [mostPopularBooks, setMostPopularBooks] = useState([]);

  useEffect(() => {
    if (books.length > 0) {
      const combinedData = books.map((book) => ({
        _id: book._id,
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        status: book.status,
        coverImage: book.coverImage,
        createdAt: book.createdAt,
      }));
      setFetchedBooks(combinedData);
      // can use spread operator [...] or slice() so that it
      // doesn't mutate the original array
      const sortedBooks = [...combinedData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookCreation(sortedBooks);
    }
  }, [books]);

  useEffect(() => {
    const popularBooks = _.take(
      _.orderBy(
        Object.keys(_.countBy(history, "book_id")),
        (key) => _.countBy(history, "book_id")[key],
        "desc"
      ),
      5
    ).map((bookId) => {
      return books.find((book) => book.book_id === toInteger(bookId));
    });

    if (popularBooks.length < 5) {
      const remainingBooks = bookCreation.filter(
        (book) =>
          !popularBooks.map((book) => book.book_id).includes(book.book_id)
      );
      const additionalBooks = remainingBooks.slice(0, 5 - popularBooks.length);
      setMostPopularBooks([...popularBooks, ...additionalBooks]);
    } else {
      setMostPopularBooks(popularBooks);
    }
  }, [bookCreation, history]);

  const [goToSlide, setGoToSlide] = useState(null);

  const [hoverPopularBook, setHoverPopularBook] = useState(false);

  const [hoverRecentBook, setHoverRecentBook] = useState(false);

  const slides = mostPopularBooks.slice(0, 5).map((book, index) => ({
    key: uuidv4(), // Generate a unique key for each slide
    content: (
      <img
        onClick={() => {
          setGoToSlide(index); // Set the active slide index
          setCurrentIndex(index); // Update the current book index
        }}
        src={book?.coverImage}
        alt={`Slide ${index}`} // Use index for alt text
        style={{ borderRadius: "10px" }} // Add style if needed
      />
    ),
  }));

  return (
    <Box
      sx={{
        height: "230vh",
        display: display ? "auto" : "none",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          message="Logged In Successfully!"
          style={{
            backgroundColor: "green",
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <Navbar />
      {currentUser?.suspendReason !== null &&
        currentUser?.isSuspended === true && (
          <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={isFirstLogin}
            onClose={handleCloseModal}
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
                width: "40vw",
                height: "50vh",
                p: 4,
                backgroundColor: "#225560",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#F4F4F4",
                flexDirection: "column",
              }}
            >
              <i
                class="fi fi-bs-cross-small"
                style={{
                  fontSize: "2vw",
                  cursor: "pointer",
                  position: "absolute",
                  top: "1vh",
                  right: "1vh",
                }}
                onClick={handleCloseModal}
              ></i>

              <Typography
                sx={{
                  fontSize: "3vw",
                  fontWeight: "bold",
                  fontFamily: "montserrat",
                }}
              >
                ACCOUNT SUSPENDED
              </Typography>

              <Box
                sx={{
                  width: "inherit",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingTop: "10vh",
                  marginTop: "-3vh",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5vw",
                    fontFamily: "Montserrat",
                  }}
                >
                  Your account has been suspended due to
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#f4f4f4",
                    borderRadius: "10px",
                    padding: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "2vw",
                      fontWeight: "bold",
                      fontFamily: "Montserrat",
                      textTransform: "uppercase",
                      color: "#225560",
                    }}
                  >
                    {currentUser?.suspendReason}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "1vw",
                    fontFamily: "Montserrat",
                    width: "80%",
                    textAlign: "center",
                    paddingTop: "10vh",
                  }}
                >
                  You won't be able to borrow any books for the meantime. Please
                  contact the librarian to resolve this issue.
                </Typography>
              </Box>
            </Box>
          </Modal>
        )}

      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage:
            "linear-gradient(rgba(25,25,25,.9),rgba(34, 85, 96, 0.7), rgba(34, 85, 96, .7), rgba(25,25,25,1))",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 'url("src/resources/readerdashboardbg.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "contrast(0.5)",
            zIndex: -1, // ensure image is behind the content
          }}
        />
        <Box
          sx={{
            width: "50vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "40vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "55px",
                fontWeight: "bold",
                color: "#F4F4F4",
                textTransform: "uppercase",
                fontFamily: "Montserrat",
                marginY: "5vh",
                lineHeight: "7.5vh",
              }}
            >
              {mostPopularBooks[currentIndex]?.title}
            </Typography>
            <Typography
              sx={{
                color: "#F4F4F4",
              }}
            >
              By {mostPopularBooks[currentIndex]?.author}
            </Typography>
            <Typography
              sx={{
                marginY: "5vh",
                color: "#F4F4F4",
              }}
            >
              {mostPopularBooks[currentIndex]?.description}
            </Typography>
            <Button
              onClick={() => {
                setBookData(mostPopularBooks[currentIndex]);
                navigate("/view-book");
              }}
              variant="contained"
              sx={{
                width: "clamp(5vw, 12vw, 12vw)",
                height: "52px",
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
              }}
            >
              See Book
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "50vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "33vw",
            }}
          >
            <Carousel
              slides={slides}
              goToSlide={goToSlide}
              width={"25vw"}
              height={"75vh"}
              perspective={500}
              rotation={30}
              offsetFn={() => {
                return {
                  opacity: 1,
                };
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "130vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "5vh",
            width: "100vw",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#F4F4F4",
              fontSize: "30px",
              fontWeight: "bold",
              marginLeft: "8vw",
            }}
          >
            Most Popular Books
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              width: "100vw",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: "row",
              marginTop: "3vh",
              gap: "5vw",
            }}
          >
            {mostPopularBooks?.slice(0, 5).map((book, index) => (
              <Card
                onMouseOver={() => setHoverPopularBook(book.title)}
                onMouseOut={() => setHoverPopularBook(null)}
                onClick={() => {
                  setBookData(book);
                  navigate(`/view-book`);
                }}
                key={index}
                sx={{
                  width: "12.6vw",
                  height: "40vh",
                  borderRadius: 4,
                  position: "relative",
                  transition: "300ms",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                style={{
                  filter: "drop-shadow(0px 0px 15px rgba(34, 85, 96, 1))",
                }}
              >
                <CardMedia
                  component="img"
                  image={book?.coverImage}
                  sx={{
                    height: "100%",
                  }}
                ></CardMedia>
                {hoverPopularBook == book?.title && (
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",

                      color: "#F4F4F4",
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0, 20, 20, 0.3), rgba(20, 20, 20, 1))",
                    }}
                  >
                    <Box
                      sx={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "33vh",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#F4F4F4",
                        }}
                      >
                        {book?.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#F4F4F4",
                          fontSize: "14px",
                        }}
                      >
                        By {book?.author}
                      </Typography>
                    </Box>
                  </CardContent>
                )}
              </Card>
            ))}
          </Box>
          <Box
            sx={{
              height: "5vh",
              width: "100vw",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#F4F4F4",
                fontSize: "30px",
                fontWeight: "bold",
                marginLeft: "8vw",
              }}
            >
              Newly Added Books
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100vw",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              marginTop: "3vh",
              flexDirection: "row",
              gap: "5vw",
            }}
          >
            {bookCreation?.slice(0, 5).map((book, index) => (
              <Card
                onMouseOver={() => setHoverRecentBook(book?.title)}
                onMouseOut={() => setHoverRecentBook(null)}
                key={index}
                onClick={() => {
                  if (book === undefined) {
                    navigate(`/reader-dashboard`);
                  } else {
                    setBookData(book);
                    navigate(`/view-book`);
                  }
                }}
                sx={{
                  width: "12.6vw",
                  height: "40vh",
                  borderRadius: 4,
                  position: "relative",
                  transition: "300ms",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                style={{
                  filter: "drop-shadow(0px 0px 15px rgba(34, 85, 96, 1))",
                }}
              >
                <CardMedia
                  component="img"
                  image={book?.coverImage}
                  sx={{
                    height: "100%",
                  }}
                ></CardMedia>
                {hoverRecentBook == book?.title && (
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",
                      color: "#F4F4F4",
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0, 20, 20, 0.3), rgba(20, 20, 20, 1))",
                    }}
                  >
                    <Box
                      sx={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "33vh",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#F4F4F4",
                        }}
                      >
                        {book?.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#F4F4F4",
                          fontSize: "14px",
                        }}
                      >
                        By {book?.author}
                      </Typography>
                    </Box>
                  </CardContent>
                )}
              </Card>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bottom: 0,
              right: 0,
              marginTop: "-3vh",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleScrollToTop}
              sx={{
                width: "3rem",

                height: "3rem",
                backgroundColor: "#225560",
                "&:hover": {
                  backgroundColor: "#336670",
                },
                borderRadius: "10px",
              }}
            >
              <i
                className="fi fi-rr-arrow-small-up"
                style={{
                  marginTop: ".5rem",
                  fontSize: "1.75rem",
                  color: "#F4F4F4",
                }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
