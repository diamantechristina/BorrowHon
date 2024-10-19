import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { ArrowSmallLeft, User, Lock, Marker, Envelope, PhonePause } from "react-flaticons";

// phone number icon not correct, use image instead

const AccountSettings = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2e2e2e",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "5vh",
          backgroundColor: "transparent",
        }}
      >
        <ArrowSmallLeft
          size={20}
          color="#f4f4f4"
          onClick={() => {
            window.history.back();
          }}
        />
        <Typography
          sx={{
            color: "#f4f4f4",
          }}
        >
          Account Settings
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#2e2e2e",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90vw",
            height: "30vh",
            backgroundColor: "red",
            borderRadius: "20px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "90vw",
            height: "12.5vh",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#f4f4f4",
              color: "#f4f4f4",
              width: "12vw",
              height: "7.5vh",
              borderRadius: "10px",
              marginRight: "1vw",
              fontFamily:"Montserrat"
            }}
          >
            History
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#f4f4f4",
              color: "#f4f4f4",
              width: "12vw",
              height: "7.5vh",
              fontSize: "0.75rem",
              borderRadius: "10px",
              fontFamily:"Montserrat"
            }}
          >
            Edit Profile
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "90vw",
            height: "50vh",
            backgroundColor: "red",
          }}
        >
          <Box
            sx={{
              display:"flex",
              flexDirection:"column",
              width:"50%",
              height:"inherit",
              backgroundColor:"green"
            }}
          >
            <Box
              sx={{
                display:"flex",
                width:"100%",
                flexDirection:"column"
              }}
            >
              <Box
              sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
              }}
            >
              <User
                color="#f4f4f4"
              />
              <Typography
                sx={{
                  color:"#f4f4f4",
                  fontFamily:"Montserrat"
                }}
              >
                Username
              </Typography>
            </Box>
            <TextField
              variant="standard"
              sx={{
                width:"90%",
                marginLeft:"5%"
              }}
            />
            </Box>
            <Box
              sx={{
                display:"flex",
                width:"100%",
                flexDirection:"column"
              }}
            >
              <Box
              sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
              }}
            >
              <Lock
                color="#f4f4f4"
              />
              <Typography
                sx={{
                  color:"#f4f4f4",
                  fontFamily:"Montserrat"
                }}
              >
                Password
              </Typography>
            </Box>
            <TextField
              variant="standard"
              sx={{
                width:"90%",
                marginLeft:"5%"
              }}
            />
            </Box>
            <Box
              sx={{
                display:"flex",
                width:"100%",
                flexDirection:"column"
              }}
            >
              <Box
              sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
              }}
            >
              <Marker
                color="#f4f4f4"
              />
              <Typography
                sx={{
                  color:"#f4f4f4",
                  fontFamily:"Montserrat"
                }}
              >
                Address
              </Typography>
            </Box>
            <TextField
              variant="standard"
              sx={{
                width:"90%",
                marginLeft:"5%"
              }}
            />
            </Box>
          </Box>
          
          <Box
            sx={{
              display:"flex",
              width:"50%",
              height:"inherit",
              flexDirection:"column",
              backgroundColor:"blue"
            }}
          >
            <Box
              sx={{
                display:"flex",
                width:"100%",
                flexDirection:"column"
              }}
            >
              <Box
              sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
              }}
            >
              <Envelope
                color="#f4f4f4"
              />
              <Typography
                sx={{
                  color:"#f4f4f4",
                  fontFamily:"Montserrat"
                }}
              >
                Email
              </Typography>
            </Box>
            <TextField
              variant="standard"
              sx={{
                width:"90%",
                marginLeft:"5%",
              }}
            />
            </Box>
            <Box
              sx={{
                display:"flex",
                width:"100%",
                flexDirection:"column"
              }}
            >
              <Box
              sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center"
              }}
            >
              <PhonePause
                color="#f4f4f4"
              />
              <Typography
                sx={{
                  color:"#f4f4f4",
                  fontFamily:"Montserrat"
                }}
              >
                Phone Number
              </Typography>
            </Box>
            <TextField
              variant="standard"
              sx={{
                width:"90%",
                marginLeft:"5%"
              }}
            />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountSettings;
