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
} from "@mui/material";
import { ArrowSmallLeft } from "react-flaticons";
import { useAccount } from "../../library/account";
import { useLog } from "../../library/log";
import "@fontsource/arimo";

const History = () => {
  const navigate = useNavigate();
  const { fetchAccount, account } = useAccount();
  const { fetchLogs, log } = useLog();

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
            // backgroundColor: "red",
            display: "",
            justifyContent: "",
            alignItems: "",
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
                  Name
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
                  Login Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {account?.map((acc, index) => {
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
                    key={acc.acc_id}
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
                      {acc.firstName}
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
