import React, { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import {ArrowSmallLeft} from "react-flaticons";
import "@flaticon/flaticon-uicons/css/all/all.rounded.css";
import { useNavigate, useLocation } from "react-router-dom";
import "@fontsource/arimo/600.css";
// phone number icon not correct, use image instead

const AccountSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedIn = location.state?.userLoggedIn; 
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const handleCloseEditOpen = () => setEditProfileOpen(false);
  const handleOpenEditOpen = () => setEditProfileOpen(true);
  return (
    <Box
      sx={{
        backgroundColor: "#2e2e2e",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
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
          ACCOUNT SETTINGS
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
          marginTop: "7.5vh",
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
              fontFamily: "Montserrat",
            }}
          >
            History
          </Button>
          <Button
            variant="outlined"
            onClick={editProfileOpen? handleCloseEditOpen : handleOpenEditOpen}
            sx={{
              borderColor: "#f4f4f4",
              color: "#f4f4f4",
              width: "12vw",
              height: "7.5vh",
              fontSize: "0.75rem",
              borderRadius: "10px",
              fontFamily: "Montserrat",
            }}
          >
             {editProfileOpen ? "Save Profile" : "Edit Profile"}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1.5vh",
            width: "90vw",
            // height: "50vh",
            // backgroundColor: "red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "inherit",
              // backgroundColor: "green",
              gap: "2.5vh",
              paddingLeft: "5vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <i
                  className="fi fi-rr-user"
                  style={{
                    color: "#f4f4f4",
                    fontSize: "1.5vw",
                  }}
                />
                <Typography
                  sx={{
                    color: "#f4f4f4",
                    fontFamily: "Arimo",
                    fontWeight: "600",
                    fontSize: "1.1vw",
                    marginLeft: "0.6vw",
                  }}
                >
                  Username
                </Typography>
              </Box>
              <TextField
                disabled={true}
                value={userLoggedIn.username}
                variant="standard"
                sx={{
                  fontFamily: "Arimo",
                  fontSize: "1.5vw",
                  color: "#f4f4f4",
                  width: "75%",
                  marginLeft: "5%",
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root": {
                    ":before": {
                      borderBottom: "1px solid #f4f4f4",
                    },
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: "2px solid #f4f4f4",
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ':{
                    borderBottomStyle: "solid"
                  },
                  '.css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled':{
                    WebkitTextFillColor: "#f4f4f4"
                  }
                }}
                
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    
                    sx={{
                      pointerEvents: editProfileOpen ? "auto" : "none",
                      color: "#F4F4F4",
                      // backgroundColor: "red",
                      minWidth: 0,
                    }}
                  >
                    {editProfileOpen ? <i className="fi fi-rr-pencil"/>: ''}
                  </Button>
                </InputAdornment>
              ),
            }}
                
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <i
                  className="fi fi-rr-lock"
                  style={{
                    color: "#f4f4f4",
                    fontSize: "1.5vw",
                  }}
                />
                <Typography
                  sx={{
                    color: "#f4f4f4",
                    fontFamily: "Arimo",
                    fontWeight: "600",
                    fontSize: "1.1vw",
                    marginLeft: "0.6vw",
                  }}
                >
                  Password
                </Typography>
              </Box>
              <TextField
                type="password"
                disabled={true}
                value={userLoggedIn.password}
                variant="standard"
                sx={{
                  fontFamily: "Arimo",
                  fontSize: "1.5vw",
                  color: "#f4f4f4",
                  width: "75%",
                  marginLeft: "5%",
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root": {
                    ":before": {
                      borderBottom: "1px solid #f4f4f4",
                    },
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: "2px solid #f4f4f4",
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ':{
                    borderBottomStyle: "solid"
                  },
                  '.css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled':{
                    WebkitTextFillColor: "#f4f4f4"
                  }
                }}
                
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    
                    sx={{
                      pointerEvents: editProfileOpen ? "auto" : "none",
                      color: "#F4F4F4",
                      // backgroundColor: "red",
                      minWidth: 0,
                    }}
                  >
                    {editProfileOpen ? <i className="fi fi-rr-pencil"/>: ''}
                  </Button>
                </InputAdornment>
              ),
            }}
                
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <i
                  className="fi fi-rr-marker"
                  style={{
                    color: "#f4f4f4",
                    fontSize: "1.5vw",
                  }}
                />
                <Typography
                  sx={{
                    color: "#f4f4f4",
                    fontFamily: "Arimo",
                    fontWeight: "600",
                    fontSize: "1.1vw",
                    marginLeft: "0.6vw",
                  }}
                >
                  Address
                </Typography>
              </Box>
              <TextField
                disabled={true}
                value={userLoggedIn.address}
                variant="standard"
                sx={{
                  fontFamily: "Arimo",
                  fontSize: "1.5vw",
                  color: "#f4f4f4",
                  width: "75%",
                  marginLeft: "5%",
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root": {
                    ":before": {
                      borderBottom: "1px solid #f4f4f4",
                    },
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: "2px solid #f4f4f4",
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ':{
                    borderBottomStyle: "solid"
                  },
                  '.css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled':{
                    WebkitTextFillColor: "#f4f4f4"
                  }
                }}
                
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    
                    sx={{
                      pointerEvents: editProfileOpen ? "auto" : "none",
                      color: "#F4F4F4",
                      // backgroundColor: "red",
                      minWidth: 0,
                    }}
                  >
                    {editProfileOpen ? <i className="fi fi-rr-pencil"/>: ''}
                  </Button>
                </InputAdornment>
              ),
            }}
                
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "50%",
              height: "inherit",
              flexDirection: "column",
              // backgroundColor: "blue",
              gap: "2.5vh",
            }}
            >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                paddingLeft: "2.5vw",
              }}
              >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                >
                <i
                  className="fi fi-rr-envelope"
                  style={{
                    color: "#f4f4f4",
                    fontSize: "1.5vw",
                  }}
                  />
                <Typography
                  sx={{
                    color: "#f4f4f4",
                    fontFamily: "Arimo",
                    fontWeight: "600",
                    fontSize: "1.1vw",
                    marginLeft: "0.6vw",
                  }}
                  >
                  Email
                </Typography>
              </Box>
              <TextField
                disabled={true}
                value={userLoggedIn.email}
                variant="standard"
                sx={{
                  fontFamily: "Arimo",
                  fontSize: "1.5vw",
                  color: "#f4f4f4",
                  width: "75%",
                  marginLeft: "5%",
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root": {
                    ":before": {
                      borderBottom: "1px solid #f4f4f4",
                    },
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: "2px solid #f4f4f4",
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ':{
                    borderBottomStyle: "solid"
                  },
                  '.css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled':{
                    WebkitTextFillColor: "#f4f4f4"
                  }
                }}
                
                InputProps={{
                  style: {
                    color: "#F4F4F4",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                  <Button
                    
                    sx={{
                      pointerEvents: editProfileOpen ? "auto" : "none",
                      color: "#F4F4F4",
                      // backgroundColor: "red",
                      minWidth: 0,
                    }}
                    >
                    {editProfileOpen ? <i className="fi fi-rr-pencil"/>: ''}
                  </Button>
                </InputAdornment>
              ),
            }}
            
            />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                paddingLeft: "2.5vw",
              }}
              >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    objectFit: "contain",
                    aspectRatio: "1/1",
                    transform: "scaleX(-1)",

                  }}
                >
                  <i
                    className="fi fi-rr-phone-flip"
                    style={{
                      color: "#f4f4f4",
                      fontSize: "1.5vw",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: "#f4f4f4",
                    fontFamily: "Arimo",
                    fontWeight: "600",
                    fontSize: "1.1vw",
                    marginLeft: "0.6vw",
                  }}
                >
                  Phone Number
                </Typography>
              </Box>
              <TextField
                disabled={true}
                value={userLoggedIn.phoneNumber}
                variant="standard"
                sx={{
                  fontFamily: "Arimo",
                  fontSize: "1.5vw",
                  color: "#f4f4f4",
                  width: "75%",
                  marginLeft: "5%",
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root": {
                    ":before": {
                      borderBottom: "1px solid #f4f4f4",
                    },
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: "2px solid #f4f4f4",
                  },
                  '.css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ':{
                    borderBottomStyle: "solid"
                  },
                  '.css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled':{
                    WebkitTextFillColor: "#f4f4f4"
                  }
                }}
                
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    
                    sx={{
                      pointerEvents: editProfileOpen ? "auto" : "none",
                      color: "#F4F4F4",
                      // backgroundColor: "red",
                      minWidth: 0,
                    }}
                  >
                    {editProfileOpen ? <i className="fi fi-rr-pencil"/>: ''}
                  </Button>
                </InputAdornment>
              ),
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
