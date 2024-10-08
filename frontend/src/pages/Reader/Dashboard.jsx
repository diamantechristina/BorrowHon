import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import { Typography, Snackbar } from "@mui/material";
import { useBook } from "../../library/book.js";
import SnackBar from "../../components/SnackBar"


const Dashboard = ({open, updateOpen, successfulLogin}) => {
  const {fetchBook, books} = useBook()
  useEffect(() => {
    fetchBook()
  }, [fetchBook])
  console.log("books", books)
  return (
    <Box
      sx={{
        height: "100vh",
        // backgroundColor:'#225560',
        backgroundImage:
          'linear-gradient(rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8)), url("src/resources/readerdashboardbg.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SnackBar open = {open} updateOpen = {updateOpen} successfulLogin={successfulLogin}/>
      {/* <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            setOpen(false);
          }
        }}
        message={"Login successful"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      /> */}
      <Navbar sx={{ position: "fixed", top: 0 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "gray",
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
            backgroundColor: "#225560",
            // backgroundColor: "red"
          }}
        >
          <Box
            sx={{
              // backgroundColor: "yellow",
              width: "20vw",
              marginRight: "20vw",
            }}
          >
            <Typography
              sx={{
                fontSize: "50px",
                fontWeight: "bold",
                color: "#F4F4F4",
              }}
            >
              IT ENDS WITH US
            </Typography>
            <Typography
              sx={{
                color: "#F4F4F4",
              }}
            >
              By Colleen Hoover
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
            backgroundColor: "red",
            // backgroundColor: "red"
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
