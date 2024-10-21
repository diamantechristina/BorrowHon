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

  const [bookTitles, setBookTitles] = useState([]);

  const [bookAuthors, setBookAuthors] = useState([]);

  const [bookDescriptions, setBookDescriptions] = useState([]);

  useEffect(() => {
    if (books.length > 0) {
      const titles = books.map((book) => book.title);
      setBookTitles(titles);
    }
  }, [books]);

  useEffect(() => {
    if (books.length > 0) {
      const authors = books.map((book) => book.author);
      setBookAuthors(authors);
    }
  }, [books]);

  useEffect(() => {
    if (books.length > 0) {
      const descriptions = books.map((book) => book.description);
      setBookDescriptions(descriptions);
    }
  }, [books]);

  const [goToSlide, setGoToSlide] = useState(null);

  const [hoveredCard, setHoveredCard] = useState(false);

  const getImageUrl = (title) => {
    return `../../src/resources/${title?.toLowerCase().split(" ").join("")}.jpg`;
  };

  const slides = [
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(0), setCurrentIndex(0);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[0]) : ""}
          alt="0"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(1), setCurrentIndex(1);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[1]) : ""}
          alt="1"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(2), setCurrentIndex(2);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[2]) : ""}
          alt="2"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(3), setCurrentIndex(3);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[3]) : ""}
          alt="3"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(4), setCurrentIndex(4);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[4]) : ""}
          alt="4"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(5), setCurrentIndex(5);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[5]) : ""}
          alt="5"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(6), setCurrentIndex(6);
          }}
          src={bookTitles.length > 0 ? getImageUrl(bookTitles[6]) : ""}
          alt="8"
          style={{ borderRadius: "10px" }}
        />
      ),
    },
  ];

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
                width: "35vw",
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
                {bookTitles[currentIndex]}
              </Typography>
              <Typography
                sx={{
                  color: "#F4F4F4",
                }}
              >
                By {bookAuthors[currentIndex]}
              </Typography>
              <Typography
                sx={{
                  color: "#F4F4F4",
                }}
              >
                {bookDescriptions[currentIndex]}
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
            height: "100vh",
            backgroundColor: "#191919",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#F4F4F4",
              fontSize: "25px",
              fontWeight: "bold",
              marginLeft: "2.5vw",
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
              {bookTitles.slice(0, 5).map((title, index) => (
                <Card
                  onMouseOver={() => setHoveredCard(title)}
                  onMouseOut={() => setHoveredCard(null)}
                  key={index}
                  sx={{
                    width: "15vw",
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
                    image={getImageUrl(title)}
                  ></CardMedia>
                  {hoveredCard == title && (
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
                        color: "white",
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(0, 20, 20, 0.3), rgba(20, 20, 20, 1))",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "45vh",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#F4F4F4",
                          }}
                        >
                          {bookTitles[index]}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#F4F4F4",
                          }}
                        >
                          By {bookAuthors[index]}
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
