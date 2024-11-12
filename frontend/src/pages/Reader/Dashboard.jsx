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
} from "@mui/material";
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
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
import { set } from "mongoose";

const Dashboard = () => {
  const { currentUser, setBookData, bookData, isFirstLogin, setIsFirstLogin, setIsOnEdit } = useStore();
  const { searchedBook, filterType } = useSearch();
  const { fetchNotifications, notification } = useNotification();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    console.log("notifications: ", notification);
    
  }, [notification]);

  const navigate = useNavigate();
  const [display, setDisplay] = useState(false)
  useEffect(() => {
   setBookData(null) 
   setIsOnEdit(false)
  },[])

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }else{
      setDisplay(true)
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

  const slides = fetchedBooks.slice(0, 5).map((book, index) => ({
    key: uuidv4(), // Generate a unique key for each slide
    content: (
      <img
        onClick={() => {
          setGoToSlide(index); // Set the active slide index
          setCurrentIndex(index); // Update the current book index
        }}
        src={book.coverImage}
        alt={`Slide ${index}`} // Use index for alt text
        style={{ borderRadius: "10px" }} // Add style if needed
      />
    ),
  }));

  return (

    <Box
      sx={{
        display: display ? "auto" : 'none',
        overflowY: "scroll", // Allow vertical scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isFirstLogin}
        autoHideDuration={3000}
        onClose={() => setIsFirstLogin(false)}
      >
        <SnackbarContent
          message='Login Successfully!'
          style={{
            backgroundColor:'green',
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <List
        sx={{
          display: searchedBook ? "auto" : "none",
          width: '100%',
          maxWidth: '33.9vw',
          bgcolor: '#d9d9d9',
          position: 'fixed',
          overflow: 'auto',
          "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
        },
          top: '9.25vh',
          left: '13.75vw',
          zIndex: 1,
          maxHeight: "36.6vh",
          paddingTop: '2.5vh',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
      >
        {books.filter((book) => {
        
        if (filterType === 'title'){
          return book.title.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'author'){
          return book.author.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'isbn'){
          return book.isbn.includes(searchedBook)
        }else if (filterType === 'genre'){
          return book.genre[0].toLowerCase().includes(searchedBook?.toLowerCase())
        }
        else{
          return false;
        }
        
      }).length === 0 ?(
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#191919",
              }}
            >
              No Results Found
            </Typography>
          </Box>
        ) : null}
      {books.filter((book) => {
        if (searchedBook === '') {
          return false;
        }
        if (filterType === 'title'){
          return book.title.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'author'){
          return book.author.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'isbn'){
          return book.isbn.includes(searchedBook)
        }else if (filterType === 'genre'){
          return book.genre[0].toLowerCase().includes(searchedBook?.toLowerCase())
        }
        
      })
      .map((book) => (
        <ListItem
          sx={{
            "&:hover": {
                backgroundColor: "#E8E8E8",
              },
          }}
          key={book._id}
          onClick={() => {
            setBookData(book);
            navigate("/view-book");
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
              height: "10vh",
              
            }}
          >
            <Box
              sx={{
                width: "10%",
                height: "10vh",
                objectFit: "contain",
                background: `url(${book.coverImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Box
              sx={{
                margin: "0",
              }}
            >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                marginLeft: "1vw",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#191919",
              }}
            >
              {book.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginLeft: "1vw",
                fontSize: "0.9rem",
                color: "#191919",
              }}
            >
              {book.author}
            </Typography>
            </Box>

          </Box>
        </ListItem>
      ))}
      </List>
      <Box
        sx={{
          height: "100vh",
          position: "relative", // para mo upod ang background image ig scroll
          backgroundImage:
            "linear-gradient(rgba(25,25,25,.9),rgba(34, 85, 96, 0.7), rgba(34, 85, 96, .7), rgba(25,25,25,1))",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
        
        <Navbar/>
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
              width: "50vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",

              // backgroundColor: "#225560",
            }}
          >
            <Box
              sx={{
                // width: "35vw",
                width: "clamp(35vw, 35vw, 35vw)",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginTop: "20vh",
                marginLeft: "8vw",
                // backgroundColor: "red"
              }}
            >
              <Typography
                sx={{
                  fontSize: "55px",
                  fontWeight: "bold",
                  color: "#F4F4F4",
                  textTransform: "uppercase",
                  fontFamily: "Montserrat",
                }}
              >
                {fetchedBooks[currentIndex]?.title}
              </Typography>
              <Typography
                sx={{
                  color: "#F4F4F4",
                }}
              >
                By {fetchedBooks[currentIndex]?.author}
              </Typography>
              <Typography
                sx={{
                  color: "#F4F4F4",
                }}
              >
                {fetchedBooks[currentIndex]?.description}
              </Typography>
              <Button
                onClick={() => {
                  setBookData(fetchedBooks[currentIndex])
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
              {/* <Modal
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
                    width: "85vw",
                    height: "70vh",
                    bgcolor: "transparent",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  ></Box>
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
              </Modal> */}
            </Box>
          </Box>
          <Box
            sx={{
              width: "50vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // backgroundColor: "red",
            }}
          >
            <Box
              sx={{
                width: "30vw",
                height: "80vh",
                marginTop: "10vh",
                zIndex: 0,
              }}
            >
              <Carousel
                slides={slides}
                goToSlide={goToSlide}
                width={"30vw"}
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
            width: "inherit",
            height: "110vh",
            backgroundColor: "#191919",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
          <Box
            sx={{
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100vw",
                height: "58vh",
                // backgroundColor:"yellow",
                display: "flex",
                justifyContent: "center",
                // marginLeft: "17vw",
                alignItems: "center",
                flexDirection: "row",
                gap: "5vw",
              }}
            >
              {fetchedBooks.slice(0, 5).map((book, index) => (
                <Card
                  onMouseOver={() => setHoverPopularBook(book.title)}
                  onMouseOut={() => setHoverPopularBook(null)}
                  onClick={() => {
                    setBookData(book)
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
                    image={book.coverImage}
                    sx={{
                      height: "100%",
                    }}
                  ></CardMedia>
                  {hoverPopularBook == book.title && (
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
                          {book.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#F4F4F4",
                            fontSize: "14px",
                          }}
                        >
                          By {book.author}
                        </Typography>
                      </Box>
                    </CardContent>
                  )}
                </Card>
              ))}
            </Box>
          </Box>
          <Typography
            sx={{
              color: "#F4F4F4",
              fontSize: "30px",
              fontWeight: "bold",
              marginLeft: "8vw",
              marginBottom: "-2vh",
            }}
          >
            Newly Added Books
          </Typography>
          <Box
            sx={{
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "87vw",
              marginLeft: "6.5vw",
              // borderRadius: "50px",
            }}
          >
            <Box
              sx={{
                // width: "100vw",
                height: "58vh",
                // backgroundColor:"yellow",
                display: "flex",
                justifyContent: "center",
                marginLeft: "35vw",
                alignItems: "center",
                flexDirection: "row",
                gap: "5vw",
              }}
            >
              {bookCreation.slice(0, fetchedBooks.length).map((book, index) => (
                <Card
                  onMouseOver={() => setHoverRecentBook(book.title)}
                  onMouseOut={() => setHoverRecentBook(null)}
                  key={index}
                  onClick={() => {
                    if(book===undefined){
                      navigate(`/reader-dashboard`);
                    }
                    else{
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
                    image={book.coverImage}
                    sx={{
                      height: "100%",
                    }}
                  ></CardMedia>
                  {hoverRecentBook == book.title && (
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
                          {book.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#F4F4F4",
                            fontSize: "14px",
                          }}
                        >
                          By {book.author}
                        </Typography>
                      </Box>
                    </CardContent>
                  )}
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
