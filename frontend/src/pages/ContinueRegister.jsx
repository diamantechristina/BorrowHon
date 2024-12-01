import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import {useStore} from "../library/store.js"
import { Link } from "react-router-dom";
import { ArrowSmallLeft, EyeCrossed, Eye } from "react-flaticons";
import { useAccount } from "../library/account.js";
import { useSnackbar } from "../library/snackbar.js";

const ContinueRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setOpenSnackbar,
    setSnackbarSuccess,
    setSnackbarMessage,
    openSnackbar,
    snackbarMessage,
    snackbarSuccess,
  } = useSnackbar();
  
  const {setCurrentPage} = useStore();

  const newAccount = location.state;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newAccountState, setNewAccountState] = useState({
    ...newAccount,
    username: "",
    email: "",
    password: "",
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddAccount();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect (() => {
    setCurrentPage(location.pathname);
  }, []);

  const { createAccount } = useAccount();

  const handleAddAccount = async () => {
    if (newAccountState.password.trim() !== confirmPassword.trim()) {
      setOpenSnackbar(true);
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSuccess(false);
      return;
    } else {
      const { success, message } = await createAccount(newAccountState);
      setOpenSnackbar(true);
      setSnackbarMessage(message);
      setSnackbarSuccess(success);
      if (success) {
        navigate("/");
      }
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value.trim());
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccountState((prevAccount) => ({
      ...prevAccount,
      [name]: value.trim(),
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        margin: 0,
        padding: 0,
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
            backgroundColor: snackbarSuccess ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <Box
        sx={{
          backgroundColor: "#225560",
          width: "50vw",
          height: "100vh",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
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
          fontWeight="bold"
          color="#F4F4F4"
          sx={{
            fontSize: "clamp(1rem, 4vw, 3rem)",
            fontWeight: "bold",
            color: "#F4F4F4",
            fontFamily: "Montserrat",
          }}
        >
          CREATE AN ACCOUNT
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          flexDirection="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={2}
          height="clamp(25rem, 10vh, 30rem)"
        >
          <TextField
            required
            type="text"
            variant="outlined"
            label="Username"
            name="username"
            value={newAccountState.username}
            onChange={handleInputChange}
            InputLabelProps={{ required: false }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#F4F4F4",
                paddingLeft: "6px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F4F4F4",
              },
              "& .MuiOutlinedInput-root": {
                width: "clamp(10rem, 29vw, 40rem)",
                height: "52px",
                paddingLeft: "6px",
                paddingRight: "6px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F4F4F4", // border color
                borderRadius: "20px", // border radius
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // focus border color
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // hover border color
                },
            }}
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
            }}
          />
          <TextField
            required
            type="email"
            variant="outlined"
            label="Email"
            name="email"
            value={newAccountState.email}
            onChange={handleInputChange}
            InputLabelProps={{ required: false }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#F4F4F4", // label color
                paddingLeft: "6px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F4F4F4",
              },
              "& .MuiOutlinedInput-root": {
                width: "clamp(10rem, 29vw, 40rem)",
                height: "52px",
                paddingLeft: "6px",
                paddingRight: "6px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F4F4F4", // border color
                borderRadius: "20px", // border radius
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // focus border color
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // hover border color
                },
            }}
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
            }}
          />
          <TextField
            required
            type={showPassword ? "text" : "password"}
            variant="outlined"
            label="Password"
            name="password"
            value={newAccountState.password}
            onChange={handleInputChange}
            InputLabelProps={{ required: false }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#F4F4F4",
                paddingLeft: "6px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F4F4F4",
              },
              "& .MuiOutlinedInput-root": {
                width: "clamp(10rem, 29vw, 40rem)",
                height: "52px",
                paddingLeft: "6px",
                paddingRight: "6px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F4F4F4", // border color
                borderRadius: "20px", // border radius
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // focus border color
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // hover border color
                },
            }}
            InputProps={{
              style: {
                color: "#F4F4F4",
              },

              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={togglePasswordVisibility}
                    sx={{
                      color: "#F4F4F4",
                      marginRight: "15px",
                      minWidth: 0,
                    }}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <Eye size={17} />
                    ) : (
                      <EyeCrossed size={17} />
                    )}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            InputLabelProps={{ required: false }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#F4F4F4", // label color
                paddingLeft: "6px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F4F4F4",
              },
              "& .MuiOutlinedInput-root": {
                width: "clamp(10rem, 29vw, 40rem)",
                height: "52px",
                paddingLeft: "6px",
                paddingRight: "6px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F4F4F4", // border color
                borderRadius: "20px", // border radius
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // focus border color
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F4F4F4", // hover border color
                },
            }}
            InputProps={{
              style: {
                color: "#F4F4F4",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={toggleConfirmPasswordVisibility}
                    sx={{
                      color: "#F4F4F4",
                      marginRight: "15px",
                      minWidth: 0,
                    }}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <Eye size={17} />
                    ) : (
                      <EyeCrossed size={17} />
                    )}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{
              width: "clamp(10rem, 29vw, 40rem)",
              height: "52px",
              borderRadius: "20px",
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
            }}
            onClick={handleAddAccount}
          >
            Continue
          </Button>
        </Box>

        <Box
          sx={{
            height: "1px",
            width: "clamp(10rem, 22vw, 40rem)",
            backgroundColor: "#F4F4F4",
          }}
          marginTop={-1}
        />
        <Typography
          marginTop={4}
          sx={{
            fontSize: "13px",
            fontWeight: "thin",
            color: "#F4F4F4",
            fontFamily: "Inria Serif",
            fontStyle: "italic",
          }}
        >
          Already have an account?&nbsp;
          <Link
            to={"/"}
            style={{
              color: "#F4F4F4",
            }}
          >
            Sign in Here
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundImage: "url('src/resources/loginbg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src="src/resources/loginlogosymbol.png"
          alt="symbol"
          style={{
            maxWidth: "36vw",
            maxHeight: "36vh",
            filter: "drop-shadow(5px 8px 1.2px rgba(0, 0, 0, 0.65))",
          }}
        />
        <img
          src="src/resources/logotext.png"
          alt="BorrowHon"
          style={{
            maxWidth: "36vw",
            maxHeight: "36vh",
            marginTop: "2vh",
            filter: "drop-shadow(5px 8px 1.2px rgba(0, 0, 0, 0.65))",
          }}
        />
      </Box>
    </Box>
  );
};

export default ContinueRegister;
