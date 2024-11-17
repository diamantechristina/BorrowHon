import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  Typography,
  Snackbar,
  SnackbarContent
} from "@mui/material";
import { ArrowSmallLeft, Books } from "react-flaticons";
import { useBook } from "../../library/book.js";
import BookCard from "../../components/BookCard.jsx";
import AddBook from "../../components/ManageBook.jsx";
import { useStore } from "../../library/store.js";
import { useSnackbar } from "../../library/snackbar.js";
import "@flaticon/flaticon-uicons/css/all/all.rounded.css";


const ListOfBooks = () => {
  const {setOpenSnackbar, openSnackbar, snackbarMessage, snackbarSuccess} = useSnackbar();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {isAdmin, currentUser, setCurrentPage} = useStore();

  const { fetchBook, books } = useBook();
  
  useEffect(() => {
    setCurrentPage(location.pathname)
  },[])

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  useEffect(() => {
    if(!currentUser) navigate("/");
    else if(!isAdmin) navigate(-1);
  },[])

  const handleOpen = () => setOpen(true);
  
  
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
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
          message={snackbarMessage}
          style={{
            backgroundColor:
              snackbarSuccess ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
    <Box
      sx={{
        display: isAdmin ? "flex" : "none",
        justifyContent: "center",
        backgroundColor: "#191919",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
        },
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
          top: 15,
        }}
      >
        <ArrowSmallLeft
          size={"3rem"}
          style={{
            marginTop: "-10px",
            marginLeft: "-15px",
            marginRight: "-10px",
            marginBottom: "-10px",
          }}
        />
      </Button>
      <Typography
        sx={{
          margin: 0,
          position: "absolute",
          left: 75,
          top: 10,
          color: "#E8E8E8",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
        }}
      >
        List of Books
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(20vw, 1fr))",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#191919",
          width: "100vw",
          height: `${65 * Math.ceil((books.length + 1) / 4) }vh`,
          marginTop: "10vh",
          marginX: "1.5vw",
          gap: "3.5vw",
          paddingY: "5vh",
          paddingLeft: "1vw",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            width: "20vw",
            height: "60vh",
            borderRadius: "20px",
            backgroundColor: "#2e2e2e",
            transition: "300ms",
            "&:hover": {
              transform: "scale(1.025)",
            },
            boxShadow: "0px 0px 20px 3px rgba(34,85,96,0.9)",

          }}
        >
          <CardActions>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                width: "22.5vw",
                height: "67.5vh",
                backgroundColor: "#225560",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                transition: "300ms",
                
              }}
            >
              <i
                  className="fi fi-br-plus"
                  style={{
                    marginTop: "2.5vh",
                    color: "#f4f4f4",
                    fontSize: "7.5rem",
                  }}
                />
            </Button>
            <AddBook open={open} setOpen={setOpen} pageTitle={"Add Book"} confirmPageTitle={"Confirm Add Book"} />
          </CardActions>
        </Card>
        {books.map((book) => (
          <BookCard key={book._id} book={book} open={open} setOpen={setOpen}/>
        ))}
      </Box>
      </Box>
    </Box>
  );
};

export default ListOfBooks;
