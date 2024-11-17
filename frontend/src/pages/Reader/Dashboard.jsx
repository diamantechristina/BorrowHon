import _, { toInteger } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
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
  List,
  ListItem,
  ClickAwayListener,
} from "@mui/material";
import "@flaticon/flaticon-uicons/css/all/all.rounded.css";
import Navbar from "../../components/Navbar";
import { useBook } from "../../library/book.js";
import Carousel from "react-spring-3d-carousel";
import { Modal } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../Login.jsx";
import { useStore } from "../../library/store.js";
import { useSearch } from "../../library/search.js";
import { useNotification } from "../../library/notification.js";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { useHistory } from "../../library/history.js";
import { set } from "mongoose";

const Dashboard = () => {
  const {
    currentUser,
    setBookData,
    bookData,
    isFirstLogin,
    setIsFirstLogin,
    setIsOnEdit,
    setCurrentPage,
  } = useStore();
  const { fetchNotifications, notification } = useNotification();
  const { fetchHistory, history } = useHistory();
  console.log("currentUser: ", currentUser);
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

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

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mostPopularBooks = _.take(
    _.orderBy(
      Object.keys(_.countBy(history, "book_id")),
      (key) => _.countBy(history, "book_id")[key],
      "desc"
    ),
    5
  ).map((bookId) => {
    return books.find((book) => book.book_id === toInteger(bookId));
  });

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
        overflowY: "scroll", // Allow vertical scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isFirstLogin}
        autoHideDuration={1000}
        onClose={() => setIsFirstLogin(false)}
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
            filter: "contrast(0.5)", // Adjust the contrast of the background image
            zIndex: -1, // Add this property to ensure the image is behind the content
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
              // marginLeft: "17vw",
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
                      // backgroundColor:"pink",
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
                      // backgroundColor:"pink",
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
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", bottom: 0, right: 0, margin: 2 }}>
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
              <i className="fi fi-rr-arrow-small-up" style={{marginTop: ".5rem", fontSize: "1.75rem", color: "#F4F4F4"}}/>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
