import React from "react";
import { Box, Typography, Button, Stack, Menu, MenuItem  } from "@mui/material";
import { Bell, MenuBurger } from "react-flaticons";

const Dashboard = () => {
    const [burgerAnchorEl, setBurgerAnchorEl] = React.useState(null);
  const burgerOpen = Boolean(burgerAnchorEl);

  const handleBurgerClick = (event) => {
    setBurgerAnchorEl(event.currentTarget);
  };

//   const handleBurgerClose = () => {
//     setBurgerAnchorEl(null);
//   };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(src/resources/librariandashboard.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(20%)",
          zIndex: -1, // To keep the background behind all the other content
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
        //   justifyContent: "center",
          alignItems: "center",
          height: "100px",
          backgroundColor: "blue",
          justifyContent: "space-between",
        }}
      >
        <img
          src="src/resources/logo.png"
          alt="BorrowHon"
          style={{
            width: "9.8vw",
            marginTop: "20px",
            marginLeft: "35px",
          }}
        />
        <Stack
          direction="row"
          spacing={4}
          sx={{
            marginRight: "120px",
            marginTop: "20px",
            // backgroundColor: "red",
          }}
        >
          <Button
            sx={{
              // backgroundColor: "red",
              color: "#F4F4F4",
              // width:"60px",
              // height:"50px",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#D9D9D9",
                color: "#191919",
              },
            }}
          >
            <Bell
              size={40}
              style={{
                // backgroundColor: "green",
                marginLeft: "-10px",
                marginRight: "-10px",
                // paddingLeft : "-10px"
                // marginTop:"-5px",
              }}
            />
          </Button>
          <Button
            id="burger-btn"
            aria-controls={burgerOpen ? "burger-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={burgerOpen ? "true" : undefined}
            onClick={handleBurgerClick}

            sx={{
              backgroundColor: burgerAnchorEl===null ? "transparent" : "#D9D9D9",
              color: burgerAnchorEl===null ? "#F4F4F4" : "#191919",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#D9D9D9",
                color: "#191919",
              },
            }}
          >
            <MenuBurger
              size={40}
              style={{
                // backgroundColor: "green",
                marginLeft: "-10px",
                marginRight: "-10px",
              }}
            />
          </Button>
          <Menu
            id="burger-menu"
            anchorEl={burgerAnchorEl}
            open={burgerOpen}
            onClose={() => setBurgerAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "burger-btn",
            }}
            PaperProps={{
              style: {
                width: "155px",
                backgroundColor: "#D9D9D9",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => setBurgerAnchorEl(null)}>
              Account Settings
            </MenuItem>
            {/* <MenuItem onClick={() => navigate("/borrow-history", { state: { userLoggedIn: userLoggedIn }})}>History</MenuItem> */}
            <MenuItem onClick={() => setBurgerAnchorEl(null)}>Log Out</MenuItem>
          </Menu>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
