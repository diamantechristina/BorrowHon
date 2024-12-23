import React, {
  useMemo,
  useState,
  useReducer,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { styled } from "@mui/material/styles";
import Resizer from "react-image-file-resizer";
import {
  Avatar,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  SnackbarContent,
  Modal,
  Backdrop,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ArrowSmallLeft, Marker, Envelope } from "react-flaticons";
import { useAccount } from "../../library/account";
import "@flaticon/flaticon-uicons/css/all/all.rounded.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { useNavigate, useLocation } from "react-router-dom";
import "@fontsource/arimo/600.css";
import "@fontsource/montserrat/600.css";
import { useStore } from "../../library/store";

const editProfileReducer = (state, action) => {
  switch (action.type) {
    case "toggleUsername":
      return { ...state, username: !state.username };
    case "togglePassword":
      return { ...state, password: !state.password };
    case "toggleEmail":
      return { ...state, email: !state.email };
    case "toggleAddress":
      return { ...state, address: !state.address };
    case "togglePhoneNumber":
      return { ...state, phoneNumber: !state.phoneNumber };
    case "resetAllExcept":
      return {
        ...state,
        username: action.payload === "username" ? state.username : false,
        password: action.payload === "password" ? state.password : false,
        email: action.payload === "email" ? state.email : false,
        address: action.payload === "address" ? state.address : false,
        phoneNumber:
          action.payload === "phoneNumber" ? state.phoneNumber : false,
      };
    default:
      return state;
  }
};

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const suspendReasons = [
  "Multiple unreturned books",
  "Violation of Policies",
  "System Misuse",
];
const ReaderSettings = () => {
  const {
    currentUser,
    readerUser,
    setReaderUser,
    setCurrentPage,
    currentPage,
  } = useStore();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUnsuspend, setOpenUnsuspend] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenUnsuspend = () => {
    setOpenUnsuspend(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuspendReason("");
    setOpenUnsuspend(false);
  };
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (
      currentPage !== "/list-of-readers" &&
      currentPage !== "/borrow-history" &&
      currentPage !== "/reader"
    ) {
      navigate(currentPage);
    } else if (!readerUser || readerUser === null)
      currentPage === "/reader" ? navigate(-1) : navigate(currentPage);
    else {
      setDisplay(true);
    }
  }, [readerUser]);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  const { updateAccount } = useAccount();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [sncakBarSuccess, setSnackbarSuccess] = useState(false);
  const [editProfile, dispatch] = useReducer(editProfileReducer, {
    username: false,
    password: false,
    email: false,
    address: false,
    phoneNumber: false,
  });
  const [userLoggedIn, setUserLoggedIn] = useState(
    readerUser !== null ? readerUser : currentUser
  );
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleUsername = () => {
    if (editProfile.username) {
      userLoggedIn.username =
        readerUser !== null ? readerUser.username : currentUser.username;
    }
    dispatch({ type: "toggleUsername" });
    dispatch({ type: "resetAllExcept", payload: "username" });
  };
  const handleTogglePassword = () => {
    if (editProfile.password) {
      userLoggedIn.password =
        readerUser !== null ? readerUser.password : currentUser.password;
    }
    setShowPassword(false)
    dispatch({ type: "togglePassword" });
    dispatch({ type: "resetAllExcept", payload: "password" });
  };
  const handleToggleEmail = () => {
    if (editProfile.email) {
      userLoggedIn.email =
        readerUser !== null ? readerUser.email : currentUser.email;
    }
    dispatch({ type: "toggleEmail" });
    dispatch({ type: "resetAllExcept", payload: "email" });
  };
  const handleToggleAddress = () => {
    if (editProfile.address) {
      userLoggedIn.address =
        readerUser !== null ? readerUser.address : currentUser.address;
    }
    dispatch({ type: "toggleAddress" });
    dispatch({ type: "resetAllExcept", payload: "address" });
  };
  const handleTogglePhoneNumber = () => {
    if (editProfile.phoneNumber) {
      userLoggedIn.phoneNumber =
        readerUser !== null ? readerUser.phoneNumber : currentUser.phoneNumber;
    }
    dispatch({ type: "togglePhoneNumber" });
    dispatch({ type: "resetAllExcept", payload: "phoneNumber" });
  };
  const handleCloseEditOpen = async () => {
    setShowPassword(false);
    if (userLoggedIn === readerUser) {
      setEditProfileOpen(false);
      dispatch({ type: "resetAllExcept", payload: "none" });
      return;
    }
    const { success, message } = await updateAccount(
      userLoggedIn._id,
      userLoggedIn,
      editProfile.username,
      editProfile.email
    );
    setSnackbarMessage(message);
    setSnackbarSuccess(success);
    if (success) {
      dispatch({ type: "resetAllExcept", payload: "none" });
      setEditProfileOpen(false);
      setReaderUser(userLoggedIn);
    }
    setOpenSnackbar(true);
  };
  const handleOpenEditOpen = () => setEditProfileOpen(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (userLoggedIn !== undefined) {
      setUserLoggedIn((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };
  const resizeFile = (file, width, height) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const onChangeCoverPhoto = async (event) => {
    const file = event.target.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      setSnackbarMessage("Invalid image format!");
      setSnackbarSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    const image = await resizeFile(file, 1000, 500);
    setUserLoggedIn((prevUser) => ({
      ...prevUser,
      coverpic: image,
    }));
  };

  const onChangeProfilePic = async (event) => {
    const file = event.target.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      setSnackbarMessage("Invalid image format!");
      setSnackbarSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    const image = await resizeFile(file, 500, 500);
    setUserLoggedIn((prevUser) => ({
      ...prevUser,
      profilepic: image,
    }));
  };

  const handleSuspend = async () => {
    if (!suspendReason) {
      setSnackbarMessage("Please select a suspend reason!");
      setSnackbarSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    const suspendedUser = {
      ...userLoggedIn,
      isSuspended: true,
      suspendReason: suspendReason,
    };
    const { success, message } = await updateAccount(
      suspendedUser._id,
      suspendedUser,
      false
    );
    setReaderUser(suspendedUser);
    setSnackbarMessage("Account suspended successfully!");
    setSnackbarSuccess(success);
    setOpenSnackbar(true);
    handleClose();
  };

  const handleUnsuspend = async () => {
    const suspendedUser = {
      ...userLoggedIn,
      isSuspended: false,
      suspendReason: null,
    };
    const { success, message } = await updateAccount(
      suspendedUser._id,
      suspendedUser,
      false
    );
    setReaderUser(suspendedUser);
    setSnackbarMessage("Account unsuspended successfully!");
    setSnackbarSuccess(success);
    setOpenSnackbar(true);
    handleClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2e2e2e",
        width: "100vw",
        height: "100vh",
        display: display ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: sncakBarSuccess ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <Button
        variant="outlined"
        onClick={readerUser.isSuspended ? handleOpenUnsuspend : handleOpen}
        sx={{
          display: readerUser ? "auto" : "none",
          borderColor: "#f4f4f4",
          color: "#f4f4f4",
          position: "fixed",
          top: "7.5vh",
          right: "5vw",
          width: "12vw",
          height: "7.5vh",
          fontSize: "0.75rem",
          borderRadius: "10px",
          fontFamily: "Montserrat",
        }}
      >
        {readerUser.isSuspended ? "Unsuspend" : " Suspend"}
      </Button>
      {/* for suspend */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50vw",
            height: "80vh",
            p: 4,
            backgroundColor: "#225560",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#F4F4F4",
            flexDirection: "column",
          }}
        >
          <i
            className="fi fi-bs-cross-small"
            style={{
              fontSize: "2vw",
              cursor: "pointer",
              position: "absolute",
              top: "1vh",
              right: "1vh",
            }}
            onClick={handleClose}
          ></i>
          <Typography
            sx={{
              fontSize: "3.5vw",
              fontWeight: "bold",
              fontFamily: "montserrat",
            }}
          >
            SUSPEND ACCOUNT
          </Typography>
          <Box
            sx={{
              width: "50vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                width: "50vw",
                gap: "30px",
              }}
            >
              {userLoggedIn?.profilepic !== undefined ? (
                <Avatar
                  alt={userLoggedIn?.firstName + " " + userLoggedIn?.lastName}
                  src={userLoggedIn?.profilepic}
                  sx={{
                    width: "9rem",
                    height: "9rem",
                    marginLeft: "4rem",
                  }}
                />
              ) : (
                <Avatar
                  {...stringAvatar(
                    userLoggedIn?.firstName + " " + userLoggedIn?.lastName
                  )}
                  sx={{
                    width: "9rem",
                    height: "9rem",
                    marginLeft: "4rem",
                    fontFamily: "Montserrat",
                    fontSize: "clamp(2.5rem, 5vw, 10rem)",
                    fontWeight: "bold",
                    backgroundColor: stringToColor(
                      userLoggedIn?.firstName + " " + userLoggedIn?.lastName
                    ),
                  }}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2.3vw",
                    fontWeight: "bold",
                    fontFamily: "montserrat",
                    fontColor: "#ECECEC",
                  }}
                >
                  {userLoggedIn?.firstName + " " + userLoggedIn?.lastName}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Arimo",
                    fontSize: "1.5vw",
                  }}
                >
                  {userLoggedIn?.username}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "50vw",
                gap: "30px",
                marginTop: "-3vh",
              }}
            >
              <Box
                sx={{
                  width: "20vw",
                  height: "45vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "20px",
                  textAlign: "right",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "10px",
                    height: "5vh",
                  }}
                >
                  <Marker size={"1.75vw"} />
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontWeight: "bold",
                      fontFamily: "Arimo",
                      fontColor: "#ECECEC",
                    }}
                  >
                    Address
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "10px",
                    height: "5vh",
                  }}
                >
                  <Envelope size={"1.75vw"} />
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontWeight: "bold",
                      fontFamily: "Arimo",
                      fontColor: "#ECECEC",
                    }}
                  >
                    Email
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "10px",
                    height: "5vh",
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
                        fontSize: "1.75vw",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontWeight: "bold",
                      fontFamily: "Arimo",
                      fontColor: "#ECECEC",
                    }}
                  >
                    Phone Number
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: "10px",
                    height: "5vh",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      height: "5vh",
                    }}
                  >
                    <i
                      className="fi fi-rr-user"
                      style={{
                        color: "#f4f4f4",
                        fontSize: "1.75vw",
                      }}
                    >
                      <i
                        className="fi fi-br-ban"
                        style={{
                          color: "#f4f4f4",
                          fontSize: "1vw",
                          marginTop: "1.75vh",
                          marginLeft: "-.75vw",
                          backgroundColor: "#225560",
                          borderRadius: "50%",
                        }}
                      />
                    </i>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontWeight: "bold",
                      fontFamily: "Arimo",
                      fontColor: "#ECECEC",
                    }}
                  >
                    Suspend Reason
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30vw",
                  height: "45vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "5vh",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontFamily: "Arimo",
                    }}
                  >
                    {userLoggedIn?.address}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "5vh",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontFamily: "Arimo",
                    }}
                  >
                    {userLoggedIn?.email}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "5vh",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5vw",
                      fontFamily: "Arimo",
                    }}
                  >
                    {userLoggedIn?.phoneNumber}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "30vw",
                    height: "5vh",
                  }}
                >
                  {suspendReason ? (
                    ""
                  ) : (
                    <Typography
                      sx={{
                        position: "relative",
                        fontSize: "1.5vw",
                        fontFamily: "Arimo",
                        marginTop: ".5vh",
                        textWrap: "nowrap",
                      }}
                    >
                      Select a Suspend Reason
                    </Typography>
                  )}
                  <FormControl focused={false} variant="standard">
                    <Select
                      value={suspendReason}
                      label="Suspend Reason"
                      onChange={(e) => setSuspendReason(e.target.value)}
                      sx={{
                        color: "#F4F4F4",
                        fontSize: "1.5vw",
                        fontFamily: "Arimo",
                        width: "25vw",
                        marginLeft: suspendReason ? null : "-17.75vw",
                        "&.MuiInputBase-root": {
                          "&:before": {
                            borderBottom: "2px solid #FFFFFF", // Normal state border color
                            marginBottom: "1vh",
                          },
                          "&:hover:before": {
                            borderBottom: "2px solid #FFFFFF", // Hover state border color
                          },
                          "&:after": {
                            borderBottom: "2px solid #00FF00", // Focus state border color
                          },
                        },
                        ".MuiSelect-iconStandard": {
                          color: "#F4F4F4",
                        },
                      }}
                    >
                      {suspendReasons.map((reason) => (
                        <MenuItem key={reason} value={reason}>
                          {reason}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "30vw",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "clamp(10rem, 12vw, 40rem)",
                height: "70px",
                borderRadius: "20px", // border radius
                bgcolor: "#1FAA70",
                color: "#F4F4F4",
                "&:hover": {
                  bgcolor: "#4dc995",
                  color: "#F4F4F4",
                  boxShadow: "none",
                },
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxShadow: "none",
                textTransform: "none",
                fontSize: "18px",
              }}
              tabIndex={-1}
              onClick={handleSuspend}
            >
              Suspend
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "clamp(10rem, 12vw, 40rem)",
                height: "70px",
                borderRadius: "20px",
                bgcolor: "transparent",
                border: "2px solid #f4f4f4",
                color: "#F4F4F4",
                "&:hover": {
                  boxShadow: "none",
                },
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxShadow: "none",
                textTransform: "none",
                fontSize: "18px",
              }}
              tabIndex={-1}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* For unsuspend */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openUnsuspend}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40vw",
            height: "50vh",
            p: 4,
            backgroundColor: "#225560",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#F4F4F4",
            flexDirection: "column",
          }}
        >
          <i
            className="fi fi-bs-cross-small"
            style={{
              fontSize: "2vw",
              cursor: "pointer",
              position: "absolute",
              top: "1vh",
              right: "1vh",
            }}
            onClick={handleClose}
          ></i>

          <Typography
            sx={{
              fontSize: "3vw",
              fontWeight: "bold",
              fontFamily: "montserrat",
            }}
          >
            UNSUSPEND ACCOUNT
          </Typography>

          <Box
            sx={{
              width: "33vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "3vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <i className="fi fi-rr-user" style={{ fontSize: "2vw" }}></i>
              <Typography
                sx={{
                  fontSize: "1.5vw",
                  fontFamily: "Arimo",
                  fontWeight: "bold",
                }}
              >
                Username
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5vw",
                  fontFamily: "Arimo",
                  marginLeft: "20px",
                }}
              >
                {userLoggedIn?.username}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  height: "5vh",
                }}
              >
                <i
                  className="fi fi-rr-user"
                  style={{
                    color: "#f4f4f4",
                    fontSize: "1.75vw",
                  }}
                >
                  <i
                    className="fi fi-br-ban"
                    style={{
                      color: "#f4f4f4",
                      fontSize: "1vw",
                      marginTop: "1.75vh",
                      marginLeft: "-.75vw",
                      backgroundColor: "#225560",
                      borderRadius: "50%",
                    }}
                  />
                </i>
              </Box>

              <Typography
                sx={{
                  fontSize: "1.5vw",
                  fontFamily: "Arimo",
                  fontWeight: "bold",
                  width: "20vw",
                  textWrap: "nowrap",
                }}
              >
                Suspend Reason
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5vw",
                  fontFamily: "Arimo",
                  marginLeft: "1vw",
                  width: "25vw",
                  textWrap: "nowrap",
                }}
              >
                {readerUser.suspendReason}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "30vw",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "clamp(10rem, 12vw, 40rem)",
                height: "70px",
                borderRadius: "20px", // border radius
                bgcolor: "#1FAA70",
                color: "#F4F4F4",
                "&:hover": {
                  bgcolor: "#4dc995",
                  color: "#F4F4F4",
                  boxShadow: "none",
                },
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxShadow: "none",
                textTransform: "none",
                fontSize: "18px",
              }}
              tabIndex={-1}
              onClick={handleUnsuspend}
            >
              Unsuspend
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "clamp(10rem, 12vw, 40rem)",
                height: "70px",
                borderRadius: "20px",
                bgcolor: "transparent",
                border: "2px solid #f4f4f4",
                color: "#F4F4F4",
                "&:hover": {
                  boxShadow: "none",
                },
                fontFamily: "Montserrat",
                fontWeight: "bold",
                boxShadow: "none",
                textTransform: "none",
                fontSize: "18px",
              }}
              tabIndex={-1}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
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
          onClick={() => {
            navigate(-1);
          }}
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
            fontWeight: "700",
            fontSize: "clamp(2vw, 2.5vw, 2.5vw)",
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
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "end",
            width: "90vw",
            height: "30vh",
            backgroundImage:
              userLoggedIn?.coverpic !== undefined
                ? `url(${userLoggedIn.coverpic})`
                : 'url("../src/resources/default-coverphoto.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "20px",
          }}
        >
          <Button
            component="label"
            variant="text"
            role="undefined"
            onChange={onChangeCoverPhoto}
            sx={{
              display: editProfileOpen ? "flex" : "none",
              color: "#f4f4f4",
              margin: 0,
              padding: 0,
              textTransform: "none",
              width: "10vw",
              marginRight: "2.5rem",
              marginBottom: "0.5rem",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Change Cover Photo
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={onChangeCoverPhoto}
            />
          </Button>
        </Box>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "65vw",
              height: "12.5vh",
            }}
          >
            {userLoggedIn?.profilepic !== undefined ? (
              <Avatar
                alt={userLoggedIn?.firstName + " " + userLoggedIn?.lastName}
                src={userLoggedIn?.profilepic}
                sx={{
                  border: "0.5rem solid #2e2e2e",
                  width: "10rem",
                  height: "10rem",
                  marginTop: "-6rem",
                  marginLeft: "4rem",
                }}
              />
            ) : (
              <Avatar
                {...stringAvatar(
                  userLoggedIn?.firstName + " " + userLoggedIn?.lastName
                )}
                sx={{
                  border: "0.5rem solid #2e2e2e",
                  width: "10rem",
                  height: "10rem",
                  marginTop: "-6rem",
                  marginLeft: "4rem",
                  fontFamily: "Montserrat",
                  fontSize: "clamp(2.5rem, 5vw, 10rem)",
                  fontWeight: "bold",
                  backgroundColor: stringToColor(
                    userLoggedIn?.firstName + " " + userLoggedIn?.lastName
                  ),
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginLeft: "0.5rem",
                  marginTop: "0.5rem",
                  color: "#f4f4f4",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                {userLoggedIn?.firstName} {userLoggedIn?.lastName}
              </Typography>
              <Button
                component="label"
                role="undefined"
                onChange={onChangeProfilePic}
                variant="text"
                sx={{
                  display: editProfileOpen ? "flex" : "none",
                  color: "#f4f4f4",
                  margin: 0,
                  padding: 0,
                  textTransform: "none",
                  width: "10vw",
                  marginLeft: "0.5rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Change Profile Picture
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={onChangeProfilePic}
                />
              </Button>
            </Box>
          </Box>
          <Button
            onClick={() => {
              navigate("/borrow-history");
            }}
            variant="outlined"
            sx={{
              display: readerUser ? "flex" : "none",
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
          <Box
            sx={{
              display: readerUser ? "none" : "flex",
              width: "12vw",
              height: "7.5vh",
              borderRadius: "10px",
              marginRight: "1vw",
            }}
          ></Box>
          <Button
            variant="outlined"
            onClick={editProfileOpen ? handleCloseEditOpen : handleOpenEditOpen}
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
            marginTop: "1.5vh",
            width: "90vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "inherit",
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
                value={userLoggedIn?.username}
                disabled={!editProfile.username}
                onChange={handleInputChange}
                name="username"
                focused={editProfile.username}
                autoFocus={editProfile.username}
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
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                    {
                      borderBottom: "2px solid #f4f4f4",
                    },
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ":
                    {
                      borderBottomStyle: "solid",
                    },
                  ".css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled":
                    {
                      WebkitTextFillColor: "#f4f4f4",
                    },
                }}
                InputProps={{
                  style: {
                    color: "#F4F4F4",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleToggleUsername}
                        sx={{
                          pointerEvents: editProfileOpen ? "auto" : "none",
                          color: "#F4F4F4",
                          // backgroundColor: "red",
                          minWidth: 0,
                        }}
                      >
                        {editProfileOpen ? (
                          editProfile.username ? (
                            <i className="fi fi-rr-cross" />
                          ) : (
                            <i className="fi fi-rr-pencil" />
                          )
                        ) : (
                          ""
                        )}
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
                type={showPassword ? "text" : "password"}
                disabled={!editProfile.password}
                focused={editProfile.password}
                autoFocus={editProfile.password}
                onChange={handleInputChange}
                name="password"
                value={userLoggedIn?.password}
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
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                    {
                      borderBottom: "2px solid #f4f4f4",
                    },
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ":
                    {
                      borderBottomStyle: "solid",
                    },
                  ".css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled":
                    {
                      WebkitTextFillColor: "#f4f4f4",
                    },
                }}
                InputProps={{
                  style: {
                    color: "#F4F4F4",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        sx={{
                          pointerEvents: editProfileOpen ? "auto" : "none",
                          color: "#F4F4F4",
                          minWidth: 0,
                        }}
                      >
                        {editProfileOpen ? (
                          editProfile.password ? (
                            showPassword ? (
                              <i className="fi fi-rr-eye" />
                            ) : (
                              <i className="fi fi-rr-eye-crossed" />
                            )
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </Button>
                      <Button
                        onClick={handleTogglePassword}
                        sx={{
                          pointerEvents: editProfileOpen ? "auto" : "none",
                          color: "#F4F4F4",
                          minWidth: 0,
                        }}
                      >
                        {editProfileOpen ? (
                          editProfile.password ? (
                            <i className="fi fi-rr-cross" />
                          ) : (
                            <i className="fi fi-rr-pencil" />
                          )
                        ) : (
                          ""
                        )}
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
                disabled={!editProfile.address}
                focused={editProfile.address}
                autoFocus={editProfile.address}
                onChange={handleInputChange}
                name="address"
                value={userLoggedIn?.address}
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
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                    {
                      borderBottom: "2px solid #f4f4f4",
                    },
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ":
                    {
                      borderBottomStyle: "solid",
                    },
                  ".css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled":
                    {
                      WebkitTextFillColor: "#f4f4f4",
                    },
                }}
                InputProps={{
                  style: {
                    color: "#F4F4F4",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleToggleAddress}
                        sx={{
                          pointerEvents: editProfileOpen ? "auto" : "none",
                          color: "#F4F4F4",
                          minWidth: 0,
                        }}
                      >
                        {editProfileOpen ? (
                          editProfile.address ? (
                            <i className="fi fi-rr-cross" />
                          ) : (
                            <i className="fi fi-rr-pencil" />
                          )
                        ) : (
                          ""
                        )}
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
                disabled={!editProfile.email}
                focused={editProfile.email}
                autoFocus={editProfile.email}
                onChange={handleInputChange}
                name="email"
                value={userLoggedIn?.email}
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
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                    {
                      borderBottom: "2px solid #f4f4f4",
                    },
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ":
                    {
                      borderBottomStyle: "solid",
                    },
                  ".css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled":
                    {
                      WebkitTextFillColor: "#f4f4f4",
                    },
                }}
                InputProps={{
                  style: {
                    color: "#F4F4F4",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleToggleEmail}
                        sx={{
                          pointerEvents: editProfileOpen ? "auto" : "none",
                          color: "#F4F4F4",
                          // backgroundColor: "red",
                          minWidth: 0,
                        }}
                      >
                        {editProfileOpen ? (
                          editProfile.email ? (
                            <i className="fi fi-rr-cross" />
                          ) : (
                            <i className="fi fi-rr-pencil" />
                          )
                        ) : (
                          ""
                        )}
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
                disabled={!editProfile.phoneNumber}
                focused={editProfile.phoneNumber}
                autoFocus={editProfile.phoneNumber}
                onChange={handleInputChange}
                name="phoneNumber"
                value={userLoggedIn?.phoneNumber}
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
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                    {
                      borderBottom: "2px solid #f4f4f4",
                    },
                  ".css-r5in8e-MuiInputBase-root-MuiInput-root.Mui-disabled:before ":
                    {
                      borderBottomStyle: "solid",
                    },
                  ".css-1o3an4k-MuiInputBase-input-MuiInput-input.Mui-disabled":
                    {
                      WebkitTextFillColor: "#f4f4f4",
                    },
                }}
                InputProps={{
                  style: {
                    color: "#F4F4F4",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleTogglePhoneNumber}
                        sx={{
                          pointerEvents: editProfileOpen ? "auto" : "none",
                          color: "#F4F4F4",
                          minWidth: 0,
                        }}
                      >
                        {editProfileOpen ? (
                          editProfile.phoneNumber ? (
                            <i className="fi fi-rr-cross" />
                          ) : (
                            <i className="fi fi-rr-pencil" />
                          )
                        ) : (
                          ""
                        )}
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

export default ReaderSettings;
