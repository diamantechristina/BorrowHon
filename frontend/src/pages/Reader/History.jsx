import React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ArrowSmallLeft } from "react-flaticons";
import { useHistory } from "../../library/history";
import { useBook } from "../../library/book";
import "@fontsource/arimo";

const History = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedIn = location.state?.userLoggedIn;
  const { fetchHistory, history } = useHistory();
  const { fetchBook, books } = useBook();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  console.log("books: ", books);
  console.log("userLoggedIn: ", userLoggedIn);

  const userHistory = useMemo(() => {
    return history?.filter((item) => item.acc_id === userLoggedIn.acc_id);
  }, [history, userLoggedIn]);

  console.log("userHistory: ", userHistory);

  const booksHistory = books.filter((book) => {
    return userHistory.some((item) => item.book_id === book.book_id);
  });

  console.log("booksHistory: ", booksHistory);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2E2E2E",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "15vh",
          //   backgroundColor: "green",
          //   backgroundColor: "transparent",
          zIndex: 1000, // Ensures it stays on top
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
            top: 10,
          }}
        >
          <ArrowSmallLeft
            size={"75px"}
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
            marginTop: "20px",
            marginLeft: "100px",
            fontSize: "35px",
            fontWeight: "bold",
            color: "#f4f4f4",
            fontFamily: "Arimo",
          }}
        >
          HISTORY
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "15vh",
          width: "100vw",
          height: "85vh",
          backgroundColor: "red",
        }}
      >
        {userHistory?.map((history) => (
          <Box key = {history.book_id}>
            <Typography>{booksHistory.find((book) => book.book_id === history.book_id)?.title}</Typography>
            <Typography>{history.status}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default History;
