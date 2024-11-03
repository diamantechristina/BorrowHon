import { Box, Typography, Button } from "@mui/material";
import { ArrowSmallLeft } from "react-flaticons";
import { useBook } from "../../library/book";
import { useAccount } from "../../library/account";
import { useHistory } from "../../library/history";
import React, { useEffect } from "react";

const PendingBooks = () => {
  const { fetchHistory, history } = useHistory();
  const { fetchAccount, account } = useAccount();
  const { fetchBook, books } = useBook();
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const pendingHistories = history?.filter((item) => item.status === "pending");
  console.log(pendingHistories)
  return (
    <Box
      sx={{
        display: "flex",
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
        PENDING REQUEST BOOKS
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

      </Box>
    </Box>
  );
};

export default PendingBooks;
