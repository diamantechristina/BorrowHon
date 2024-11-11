import React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ArrowSmallLeft } from "react-flaticons";
import { useHistory } from "../../library/history";
import { useBook } from "../../library/book";
import "@fontsource/arimo";
import { useStore } from "../../library/store";

const History = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isOnEdit, readerUser, setReaderUser, setIsOnEdit } = useStore();
  const { fetchHistory, history } = useHistory();
  const { fetchBook, books } = useBook();

  useEffect(() => {
    if (location.pathname === '/settings'){
      setIsOnEdit(false);
    setReaderUser(null);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  useEffect(() => {
    if (!currentUser) navigate("/");
    else if (readerUser || !isOnEdit) navigate(-1);
  }, []);
  console.log("books: ", books);
  console.log("currentUser: ", currentUser);

  const userHistory = useMemo(() => {
    return history?.filter((item) => readerUser ? item.acc_id === readerUser.acc_id : item.acc_id === currentUser.acc_id)
      .sort((a, b) =>{
        const statusOrder = ['pending', 'onhand', 'returned'];
        const statusA = statusOrder.indexOf(a.status);
        const statusB = statusOrder.indexOf(b.status);
        if (statusA !== statusB){
          return statusA - statusB;
        } else {
          return new Date(b.borrowdate) - new Date(a.borrowdate);
        }
      })
  }, [history, currentUser, readerUser]);

  console.log("userHistory: ", userHistory);

  const booksHistory = books.filter((book) => {
    return userHistory?.some((item) => item.book_id === book.book_id);
  });

  console.log("booksHistory: ", booksHistory);

  // console.log("borrowdate: ", userHistory?.map((item) => item.borrowdate));
  console.log(isOnEdit)
  return (
    <Box
      sx={{
        display: currentUser ? !isOnEdit ? "none" : "flex" : "none",
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
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90vw",
            height: "70vh",
            backgroundColor: "#2e2e2e",
            display: userHistory?.length > 0 ? "" : "flex",
            justifyContent: userHistory?.length > 0 ? "" : "center",
            alignItems: userHistory?.length > 0 ? "" : "center",
          }}
        >
          {userHistory?.length === 0 ? (
            <Typography
              sx={{
                margin: 0,
                // left: 75,
                top: 10,
                color: "#E8E8E8",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
              }}
            >
              NO HISTORY RECORD
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f4f4f4",
                      textAlign: "center",
                      fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                      borderWidth: "0px",
                    }}
                  >
                    Book Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f4f4f4",
                      textAlign: "center",
                      fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                      borderWidth: "0px",
                    }}
                  >
                    Date Borrowed
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f4f4f4",
                      textAlign: "center",
                      fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                      borderWidth: "0px",
                    }}
                  >
                    Date Returned
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f4f4f4",
                      textAlign: "center",
                      fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                      borderWidth: "0px",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userHistory?.map((history, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgba(34, 85, 96, 0.15)" : "#2e2e2e",
                    }}
                  >
                    <TableCell
                      sx={{
                        width: "20vw",
                        color: "#f4f4f4",
                        textAlign: "center",
                        fontFamily: "Inria Serif",
                        borderWidth: "0px",
                        fontSize: "clamp(1vw, 1.2vw, 1.5vw)",
                        borderRadius:
                          index % 2 === 0 ? "20px 0px 0px 20px" : null,
                      }}
                    >
                      {
                        booksHistory.find(
                          (book) => book.book_id === history.book_id
                        )?.title
                      }
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20vw",
                        color: "#f4f4f4",
                        textAlign: "center",
                        fontFamily: "Inria Serif",
                        borderWidth: "0px",
                        fontSize: "clamp(1vw, 1.2vw, 1.5vw)",
                      }}
                    >
                      {history.borrowdate ? (
                        new Date(history.borrowdate).toLocaleString("default", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      ) : (
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              height: "1px",
                              width: "20%",
                              backgroundColor: "#f4f4f4",
                            }}
                          ></Box>
                        </span>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20vw",
                        color: "#f4f4f4",
                        textAlign: "center",
                        fontFamily: "Inria Serif",
                        borderWidth: "0px",
                        fontSize: "clamp(1vw, 1.2vw, 1.5vw)",
                      }}
                    >
                      {history.returndate ? (
                        new Date(history.returndate).toLocaleString("default", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      ) : (
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              height: "1px",
                              width: "20%",
                              backgroundColor: "#f4f4f4",
                            }}
                          ></Box>
                        </span>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20vw",
                        color: "#f4f4f4",
                        textAlign: "center",
                        textTransform: "capitalize",
                        fontFamily: "Inria Serif",
                        borderWidth: "0px",
                        fontSize: "clamp(1vw, 1.2vw, 1.5vw)",
                        borderRadius:
                          index % 2 === 0 ? "0px 20px 20px 0px" : null,
                      }}
                    >
                      {history.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default History;
