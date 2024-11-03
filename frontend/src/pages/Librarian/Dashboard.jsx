import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { Bell, MenuBurger, BookAlt, BookOpenReader } from "react-flaticons";
import { useBook } from "../../library/book.js";
import { useHistory } from "../../library/history.js";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [burgerAnchorEl, setBurgerAnchorEl] = React.useState(null);
  const burgerOpen = Boolean(burgerAnchorEl);

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

  console.log("pendingBooks: ", pendingBooks);


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
          //   flexDirection: "column",
          //   height: "100%",
          //   width: "100%",
          //   position: "absolute",
          zIndex: 1,
        }}
      >
        {/* navbar */}
        <Box
          sx={{
            width: "100vw",
            height: "15vh",
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
          }}
        >
          <img
            src="src/resources/logo.png"
            alt="BorrowHon"
            style={{
              height: "1.5vw",
              marginTop: "20px",
              marginLeft: "30px",
              paddingTop: "20px",
            }}
          />
          <Box
            sx={{
              height: "70vh",
              marginTop: "30px",
            }}
          >
            <Stack
              direction="row"
              spacing={4}
              sx={{
                marginRight: "120px",
                // marginTop: "20px",
                // backgroundColor: "red",
              }}
            >
              <Button
                sx={{
                  // backgroundColor: "red",
                  color: "#F4F4F4",
                  // width:"60px",
                  // height:"50px",
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: "#D9D9D9",
                    color: "#191919",
                    backgroundSize: "50%",
                  },
                }}
              >
                <Bell
                  size={40}
                  style={{
                    // backgroundColor: "green",
                    marginLeft: "-10px",
                    marginRight: "-10px",
                    // paddingLeft : "-10px"
                    // marginTop:"-5px",
                  }}
                />
              </Button>
              <Button
                id="burger-btn"
                aria-controls={burgerOpen ? "burger-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={burgerOpen ? "true" : undefined}
                onClick={handleBurgerClick}
                sx={{
                  backgroundColor:
                    burgerAnchorEl === null ? "transparent" : "#D9D9D9",
                  color: burgerAnchorEl === null ? "#F4F4F4" : "#191919",
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: "#D9D9D9",
                    color: "#191919",
                  },
                }}
              >
                <MenuBurger
                  size={40}
                  style={{
                    // backgroundColor: "green",
                    marginLeft: "-10px",
                    marginRight: "-10px",
                  }}
                />
              </Button>
              <Menu
                id="burger-menu"
                anchorEl={burgerAnchorEl}
                open={burgerOpen}
                onClose={() => setBurgerAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "burger-btn",
                }}
                PaperProps={{
                  style: {
                    width: "155px",
                    backgroundColor: "#D9D9D9",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => setBurgerAnchorEl(null)}>
                  Account Settings
                </MenuItem>
                {/* <MenuItem onClick={() => navigate("/borrow-history", { state: { userLoggedIn: userLoggedIn }})}>History</MenuItem> */}
                <MenuItem onClick={() => setBurgerAnchorEl(null)}>
                  Log Out
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Box>
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
                    fontSize: "26px",
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
                    value={((pendingBooks + 4) / booksLength) * 100}
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
                    value={(4 / booksLength) * 100}
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
                      3
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
                // backgroundColor: "pink",
              }}
            >
              <Box
                sx={{
                  width: "44vw",
                  height: "45vh",
                  backgroundColor: "#2E2E2E",
                  borderRadius: "20px",
                  area: "false",
                }}
              >
                <LineChart
                  xAxis={[{ scaleType: "point", data: months }]}
                  series={[
                    {
                      name: "Reader Sign Ins",
                      data: [20, 5, 35, 50, 10, 40, 15, 30, 25, 45, 5, 10],
                      curve: "linear",
                    },
                  ]}
                ></LineChart>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
