import {
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Button,
  Stack,
  Typography,
  Slide,
  Fade,
} from "@mui/material";
import React, { useState } from "react";
import { Search, Filter, Bell, MenuBurger } from "react-flaticons";
import "@fontsource/arimo";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const handleMenuItemClick = (event) => {
    setSelectedFilter(event.target.textContent);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFilterText = () => {
    switch (selectedFilter) {
      case "Title":
        return "Search Title";
      case "Author":
        return "Search Author";
      case "ISBN":
        return "Search ISBN";
      case "Genre":
        return "Search Genre";
      default:
        return "Search";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        height: "90px",
        width: "100%",
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px",
        zIndex: "100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "26px",
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
        <TextField
          required
          type="text"
          // id='outlined-basic'
          variant="outlined"
          placeholder={getFilterText()}
          InputLabelProps={{ required: false }}
          sx={{
            "& .MuiOutlinedInput-root": {
              width: "clamp(20vw, 42.2vw, 42.2vw)",
              // width: "42.2vw",
              height: "55px",
              // height: "clamp(7.5vh, 7.5vh, 7.5vh)",
              paddingLeft: "6px",
              paddingRight: "6px",
              backgroundColor: "#F4F4F4",
              borderRadius: "18px",
              fontSize: "24px",
              // marginLeft: "20px",
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
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F4F4F4", // hover border color
            },
            "& .MuiOutlinedInput-input.MuiInputBase-input::placeholder": {
              color: "#191919",
              // backgroundColor: "red",
              opacity: 1,
              fontSize: "24px",
              position: "absolute",
              top: 20.5,
              fontFamily: "Arimo",
            },
            marginTop: "20px",
            "& .MuiOutlinedInput-input.MuiInputBase-input": {
              marginLeft: "8px",
            },
          }}
          InputProps={{
            style: {
              color: "#F4F4F4",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    marginTop="10px"
                    marginLeft="13px"
                    // backgroundColor="red"
                  >
                    <Search
                      size="28px"
                      style={{
                        color: "#191919",
                        paddingBottom: 0,
                      }}
                    />
                  </Box>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      width: "1px",
                      height: "43px",
                      backgroundColor: "#191919",
                      opacity: 0.8,
                      marginRight: "5px",
                    }}
                  />
                  <Button
                    id="filter-btn"
                    aria-controls={open ? "filter-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                      opacity: 0.75,

                      gap: "6.5px",
                      marginTop: "2px",
                      marginRight: "14px",

                      // paddingTop: "30px",
                      // backgroundColor: "red",
                      // minWidth: 0
                    }}
                  >
                    <Filter
                      size={"28px"}
                      style={{
                        color: "#191919",
                        // paddingLeft: "3px",
                      }}
                    />
                    <Typography
                      sx={{
                        textTransform: "none",
                        color: "#191919",
                        fontFamily: "Arimo",
                        fontSize: "24px",
                        letterSpacing: "0.01px",
                        marginTop: "3px",
                      }}
                    >
                      Filter
                    </Typography>
                  </Button>
                  <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    TransitionComponent={Fade}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "filter-btn",
                    }}
                    PaperProps={{
                      style: {
                        width: "123px",
                      }
                    }}
                  >
                    <MenuItem id="title" onClick={handleMenuItemClick}>
                      Title
                    </MenuItem>
                    <MenuItem id="author" onClick={handleMenuItemClick}>
                      Author
                    </MenuItem>
                    <MenuItem id="genre" onClick={handleMenuItemClick}>
                      Genre
                    </MenuItem>
                    <MenuItem id="isbn" onClick={handleMenuItemClick}>
                      ISBN
                    </MenuItem>
                  </Menu>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
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
          <MenuBurger
            size={40}
            style={{
              // backgroundColor: "green",
              marginLeft: "-10px",
              marginRight: "-10px",
            }}
            
          />
        </Button>
      </Stack>
    </Box>
  );
};
export default Navbar;
