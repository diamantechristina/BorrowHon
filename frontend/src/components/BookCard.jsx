import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Trash, Pencil, Edit } from "react-flaticons";
import ConfirmDeleteBook from "./ConfirmBook.jsx";
import EditBook from "./ManageBook.jsx";
import { useState } from "react";

const BookCard = ({ book, open, setOpen }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleOpen = () => {
    console.log("book: ", book)
    setEditOpen(true)
    setIsHover(false)
  };
  const handleConfirmOpen = () => {
    setConfirmOpen(true)
    setIsHover(false)
  };
  const handleHover = (hover) => setIsHover(hover);

  return (
    <Box
      onMouseEnter={() => editOpen || confirmOpen ? () => {} : setIsHover(true)}
      onMouseLeave={() => editOpen || confirmOpen ? () => {} : setIsHover(false)}
      sx={{
        width: "20vw",
        height: "60vh",
        objectFit: "contain",
        background:
          book.coverImage !== undefined
            ? `url(${book.coverImage})`
            : 'url("src/resources/defaultCover.png")',
        backgroundColor: "#225560",
        backgroundSize: book.coverImage !== undefined ? "cover" : "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        borderRadius: "20px",
        transition: "300ms",
        "&:hover": {
          transform: "scale(1.025)",
        },
        boxShadow: "0px 0px 20px 3px rgba(34,85,96,0.9)",
      }}
    >
      
        <Box
          sx={{
            display: isHover ? "flex" : "none",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "left",
            borderRadius: "20px",
            transition: "300ms",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "clamp(0.75rem, 1.125rem, 1.5rem)",
              fontFamily: "Montserrat",
              fontWeight: "900",
              color: "#f4f4f4",
              paddingX: "1vw",
              marginBottom: "0.75vh",
            }}
            gutterBottom
          >
            {book.title.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              fontSize: "clamp(0.5rem, 0.75rem, 1rem)",
              color: "#f4f4f4",
              paddingLeft: "1vw",
              marginBottom: "2vh",
            }}
          >
            {book.author}
          </Typography>
          <Box
            sx ={{
              width: "22.5vw",
              display: "flex",
              position: "relative",
              justifyContent: "flex-end",
              bottom: "5vh",
              alignItems: "center",
              paddingY: "0.5vh",
            }}
          >
          <Pencil
            color="#f4f4f4"
            style={{
              cursor: "pointer",
              position: "relative",
              right: "3.5vw",
            }}
            size={15}
            onClick={handleOpen}
          />
          <Trash
            color="#f4f4f4"
            style={{
              cursor: "pointer",
              position: "relative",
              right: "3vw",
            }}
            size={15}
            onClick={handleConfirmOpen}
          />
          </Box>
          <EditBook 
            open={editOpen} 
            setOpen={setEditOpen} 
            pageTitle={"Edit Book"} 
            confirmPageTitle={"Confirm Edit Book"} 
            book={book}
            handleHover={handleHover}
          />

          <ConfirmDeleteBook
            confirmOpen={confirmOpen}
            setConfirmOpen={setConfirmOpen}
            pageTitle={"Confirm Delete Book"}
            backgroundImageUrl={book.coverImage}
            newBook={book}
            handleHover={handleHover}
          />
        </Box>
      
    </Box>
  );
};

export default BookCard;
