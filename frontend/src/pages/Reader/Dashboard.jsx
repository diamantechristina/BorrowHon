import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import { Typography } from "@mui/material";
import { useBook } from "../../library/book.js";
import SnackBar from "../../components/SnackBar";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";

const Dashboard = ({ open, updateOpen, successfulLogin }) => {
  const { fetchBook, books } = useBook();
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);
  console.log("books", books);

  const [currentIndex, setCurrentIndex] = useState(0);

  // change this. get data from database, store here. as of now: only for demo
  const titles = [
    "It Ends With Us",
    "A Little Life",
    "Ignite Me",
    "Fourth Wing",
    "Harry Potter and the Sorcerer's Stone",
    "If You Could See The Sun",
    "The Seven Husbands of Evelyn Hugo",
  ];
  const authors = [
    "Colleen Hoover",
    "Hanya Yanagihara",
    "Tahereh Mafi",
    "Rebecca Yarros",
    "J.K. Rowling",
    "Ann Liang",
    "Taylor Jenkins Reid",
  ];

  const [goToSlide, setGoToSlide] = useState(null);

  const slides = [
    {
      key: uuidv4(),
      content: (
        <img
          onClick={() => {
            setGoToSlide(0), setCurrentIndex(0);
          }}
          src="../../src/resources/itendswithus.jpg"
          alt="cover"
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
          src="../../src/resources/alittlelife.jpg"
          alt="2"
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
          src="../../src/resources/igniteme.jpg"
          alt="3"
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
          src="../../src/resources/fourthwing.jpg"
          alt="4"
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
          src="../../src/resources/hpandthesorcerersstone.jpg"
          alt="6"
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
          src="../../src/resources/ifyoucouldseethesun.jpg"
          alt="7"
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
          src="../../src/resources/thesevenhusbandsofevelynhugo.jpg"
          alt="8"
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        // backgroundColor:'#225560',
        backgroundImage:
          'linear-gradient(rgba(20,20,20,.9),rgba(34, 85, 96, 0.7), rgba(34, 85, 96, .7), rgba(20,20,20,.9)), url("src/resources/readerdashboardbg.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflowY: "scroll",
        // Hide scrollbars for WebKit browsers (Chrome, Safari)
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
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
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "50vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "#225560",
          }}
        >
          <Box
            sx={{
              width: "30vw",
              // marginRight: "10svw",
              // backgroundColor: "red"
            }}
          >
            <Typography
              sx={{
                fontSize: "75px",
                fontWeight: "bold",
                color: "#F4F4F4",
              }}
            >
              {titles[currentIndex]}
            </Typography>
            <Typography
              sx={{
                color: "#F4F4F4",
              }}
            >
              By {authors[currentIndex]}
            </Typography>
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
              width: "20vw",
              height: "80vh",
              marginTop: "10vh",
              zIndex: 0,
            }}
          >
            <Carousel
              slides={slides}
              goToSlide={goToSlide}
              width={"25vw"}
              height={"75vh"}
              perspective={500}
              rotation={30}
              sx={{
                borderRadius: 10,
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
        }}
      >
        <Typography
          sx={{
            color: "#F4F4F4",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Most Popular Books
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
