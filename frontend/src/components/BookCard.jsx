import { Box, Typography } from "@mui/material";
import React from "react";
import { Trash, Pencil, Edit } from "react-flaticons";
import ConfirmDeleteBook from "./ConfirmBook.jsx";
import EditBook from "./ManageBook.jsx";
import { useState } from "react";

const BookCard = ({ book }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        width: "22.5vw",
        height: "67.5vh",
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
      }}
    >
      {isHover && (
        <Box
          sx={{
            display: "flex",
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
              marginBottom: "2.5vh",
            }}
          >
            {book.author}
          </Typography>
          <Pencil
            color="#f4f4f4"
            style={{
              cursor: "pointer",
              position: "fixed",
              left: "18.5vw",
              bottom: "3vh",
            }}
            size={15}
            onClick={setEditOpen}
          />
          <Trash
            color="#f4f4f4"
            style={{
              cursor: "pointer",
              position: "fixed",
              left: "20.5vw",
              bottom: "3vh",
            }}
            size={15}
            onClick={setConfirmOpen}
          />
          <EditBook 
            open={editOpen} 
            setOpen={setEditOpen} 
            pageTitle={"Edit Book"} 
            confirmPageTitle={"Confirm Edit Book"} 
            book={book}
          />

          <ConfirmDeleteBook
            confirmOpen={confirmOpen}
            setConfirmOpen={setConfirmOpen}
            pageTitle={"Delete Book"}
            backgroundImageUrl={book.coverImage}
            newBook={book}
          />
        </Box>
      )}
    </Box>
  );
};

export default BookCard;
