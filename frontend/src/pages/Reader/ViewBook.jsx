import { set } from "mongoose";
import React, { useState } from "react";
import { Modal, Backdrop, Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "@fontsource/montserrat";

const ViewBook = () => {
  const location = useLocation();
  const bookData = location.state.bookData;
  console.log(bookData);
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
                    fontFamily: "montserrat"
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
                  textAlign: "justify"
                }}
              >
                &emsp;&emsp;{bookData.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  width: "10vw",
                  boxShadow: "none",
                  border: "2px solid #f4f4f4",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: "none",
                  }
                }}
              >
                Borrow
              </Button>
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
