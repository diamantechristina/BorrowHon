import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import {
  Bell,
  MenuBurger,
  BookAlt,
  BookOpenReader,
  BowArrow,
} from "react-flaticons";
import { useBook } from "../../library/book.js";
import { useHistory } from "../../library/history.js";
import { useNavigate } from "react-router-dom";
import { useLog } from "../../library/log.js";
import { useAccount } from "../../library/account.js";
import Navbar from "../../components/Navbar.jsx";
import { useStore } from "../../library/store.js";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  const { currentUser,  setReaderUser, setIsOnEdit } = useStore();
  const navigate = useNavigate();
  const [burgerAnchorEl, setBurgerAnchorEl] = React.useState(null);
  const burgerOpen = Boolean(burgerAnchorEl);
  const { fetchLogs, log } = useLog();
  const { fetchAccount, account } = useAccount();

  useEffect(() => {
    setReaderUser(null)
    setIsOnEdit(false)
  },[])
  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);
  console.log("log: ", log);

  const userLogCountPerMonth = useMemo(() => {
    const logCounts = {};
    months.forEach((month) => {
      logCounts[month] = log?.filter((logItem) => {
        const logDate = new Date(logItem.logindate);
        return logDate.getMonth() === months.indexOf(month) && logItem.acc_id != currentUser.acc_id;
      }).length;
    });
    return logCounts;
  }, [log, months]);

  console.log("userLogCountPerMonth: ", userLogCountPerMonth);

  const handleBurgerClick = (event) => {
    setBurgerAnchorEl(event.currentTarget);
  };

  const { fetchBook, books } = useBook();

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const booksLength = books?.length;

  const { fetchHistory, history } = useHistory();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const pendingBooks = useMemo(() => {
    return history?.filter((item) => item.status === "pending").length;
  }, [history]);

  const availableBooks = useMemo(() => {
    return books?.filter((item) => item.status === "available").length;
  }, [books]);

  const unavailableBooks = useMemo(() => {
    return books?.filter((item) => item.status === "unavailable").length;
  }, [books]);
  
  const [borrowedBooks, setBorrowedBooks] = React.useState([]);

  useEffect(() => {
    const borrowedBooks = history?.filter((item) => item.status === "onhand" || item.status === "returned")
    .sort((a, b) => new Date(b.borrow_date) - new Date(a.borrow_date));
    setBorrowedBooks(borrowedBooks);
  }, [history]);
    
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          'linear-gradient(rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8)), url("src/resources/librariandashboard.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* navbar */}
        <Navbar />
        {/* body */}
        <Box
          sx={{
            width: "100vw",
            height: "85vh",
            marginTop: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            // backgroundColor: "green",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "90vw",
              height: "76vh",
              //   backgroundColor: "blue",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* left box */}
            <Box
              sx={{
                width: "44vw",
                height: "inherit",
                // backgroundColor: "red",
              }}
            >
              {/* book catalog */}
              <Box
                sx={{
                  width: "44vw",
                  height: "65vh",
                  backgroundColor: "#2E2E2E",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontSize: "3vh",
                    fontFamily: "Montserrat",
                    marginTop: "10px",
                  }}
                >
                  Book Catalog
                </Typography>
                <Box position="relative" display="inline-flex">
                  {/* Background circle (unfilled portion) */}
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      color: "#BCBCBC", // Color for the unfilled portion
                    }}
                    size="25vw"
                    thickness={7}
                  ></CircularProgress>
                  {/* pending books */}
                  <CircularProgress
                    variant="determinate"
                    value={
                      ((pendingBooks + unavailableBooks) / booksLength) * 100
                    }
                    sx={{
                      color: "#27D18A", // Color for the actual progress
                      position: "absolute", // Overlay on top of the background circle
                      top: 0,
                      left: 0,
                    }}
                    size="25vw"
                    thickness={7}
                  />
                  {/* Foreground circle (borrowed books portion) */}
                  <CircularProgress
                    variant="determinate"
                    value={(unavailableBooks / booksLength) * 100}
                    sx={{
                      color: "#1C95AF", // Color for the actual progress
                      position: "absolute", // Overlay on top of the background circle
                      top: 0,
                      left: 0,
                    }}
                    size="25vw"
                    thickness={7}
                  ></CircularProgress>
                  <Box
                    sx={{
                      width: "17vw",
                      height: "17vw",
                      backgroundColor: "#225560",
                      borderRadius: "50%",
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#F4F4F4",
                        fontSize: "1vw",
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                      }}
                    >
                      AVAILABLE BOOKS
                    </Typography>
                    {/* change to actual count of available books */}
                    <Typography
                      sx={{
                        color: "#F4F4F4",
                        fontSize: "5vw",
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                      }}
                    >
                      {/* {books?.map((book) => book.status === "available").length } */}
                      {availableBooks}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#F4F4F4",
                        fontSize: "1vw",
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                      }}
                    >
                      OUT OF {booksLength}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "44vw",
                    height: "15vh",
                    // backgroundColor: "gray",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-15px",
                  }}
                >
                  {/* legend */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "15px",
                    }}
                  >
                    <Box
                      height="20px"
                      width="20px"
                      backgroundColor="#1C95AF"
                    ></Box>
                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        color: "#F4F4F4",
                        marginLeft: "10px",
                        fontSize: "1vw",
                      }}
                    >
                      Borrowed Books
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "15px",
                    }}
                  >
                    <Box
                      height="20px"
                      width="20px"
                      backgroundColor="#27D18A"
                    ></Box>
                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        color: "#F4F4F4",
                        marginLeft: "10px",
                        fontSize: "1vw",
                      }}
                    >
                      Pending Books
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "44vw",
                  height: "10vh",
                  //   backgroundColor: "pink",
                  borderRadius: "20px",
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "bottom",
                  flexDirection: "row",
                  marginTop: "1vh",
                }}
              >
                <Button
                  onClick={() => navigate("/list-of-books")}
                  variant="contained"
                  sx={{
                    backgroundColor: "#2E2E2E",
                    width: "13vw",
                    height: "inherit",
                    borderRadius: "20px",
                    gap: "10px",
                    fontSize: "1.5vw",
                  }}
                >
                  <BookAlt size={"2.5vw"} />
                  BOOKS
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/pending-books");
                  }}
                  sx={{
                    backgroundColor: "#2E2E2E",
                    width: "13vw",
                    height: "inherit",
                    borderRadius: "20px",
                    fontFamily: "Montserrat",
                    fontSize: "1.5vw",
                    gap: "10px",
                  }}
                >
                  <img
                    src="src/resources/pending.svg"
                    alt=""
                    style={{
                      width: "5vw",
                      height: "5vh",
                      objectFit: "contain",
                      //   fill: "white",
                      filter: "invert(100%) ",
                    }}
                  />
                  PENDING
                </Button>
                <Button
                  onClick={() => navigate("/list-of-readers")}
                  variant="contained"
                  sx={{
                    backgroundColor: "#2E2E2E",
                    width: "13vw",
                    height: "inherit",
                    borderRadius: "20px",
                    fontSize: "1.5vw",
                    gap: "10px",
                  }}
                >
                  <BookOpenReader size={"2.5vw"} />
                  READERS
                </Button>
              </Box>
            </Box>

            {/* right box */}
            <Box
              sx={{
                width: "44vw",
                right: 0,
                height: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "2vh",
                // backgroundColor: "pink",
              }}
            >
              <Box
                sx={{
                  width: "44vw",
                  height: "40vh",
                  backgroundColor: "#2E2E2E",
                  borderRadius: "20px",
                  area: "false",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontFamily: "Montserrat",
                    marginTop: "10px",
                    marginBottom: "-50px",
                    fontSize: "3vh",
                  }}
                >
                  Reader Sign Ins
                </Typography>
                <LineChart
                  xAxis={[{ scaleType: "point", data: months }]}
                  series={[
                    {
                      name: "Reader Sign Ins",
                      data: Object.values(userLogCountPerMonth),
                      curve: "linear",
                    },
                  ]}
                  sx={{
                    "& .MuiChartsAxis-tickLabel": {
                      fill: "#F4F4F4 !important",
                    },
                    "& .MuiChartsAxis-line": {
                      stroke: "#F4F4F4 !important",
                    },
                    "& .MuiChartsAxis-tick": {
                      stroke: "#F4F4F4 !important",
                    },
                    "& .css-xyaj9i-MuiMarkElement-root": {
                      fill: "#2E2E2E !important",
                      "&:hover": {
                        fill: "#2E2E2E !important",
                      },
                    },
                  }}
                ></LineChart>
              </Box>
              <Box
                sx={{
                  width: "44vw",
                  height: "35vh",
                  backgroundColor: "#2E2E2E",
                  borderRadius: "20px",
                  area: "false",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#F4F4F4",
                    fontFamily: "Montserrat",
                    marginTop: "10px",
                    // marginBottom: "-50px",
                    fontSize: "3vh",
                  }}
                >
                  Recent Books Borrowed
                </Typography>
                <Box
                  sx={{
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    borderBottomRadius: "20px",
                  }}
                >
                  <Table
                    sx={{
                      width: "44vw",
                    }}
                  >
                    <TableBody>
                      {borrowedBooks?.slice(0, 5).map((item, index) => {
                        const book = books.find(
                          (book) => book.book_id === item.book_id
                        );
                        const user = account.find(
                          (user) => user.user_id === item.user_id
                        );
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              backgroundColor:
                                index % 2 === 0 ? "rgba(25,25,25,0.15)" : "",
                              height: "0.5vh",
                            }}
                          >
                            <TableCell
                              sx={{
                                width: "60%",
                                borderBottom: "none",
                                height: "0.5vh",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#F4F4F4",
                                  fontFamily: "Montserrat",
                                  // fontSize: "2vh",
                                  // textAlign: "center",
                                  marginLeft: "4vw",
                                  textTransform: "uppercase",
                                }}
                              >
                                {book ? book.title : ""}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "40%",
                                borderBottom: "none",
                                height: "0.5vh",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#F4F4F4",
                                  fontFamily: "Montserrat",
                                  // fontSize: "2vh",
                                  marginLeft: "5vw",
                                  // textAlign: "center",
                                }}
                              >
                                {user ? user.firstName : ""}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
