import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  Typography,
} from "@mui/material";
import { ArrowSmallLeft, Books } from "react-flaticons";
import { useBook } from "../../library/book.js";
import BookCard from "../../components/BookCard.jsx";
import AddBook from "../../components/ManageBook.jsx";
import { useStore } from "../../library/store.js";
const ListOfBooks = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {isAdmin, currentUser} = useStore();

  const { fetchBook, books } = useBook();
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
        display: isAdmin ? "flex" : "none",
        justifyContent: "center",
        backgroundColor: "#191919",
        position: "relative",
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          backgroundColor: "#191919",
          width: "100vw",
          marginTop: "10vh",
          gap: "3.5vw",
          paddingY: "5vh",
          marginX: "3vw",
          rowGap: "3vh",
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
            }
          }}
        >
          <CardActions>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                width: "22.5vw",
                height: "67.5vh",
                backgroundColor: "#2e2e2e",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                transition: "300ms",
              }}
            >
              Add Book
            </Button>
            <AddBook open={open} setOpen={setOpen} pageTitle={"Add Book"} confirmPageTitle={"Confirm Add Book"} />
          </CardActions>
        </Card>
        {books.map((book) => (
          <BookCard key={book._id} book={book} open={open} setOpen={setOpen}/>
        ))}
      </Box>
    </Box>
  );
};

export default ListOfBooks;
