import React, { useState } from "react";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "react-flaticons";
import { ArrowSmallLeft } from "react-flaticons";
import { useHistory } from "../../library/history";
import { useBook } from "../../library/book";
import "@fontsource/arimo";
import { useStore } from "../../library/store";

const ReaderHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentUser,
    readerUser,
    setReaderUser,
    setIsOnEdit,
    setCurrentPage,
    currentPage,
  } = useStore();
  const { fetchHistory, history } = useHistory();
  const { fetchBook, books } = useBook();

  const [display, setDisplay] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  useEffect(() => {
    if (!currentUser) navigate("/");
    else if (currentPage !== "/reader" && currentPage !== "/borrow-history") navigate(currentPage);
    else if (!readerUser) navigate(currentPage);
    else setDisplay(true);
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);
  const userHistory = useMemo(() => {
    return history
      ?.filter((item) => item.acc_id === readerUser.acc_id)
      .sort((a, b) => {
        const statusOrder = ["pending", "onhand", "returned"];
        const statusA = statusOrder.indexOf(a.status);
        const statusB = statusOrder.indexOf(b.status);
        if (statusA !== statusB) {
          return statusA - statusB;
        } else {
          return new Date(b.borrowdate) - new Date(a.borrowdate);
        }
      });
  }, [history, readerUser, searchQuery]);

  const booksHistory = books.filter((book) => {
    return userHistory?.some((item) => item.book_id === book.book_id);
  });

  const filteredHistory = userHistory?.filter((history) => {
    const book = booksHistory.find((book) => book.book_id === history.book_id);
    return book && book.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
  });
  // console.log("borrowdate: ", userHistory?.map((item) => item.borrowdate));
  return (
    <Box
      sx={{
        display: display ? "flex" : "none",
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
          height: "13vh",
          // backgroundColor: "red",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          HISTORY
        </Typography>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputLabelProps={{ required: false }}
          sx={{
            marginLeft: "65vw",
            "& .MuiOutlinedInput-root": {
              width: "clamp(20vw, 30vw, 30vw)",
              // width: "42.2vw",
              height: "45px",
              // height: "clamp(7.5vh, 7.5vh, 7.5vh)",
              paddingLeft: "6px",
              paddingRight: "6px",
              backgroundColor: "#F4F4F4",
              borderRadius: "15px",
              fontSize: "24px",
              // marginLeft: "20px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F4F4F4", // border color
              borderWidth: "2px", // border width
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#F4F4F4", // focus border color
              },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F4F4F4", // hover border color
            },
            "& .MuiOutlinedInput-input.MuiInputBase-input::placeholder": {
              color: "#191919",
              // backgroundColor: "red",
              opacity: 1,
              fontSize: "20px",
              position: "absolute",
              top: 20.5,
              fontFamily: "Arimo",
            },
            // marginTop: "20px",
            "& .MuiOutlinedInput-input.MuiInputBase-input": {
              marginLeft: "8px",
              fontSize: "20px",
              // marginTop: "5px",
            },
          }}
          InputProps={{
            style: {
              color: "#F4F4F4",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    marginTop="10px"
                    marginLeft="13px"
                    // backgroundColor="red"
                  >
                    <Search
                      size="25px"
                      style={{
                        color: "#191919",
                        paddingBottom: 0,
                      }}
                    />
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />
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
            display: filteredHistory?.length > 0 ? "" : "flex",
            justifyContent: filteredHistory?.length > 0 ? "" : "center",
            alignItems: filteredHistory?.length > 0 ? "" : "center",
          }}
        >
          {filteredHistory?.length === 0 ? (
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
                {filteredHistory?.map((history, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(34, 85, 96, 0.15)"
                            : "#2e2e2e",
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
                          new Date(history.borrowdate).toLocaleString(
                            "default",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
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
                          new Date(history.returndate).toLocaleString(
                            "default",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
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

export default ReaderHistory;
