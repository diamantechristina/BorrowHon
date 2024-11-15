import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { ArrowSmallLeft, EyeCrossed, Eye } from "react-flaticons";
import { useAccount } from "../library/account.js";
import { useResetPassword } from "../library/resetpassword.js";
import { useStore } from "../library/store.js";
import { set } from "mongoose";
const ContinueForgotPassword = () => {
  const navigate = useNavigate();
  const {updateAccount} = useAccount();
  const { accountReset, setAccountReset } = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [resetAccount, setResetAccount] = useState(accountReset);
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setCurrentPage, currentPage} = useStore();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setResetAccount((prev) => ({ ...prev, password: event.target.value }));

    
  };
  console.log("accountReset: ", resetAccount);
  useEffect(() => {
    if (!accountReset) {
      navigate(currentPage);

    }
  }, []);

  const handleContinueClick = async() => {
    if (password === confirmPassword && password.trim() !== "" && confirmPassword.trim() !== "") {
      const {success, message} = await updateAccount(resetAccount._id, resetAccount, false);
      console.log("Success:", success);
      console.log("Message:", message);
      navigate("/");
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

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
          variant="text"
          onClick={() => navigate(-1)}
          sx={{
            tabIndex: -1,
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
              // backgroundColor: "green",
              // margin: "-px -px -px -px",
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
          NEW PASSWORD
        </Typography>
        <Box
          component="form"
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
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
            type={showPassword ? "text" : "password"}
            // id='outlined-basic'
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            label="New Password"
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
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    // aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{
                      tabIndex: -1,
                      color: "#F4F4F4",
                      minWidth:0,
                      marginRight: "15px",
                    }}
                    >
                    {showPassword ? <Eye /> : <EyeCrossed />}
                  </Button>
                </InputAdornment>
              ),
            }}
            />
          <TextField
            required
            type={showConfirmPassword ? "text" : "password"}
            // id='outlined-basic'
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label="Confirm Password"
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
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    // aria-label="toggle confirm password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                    sx={{
                      tabIndex: -1,
                      color: "#F4F4F4",
                      minWidth:0,
                      marginRight: "15px",
                    }}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeCrossed />}
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
            tabIndex={-1}
            onClick={handleContinueClick}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContinueForgotPassword;
