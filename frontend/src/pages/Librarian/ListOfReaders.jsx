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
} from "@mui/material";
import { ArrowSmallLeft } from "react-flaticons";
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

const History = () => {
  const {setReaderUser, currentUser, isAdmin} = useStore();
  const navigate = useNavigate();
  const { fetchAccount, account } = useAccount();
  const { fetchLogs, log } = useLog();

  useEffect(() => {
    setReaderUser(null)
  },[])
  useEffect(() => {
    if(!currentUser) navigate("/");
    else if(!isAdmin) navigate(-1);
  },[])
  
  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // console.log(account?.firstName);
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
          LIST OF READERS
        </Typography>
      </Box>
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
                  // backgroundColor: "pink",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#f4f4f4",
                  textAlign: "center",
                  fontSize: "clamp(1vw, 2.2vw, 2.5vw)",
                  borderWidth: "0px",
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
            height: "75vh",
            backgroundColor: "#2e2e2e",
            // backgroundColor: "red",
            display: "",
            justifyContent: "",
            alignItems: "",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            // display: userHistory?.length > 0 ? "" : "flex",
            // justifyContent: userHistory?.length > 0 ? "" : "center",
            // alignItems: userHistory?.length > 0 ? "" : "center",
          }}
        >
          {/* {userHistory?.length === 0 ? (
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
          ) : ( */}

          <Table>
            <TableBody>
              {account?.filter((acc) => acc.isAdmin === false).map((acc, index) => {
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
                      cursor:"pointer",
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
                        borderRadius:
                          index % 2 === 0 && index === 0
                            ? "20px 0px 0px 0px"
                            : index === account.length - 1
                            ? "0px 0px 0px 20px"
                            : null,
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
                        {acc.firstName} {acc.lastName}
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
                        borderRadius:
                          index % 2 === 0 && index === 0
                            ? "0px 20px 0px 0px"
                            : index === account.length - 1
                            ? "0px 0px 20px 0px"
                            : null,
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
    </Box>
  );
};

export default History;
