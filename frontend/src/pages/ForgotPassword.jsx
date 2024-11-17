import { Box, Typography, TextField, Button, Snackbar, SnackbarContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowSmallLeft } from "react-flaticons";
import { useAccount } from "../library/account";
import { useResetPassword } from "../library/resetpassword";
import {useStore} from "../library/store";
import { useSnackbar } from "../library/snackbar";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const {fetchAccount, account} = useAccount();
  const {setAccountReset, accountReset} = useResetPassword();
  const {setCurrentPage} = useStore();
  const {setOpenSnackbar, setSnackbarSuccess, setSnackbarMessage, openSnackbar, snackbarMessage, snackbarSuccess} = useSnackbar();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCheckAccount();
    }
  }
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  })
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);
  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckAccount = () => {
    if (username.trim() === "" || email.trim() === "") {
      setSnackbarMessage("Please fill in all fields!");
      setOpenSnackbar(true);
      setSnackbarSuccess(false);
      return
    }
    for (let i = 0; i < account.length; i++) {
      if (account[i].username === username.trim()) {
        if( account[i].email === email.trim()) {
          setAccountReset(account[i]);
          navigate("/resetpassword");
          return
      }
      else{
        setSnackbarMessage("Username and email do not match!");
        setOpenSnackbar(true);
        setSnackbarSuccess(false);
        return
      }
    }
  }
  if(!accountReset){
    setSnackbarMessage("Account does not exist!");
    setOpenSnackbar(true);
    setSnackbarSuccess(false);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          'linear-gradient(rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8)), url("src/resources/forgotpwbg.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
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
            backgroundColor:
              snackbarSuccess ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
      <Box
        sx={{
          width: "43vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#225560",
          // backgroundColor: "red"
        }}
      >
        <Button
          onClick={() => navigate(-1)}
          sx={{
            margin: 0,
            borderRadius: "20px",
            color: "#E8E8E8",

            // backgroundColor:"red",
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
        <img
          src="src/resources/logo.png"
          alt="BorrowHon"
          style={{
            maxWidth: "36vw",
            marginTop: "-15vh",
            marginBottom: "14vh",
          }}
        />
        <Typography
          fontFamily="Montserrat"
          fontWeight="bold"
          fontSize={"clamp(1rem, 2.3vw, 3rem)"}
          color="#F4F4F4"
        >
          FORGOT PASSWORD
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
          // backgroundColor="gray"
          height={"clamp(20rem, 30vh, 30rem)"}
        >
          <TextField
            required
            type="text"
            variant="outlined"
            label="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
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
                borderWidth: "2px", // border width
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
            value={email}
            onChange={handleEmailChange}
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
                borderWidth: "2px", // border width
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
            }}
            onClick={handleCheckAccount}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
