import { Box, Typography } from "@mui/material";
import React from "react";
import { Trash, Pencil } from "react-flaticons";

const BookCard = ({ book }) => {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <Box
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        width: "22.5vw",
        height: "67.5vh",
        background:
          book.coverImage !== undefined ? `url(${book.coverImage})` : "#2e2e2e",
        backgroundSize: "cover",
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
          onClick={() => {
          }}
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
          onClick={() => {
          }}
        />
      </Box>
      )}
    </Box>
  );
};

export default BookCard;
