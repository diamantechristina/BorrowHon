import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useBook } from "../../library/book.js";
import SnackBar from "../../components/SnackBar";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";

const Dashboard = ({ open, updateOpen, successfulLogin }) => {
  const { fetchBook, books } = useBook();
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [bookData, setBookData] = useState([]);

  const [bookTitles, setBookTitles] = useState([]);

  const [bookAuthors, setBookAuthors] = useState([]);

  const [bookDescriptions, setBookDescriptions] = useState([]);

  const [bookCreation, setBookCreation] = useState([]);

  useEffect(() => {
    if (books.length > 0) {
      const combinedData = books.map((book) => ({
        title: book.title,
        author: book.author,
        description: book.description,
        createdAt: book.createdAt,
      }));
      setBookData(combinedData);
                          // can use spread operator [...] or slice() so that it
                          // doesn't mutate the original array
      const sortedBooks = [...combinedData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookCreation(sortedBooks);
    }
  }, [books]);

  const [goToSlide, setGoToSlide] = useState(null);

  const [hoverPopularBook, setHoverPopularBook] = useState(false);

  const [hoverRecentBook, setHoverRecentBook] = useState(false);

  const getImageUrl = (title) => {
    return `../../src/resources/${title?.toLowerCase().split(" ").join("")}.jpg`;
  };

  const slides = bookData.map((book, index) => ({
    key: uuidv4(), // Generate a unique key for each slide
    content: (
      <img
        onClick={() => {
          setGoToSlide(index); // Set the active slide index
          setCurrentIndex(index); // Update the current book index
        }}
        src={getImageUrl(book.title)} // Use the book title to generate the image URL
        alt={`Slide ${index}`} // Use index for alt text
        style={{ borderRadius: "10px" }} // Add style if needed
      />
    ),
  }));

  return (
    <Box
      sx={{
        overflowY: "scroll", // Allow vertical scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
        },
      }}
    >
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
        <SnackBar
          open={open}
          updateOpen={updateOpen}
          successfulLogin={successfulLogin}
        />
        <Navbar
          sx={{
            position: "fixed",
            top: 0,
            width: "inherit",
            zIndex: 9999,
          }}
        />
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
                {bookData[currentIndex]?.title}
              </Typography>
              <Typography
                sx={{
                  color: "#F4F4F4",
                }}
              >
                By {bookData[currentIndex]?.author}
              </Typography>
              <Typography
                sx={{
                  color: "#F4F4F4",
                }}
              >
                {bookData[currentIndex]?.description}
              </Typography>
              <Button
                varianted="contained"
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
              justifyContent: "center",
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
                alignItems: "center",
                flexDirection: "row",
                gap: "5vw",
              }}
            >
              {bookData.slice(0, 5).map((book, index) => (
                <Card
                  onMouseOver={() => setHoverPopularBook(book.title)}
                  onMouseOut={() => setHoverPopularBook(null)}
                  key={index}
                  sx={{
                    width: "12.6vw",
                    height: "40vh",
                    borderRadius: 4,
                    position: "relative",
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
                    image={getImageUrl(book.title)}
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
                        justifyContent: "center",
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
            }}
          >
            <Box
              sx={{
                width: "100vw",
                height: "58vh",
                // backgroundColor:"yellow",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: "5vw",
              }}
            >
              {bookCreation.slice(0, 5).map((book, index) => (
                <Card
                  onMouseOver={() => setHoverRecentBook(book.title)}
                  onMouseOut={() => setHoverRecentBook(null)}
                  key={index}
                  sx={{
                    width: "12.6vw",
                    height: "40vh",
                    borderRadius: 4,
                    position: "relative",
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
                    image={getImageUrl(book.title)}
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
                        justifyContent: "center",
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
