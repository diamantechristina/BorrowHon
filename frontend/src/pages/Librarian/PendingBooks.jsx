import {
  Box,
  Typography,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { ArrowSmallLeft } from "react-flaticons";
import { useBook } from "../../library/book";
import { useAccount } from "../../library/account";
import { useHistory } from "../../library/history";
import React, { useEffect, useMemo } from "react";
import PendingBookCard from "../../components/PendingBookCard";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../library/store";
import { useSnackbar } from "../../library/snackbar";
const PendingBooks = () => {
  const { setOpenSnackbar, openSnackbar, snackbarMessage, snackbarSuccess } =
    useSnackbar();

  const { currentUser, isAdmin, setCurrentPage } = useStore();
  const navigate = useNavigate();
  const { fetchHistory, history } = useHistory();
  const { fetchAccount, account } = useAccount();
  const { fetchBook, books } = useBook();
  const [pendings, setPendings] = React.useState(0);
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, history]);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  useEffect(() => {
    if (!currentUser) navigate("/");
    else if (!isAdmin) navigate(-1);
  }, []);

  const pendingHistories = history?.filter((item) => item.status === "pending");
  useEffect(() => {
    setPendings(pendingHistories?.length);
  }, [history]);

  const pendingBooks = books?.filter((book) => {
    return pendingHistories?.map((item) => item.book_id).includes(book.book_id);
  });

  const borrowerAccounts = account?.filter((acc) => {
    return pendingHistories?.map((item) => item.acc_id).includes(acc.acc_id);
  });

  return (
    <Box
      sx={{
        display: isAdmin ? "auto" : "none",
        backgroundColor: "#191919",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar && snackbarMessage !== ""}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarSuccess ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#191919",
          width: "100vw",
          height: "100vh",
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
            left: 30,
            top: 15,
          }}
        >
          <ArrowSmallLeft
            size={"5vw"}
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
            left: 110,
            top: 23,
            color: "#E8E8E8",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "clamp(2vw, 2.5vw, 2.5vw)",
          }}
        >
          PENDING REQUEST BOOKS
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "inherit",
            height: "100vh",
            marginTop: pendings < 5 ? "" : "20vh",
            paddingLeft: pendingHistories?.length === 0 ? "" : "5vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              backgroundColor: "#191919",
              width: "95vw",
              height: pendings < 5 ? "95vh" : "auto",
              marginTop: pendings < 5 ? "" : "10vh",
              paddingTop: pendings < 5 ? "" : "5vh",
              gap: "3.5vw",
              paddingBottom: "5vh",
              rowGap: "3vh",
            }}
          >
            {pendingHistories?.length === 0 ? (
              <Box
                sx={{
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5vw",
                }}
              >
                <Typography
                  sx={{
                    margin: 0,
                    top: 10,
                    color: "#E8E8E8",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: "clamp(1.25rem, 3vw, 2rem)",
                  }}
                >
                  NO PENDING REQUEST
                </Typography>
              </Box>
            ) : (
              pendingHistories?.map((history) => (
                <PendingBookCard
                  key={history._id}
                  history={history}
                  book={pendingBooks?.find(
                    (book) => book.book_id === history.book_id
                  )}
                  account={borrowerAccounts?.find(
                    (acc) => acc.acc_id === history.acc_id
                  )}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PendingBooks;
