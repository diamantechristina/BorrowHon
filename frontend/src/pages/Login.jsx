import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState, } from "react";
import { Box } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/arsenal";
import "@fontsource/inria-serif";
import "@fontsource/montserrat";
import { EyeCrossed, Eye } from "react-flaticons";
import { InputAdornment } from "@mui/material";
import { useAccount } from "../library/account.js";
import { useLog } from "../library/log.js";
import { useStore } from "../library/store.js";
import { useSnackbar } from "../library/snackbar.js";

const Login = () => {
  const {setOpenSnackbar, setSnackbarSuccess, setSnackbarMessage, openSnackbar, snackbarMessage, snackbarSuccess} = useSnackbar();

  const navigate = useNavigate();
  const { setCurrentUser, setLog, setIsAdmin, currentUser } = useStore();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLoginClick();
    }
  }
  useEffect(()=> {
    setIsAdmin(false)
  },[])
  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin);
      navigate("/dashboard");
    }
  }, [currentUser]);
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  })

  const { fetchAccount, account } = useAccount();

  const { fetchLogs, createLog, logs } = useLog();

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchLogs();
  },[fetchLogs])
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleLoginClick = async () => {
    if (login.username.trim() === "" || login.password.trim() === "") {
      setOpenSnackbar(true);
      setSnackbarMessage("Please fill in all fields!");
      setSnackbarSuccess(false);
      return;
    }
    if(account.filter((acc) => acc.username.toLowerCase() === login.username.trim().toLowerCase()).length === 0){
      setOpenSnackbar(true);
      setSnackbarMessage("Incorrect username and password!");
      setSnackbarSuccess(false);
      return
    }  
    for (const acc of account) {
      if (acc.username.toLowerCase() === login.username.trim().toLowerCase()){

      if ( acc.password === login.password) {
        const newLog = {
          acc_id: acc.acc_id,
          logindate: new Date()
        }
        const {log} = await createLog(newLog);
        // console.log("log Login: ", log);

        // const userLog = logs.find((log) => log.acc_id === acc.acc_id && log.logindate === new Date());
        
        // console.log("userLog Login: ", logs.find((log) => log.acc_id === acc.acc_id && log.logindate === new Date()));
        setCurrentUser(acc);
        setLog(log);
        setIsAdmin(acc.isAdmin)
        setOpenSnackbar(true);
        navigate("/dashboard");
        
        return;
      }
      else{
        setOpenSnackbar(true);
        setSnackbarMessage("Incorrect password!");
        setSnackbarSuccess(false);
        return;
      }
    }
    
      // else if (login.username.toLowerCase() === "admin" && login.password === "admin"){
      //   navigate("/dashboard")
      // }
    }
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: currentUser ? "none" : "flex",
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
            backgroundColor:
              snackbarSuccess ? "green" : "red",
            justifyContent: "center",
          }}
        />
      </Snackbar>
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
        <Typography
          fontWeight="bold"
          color="#F4F4F4"
          sx={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "#F4F4F4",
            fontFamily: "Montserrat",
          }}
        >
          Login
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
          // backgroundColor="blue"
          height="clamp(15rem, 10vh, 30rem)"
        >
          <TextField
            required
            type="text"
            // id='outlined-basic'
            variant="outlined"
            label="Username"
            name="username"
            value={login.username}
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
                width: "clamp(10rem, 23vw, 40rem)",
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
            type={showPassword ? "text" : "password"}
            // id='outlined-basic'
            variant="outlined"
            label="Password"
            name="password"
            value={login.password}
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
                width: "clamp(10rem, 23vw, 40rem)",
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
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    sx={{
                      color: "#F4F4F4",
                      // backgroundColor: "red",
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
          <Button
            // ref= {loginButtonRef}
            variant="contained"
            onClick={handleLoginClick}
            sx={{
              width: "clamp(10rem, 23vw, 40rem)",
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
          >
            Login
          </Button>
        </Box>
        <Link
          to={"/forgot-password"}
          style={{
            color: "#F4F4F4",
            fontSize: "13px",
            fontWeight: "thin",
            fontFamily: "Arsenal",
            textDecoration: "underline",
          }}
        >
          Forgot password?
        </Link>

        <Box
          sx={{
            height: "1px",
            width: "clamp(10rem, 22vw, 40rem)",
            backgroundColor: "#F4F4F4",
          }}
          marginTop={3}
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
          Don't have an account yet?&nbsp;
          <Link
            to={"/register"}
            style={{
              color: "#F4F4F4",
            }}
          >
            Sign up Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
