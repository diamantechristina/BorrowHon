import { Typography, Snackbar, SnackbarContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/arsenal";
import "@fontsource/inria-serif";
import { ArrowSmallLeft } from "react-flaticons";
import { useSnackbar } from "../library/snackbar.js";
const Register = () => {
  const navigate = useNavigate();
  const {
    setOpenSnackbar,
    setSnackbarSuccess,
    setSnackbarMessage,
    openSnackbar,
    snackbarMessage,
    snackbarSuccess,
  } = useSnackbar();

  const [newAccount, setNewAccount] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  function allLetters(str) {
    return /^[a-zA-Z\s]+$/.test(str);
  }

  function allNumbers(str) {
    return /^\d+$/.test(str);
  }

  const handleRegister = () => {
    if (
      !newAccount.firstName ||
      !newAccount.lastName ||
      !newAccount.address ||
      !newAccount.phoneNumber
    ) {
      setOpenSnackbar(true);
      setSnackbarSuccess(false);
      setSnackbarMessage("Please fill in all fields.");
      return;
    }
    if (
      !allLetters(newAccount.firstName) ||
      !allLetters(newAccount.lastName) ||
      !allNumbers(newAccount.phoneNumber)
    ) {
      setOpenSnackbar(true);
      setSnackbarSuccess(false);
      setSnackbarMessage("Invalid Inputs.");
      return;
    }
    navigate("/continue-register", { state: newAccount });
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
            // id='outlined-basic'
            variant="outlined"
            label="Firstname"
            name="firstName"
            value={newAccount.firstName}
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
            type="text"
            variant="outlined"
            label="Lastname"
            name="lastName"
            value={newAccount.lastName}
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
            type="text"
            variant="outlined"
            label="Address"
            name="address"
            value={newAccount.address}
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
            type="text"
            variant="outlined"
            label="Phone Number"
            name="phoneNumber"
            value={newAccount.phoneNumber}
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
            onClick={handleRegister}
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
            to={"/login"}
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

export default Register;
