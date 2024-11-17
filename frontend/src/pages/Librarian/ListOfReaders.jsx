import React from "react";
import moment from "moment";
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
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ArrowSmallLeft, Search } from "react-flaticons";
import { useAccount } from "../../library/account";
import { useLog } from "../../library/log";
import "@fontsource/arimo";
import { useStore } from "../../library/store";
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${
      name.split(" ")[name.split(" ").length - 1][0]
    }`,
  };
}

const ListOfReaders = () => {
  const { setReaderUser, currentUser, isAdmin, readerUser, setCurrentPage } =
    useStore();
  const navigate = useNavigate();
  const { fetchAccount, account } = useAccount();
  const { fetchLogs, log } = useLog();

  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  useEffect(() => {
    setReaderUser(null);
  }, [readerUser]);
  useEffect(() => {
    if (!currentUser) navigate("/");
    else if (!isAdmin) navigate(-1);
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const sortedAccounts = account
  ?.filter((acc) => acc.isAdmin === false)
  .sort((a, b) => {
    const currentLogA = log?.find((userlog) => userlog.acc_id === a.acc_id && userlog.logoutdate === null);
    const currentLogB = log?.find((userlog) => userlog.acc_id === b.acc_id && userlog.logoutdate === null);

    if (currentLogA && !currentLogB) {
      return -1; // Active user A should come before inactive user B
    } else if (!currentLogA && currentLogB) {
      return 1; // Active user B should come before inactive user A
    } else {
      // Both are either active or inactive, so compare by the latest login date
      const latestLogA = log
        ?.filter((log) => log.acc_id === a.acc_id)
        .reduce((latest, current) => {
          if (!latest || current.logindate > latest.logindate) {
            return current;
          }
          return latest;
        }, null);

      const latestLogB = log
        ?.filter((log) => log.acc_id === b.acc_id)
        .reduce((latest, current) => {
          if (!latest || current.logindate > latest.logindate) {
            return current;
          }
          return latest;
        }, null);

      if (!latestLogA && !latestLogB) {
        return 0; // No logs for either account
      } else if (!latestLogA) {
        return 1; // Account B has logs but A does not
      } else if (!latestLogB) {
        return -1; // Account A has logs but B does not
      } else {
        // Compare by latest login date (most recent first)
        const loginDateA = moment(latestLogA.logindate);
        const loginDateB = moment(latestLogB.logindate);

        return -loginDateA.diff(loginDateB);
      }
    }
  });


  // console.log(account?.firstName);
  return (
    <Box
      sx={{
        display: isAdmin ? "flex" : "none",
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
          // zIndex: 1000, // Ensures it stays on top
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
          LIST OF READERS
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

      {sortedAccounts?.filter((acc) =>
        acc.firstName.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ).length === 0 ? (
        <Box
          sx={{
            marginTop: "10vh",
            width: "90vw",
            height: "85vh",
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            NO ACCOUNT FOUND
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "10vh",
            width: "90vw",
            height: "85vh",
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Table>
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                // backgroundColor: "blue",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#f4f4f4",
                    textAlign: "center",
                    fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                    borderWidth: "0px",
                    width: "50vw",
                    paddingRight: "5vw",
                    // backgroundColor: "pink",
                  }}
                >
                  &nbsp;Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#f4f4f4",
                    textAlign: "center",
                    fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                    borderWidth: "0px",
                    paddingLeft: "5vw",
                    width: "50vw",
                    // backgroundColor: "purple",
                  }}
                >
                  Login Status
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Box
            sx={{
              width: "90vw",
              maxHeight: "75vh",
              backgroundColor: "#2e2e2e",
              // backgroundColor: "red",
              display: "",
              justifyContent: "",
              alignItems: "",
              overflowY: "scroll",
              borderRadius: "20px",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              // display: userHistory?.length > 0 ? "" : "flex",
              // justifyContent: userHistory?.length > 0 ? "" : "center",
              // alignItems: userHistory?.length > 0 ? "" : "center",
            }}
          >
            <Table>
              <TableBody>
                {sortedAccounts
                  ?.filter((acc) =>
                    acc.firstName
                      .toLowerCase()
                      .includes(searchQuery.trim().toLowerCase())
                  )
                  .map((acc, index) => {
                    const latestLog = log?.reduce((latest, current) => {
                      if (
                        current.acc_id === acc.acc_id &&
                        (!latest || current.logindate > latest.logindate)
                      ) {
                        return current;
                      }
                      return latest;
                    }, null);

                    return (
                      <TableRow
                        onClick={() => {
                          setReaderUser(acc);
                          navigate(`/reader`);
                        }}
                        key={acc.acc_id}
                        sx={{
                          cursor: "pointer",
                          backgroundColor:
                            index % 2 === 0
                              ? "rgba(34,85,96, 0.20)"
                              : "rgba(34,85,96, 0.40)",
                        }}
                      >
                        <TableCell
                          sx={{
                            width: "20vw",
                            color: "#E8E8E8",
                            textAlign: "center",
                            fontFamily: "Arimo",
                            borderWidth: "0px",
                            // display: "flex",
                            // justifyContent: "center",
                            fontSize: "clamp(1vw, 1.2vw, 1.5vw)",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                              paddingLeft: "10vw",
                              gap: "1vw",
                            }}
                          >
                            <Box
                              sx={{
                                width: "clamp(6vw, 6vw, 6vw)",
                                height: "clamp(6vw, 6vw, 6vw)",
                                borderRadius: "50%",

                                // remove when there's profile na in database
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {acc.profilepic !== undefined ? (
                                <Avatar
                                  alt={acc.firstName + " " + acc.lastName}
                                  src={acc.profilepic}
                                  sx={{
                                    width: "clamp(2rem, 5vw, 6rem)",
                                    height: "clamp(2rem, 5vw, 6rem)",
                                  }}
                                />
                              ) : (
                                <Avatar
                                  {...stringAvatar(
                                    acc.firstName + " " + acc.lastName
                                  )}
                                  sx={{
                                    width: "clamp(2rem, 5vw, 6rem)",
                                    height: "clamp(2rem, 5vw, 6rem)",
                                    fontFamily: "Montserrat",
                                    fontSize: "clamp(1rem, 2vw, 4rem)",
                                    fontWeight: "bold",
                                    backgroundColor: stringToColor(
                                      acc.firstName + " " + acc.lastName
                                    ),
                                  }}
                                />
                              )}
                            </Box>
                            {/* {acc.profilepic ? acc.profilepic : "N/A"} */}
                            {acc.firstName}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "20vw",
                            color: latestLog
                              ? !latestLog?.logoutdate &&
                                latestLog?.logindate != null
                                ? "#05B049"
                                : "#E8E8E8"
                              : "#E8E8E8",
                            textAlign: "center",
                            textTransform: "capitalize",
                            fontFamily: "Arimo",
                            borderWidth: "0px",
                            fontSize: "clamp(1vw, 1.2vw, 1.5vw)",
                          }}
                        >
                          {latestLog &&
                          !latestLog?.logoutdate &&
                          latestLog?.logindate != null
                            ? "Online"
                            : latestLog && latestLog?.logoutdate != null
                            ? moment(latestLog?.logoutdate).fromNow()
                            : "Never Logged In"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {/* // )} */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ListOfReaders;
