import {
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Button,
  List,
  ListItem,
  Stack,
  Typography,
  Slide,
  Fade,
  Collapse,
  ClickAwayListener
} from "@mui/material";
import "@flaticon/flaticon-uicons/css/all/all.css";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, Bell, MenuBurger, Circle } from "react-flaticons";
import { useNavigate } from "react-router-dom";
import "@fontsource/arimo";
import { useLog } from "../library/log";
import { useStore } from "../library/store";
import { useSearch } from "../library/search";
import {useBook} from "../library/book";
import { useNotification } from "../library/notification";
import "@fontsource/montserrat/700.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLog, currentUser, isAdmin, setNull, setBookData } = useStore();
  const { fetchNotifications, notification, updateNotification } = useNotification();
  const { searchedBook, setSearchedBook, filterType, setFilterType } = useSearch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [isBookSearch, setIsBookSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { updateLog } = useLog();
  const [searchOpen,setSearchOpen] = useState(false);
  const [isTextFieldFocus, setIsTextFieldFocus] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { fetchBook, books } = useBook();
  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);


  const handleLogout = async () => {
    const updatedLog = {
      ...userLog,
      logoutdate: new Date(),
    };
    const { success, message } = await updateLog(updatedLog._id, updatedLog);
    console.log(success, message);
    navigate("/");
    setNull();
  };

  const handleMenuItemClick = (event) => {
    setSelectedFilter(event.target.textContent);
    setFilterType(event.target.textContent.toLowerCase());
    handleClose();
  };

  const handleClick = () => {
    setFilterOpen(!filterOpen)
  };
  const handleClose = () => {
    setFilterOpen(false);
    setBurgerOpen(false);
  };
  const handleNotificationClick = () => {
    notification.map(async (notification) => await updateNotification(notification._id, {...notification,status:"read"}))

    setNotificationOpen(!notificationOpen);

  }
  const handleBurgerClick = () => {
    setBurgerOpen(!burgerOpen);
  }
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


  const [burgerOpen, setBurgerOpen] = useState(false);
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        zIndex: "100",
        top: 0,
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease", // Smooth transition when applying blur
        ...(scrolled && {
          backdropFilter: "blur(10px)", // Apply blur when scrolled
          WebkitBackdropFilter: "blur(10px)", // Safari support
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly transparent background
        }),
      }}
    >
      <Box
        sx={{
          height: "90px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.65vw",
          }}
        >
          <img
            src="src/resources/logo.png"
            alt="BorrowHon"
            style={{
              width: "9.8vw",
              marginTop: "20px",
              marginLeft: "2.32vw",
            }}
          />
          <TextField
            required
            type="text"
            // id='outlined-basic'
            variant="outlined"
            value={searchedBook}
            onClick={() => setSearchOpen(true)}
            onFocus={() => setIsTextFieldFocus(true)}
            onBlur={() => setIsTextFieldFocus(false)}
            onChange={(event) => setSearchedBook(event.target.value)}
            placeholder={getFilterText()}
            InputLabelProps={{ required: false }}
            sx={{
              display: isAdmin ? "none" : "auto",
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
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
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
                      aria-controls={filterOpen ? "filter-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={filterOpen ? "true" : undefined}
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
                    <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                    <ClickAwayListener onClickAway={() => setFilterOpen(false)}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: "8.5vw",
                        bgcolor: "#d9d9d9",
                        position: "absolute",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                          display: "none", // Hide scrollbars for WebKit browsers
                        },
                        top: "5.15vh",
                        left: "33.74vw",
                        zIndex: -1,
                        maxHeight: "36.6vh",
                        paddingTop: "2.5vh",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                        filter:
                          "drop-shadow(0.15rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5))",
                      }}
                    >
                      {['Title', 'Author', 'Genre', 'ISBN'].map((text,index) => (
                        <ListItem
                          key={index}
                          onClick={handleMenuItemClick}
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#E8E8E8",
                            },
                            color: "#191919"
                          }}
                        >{text}</ListItem>
                      ))}
                    </List>
                    </ClickAwayListener>
                    </Collapse>
                    {/* <Menu
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
                          width: "8.55vw",
                          marginLeft: "-0.5vw",
                          marginTop: "-1vw",
                          zIndex: -1000,
                          paddingTop: "2vh",
                          backgroundColor: "#D9D9D9",
                        },
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
                    </Menu> */}
                  </InputAdornment>
                ),
              },
            }}
          />
          <Collapse in={(searchOpen && searchedBook && isTextFieldFocus) || isBookSearch } timeout="auto" unmountOnExit={false}>
      <List
        sx={{
          width: '100%',
          maxWidth: '33.73vw',
          bgcolor: '#d9d9d9',
          position: 'fixed',
          overflow: 'auto',
          "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars for WebKit browsers
        },
          top: '9vh',
          left: '13.75vw',
          zIndex: -2,
          maxHeight: "36.6vh",
          paddingTop: '2.5vh',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          filter: "drop-shadow(0.15rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5))"
        }}
      >
        {books.filter((book) => {
        
        if (filterType === 'title'){
          return book.title.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'author'){
          return book.author.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'isbn'){
          return book.isbn.includes(searchedBook)
        }else if (filterType === 'genre'){
          return book.genre[0].toLowerCase().includes(searchedBook?.toLowerCase())
        }
        else{
          return false;
        }
        
      }).length === 0 ?(
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#191919",
              }}
            >
              No Results Found
            </Typography>
          </Box>
        ) : null}
      {books.filter((book) => {
        if (searchedBook === '') {
          return false;
        }
        if (filterType === 'title'){
          return book.title.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'author'){
          return book.author.toLowerCase().includes(searchedBook?.toLowerCase())
        }else if (filterType === 'isbn'){
          return book.isbn.includes(searchedBook)
        }else if (filterType === 'genre'){
          return book.genre[0].toLowerCase().includes(searchedBook?.toLowerCase())
        }
        
      })
      .map((book) => (
        <ListItem
          onMouseOver={() => setIsBookSearch(true)}
          onMouseLeave={() => setIsBookSearch(false)}
          sx={{
            "&:hover": {
                backgroundColor: "#E8E8E8",
              },
          }}
          key={book._id}
          onClick={() => {
            setBookData(book);
            navigate("/view-book");
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
              height: "10vh",
              
            }}
          >
            <Box
              sx={{
                width: "10%",
                height: "10vh",
                objectFit: "contain",
                background: `url(${book.coverImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Box
              sx={{
                margin: "0",
              }}
            >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                marginLeft: "1vw",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#191919",
              }}
            >
              {book.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                marginLeft: "1vw",
                fontSize: "0.9rem",
                color: "#191919",
              }}
            >
              {book.author}
            </Typography>
            </Box>

          </Box>
        </ListItem>
      ))}
      </List>
          </Collapse>
        </Box>
        <Collapse in={burgerOpen} timeout="auto" unmountOnExit>
          <ClickAwayListener onClickAway={() => setBurgerOpen(false)}>
          <List
          sx={{
            width: '100%',
            maxWidth: '12vw',

            bgcolor: '#d9d9d9',
            position: 'absolute',
            overflow: 'auto',
            "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbars for WebKit browsers
          },
            top: '10.88vh',
            left: '80.2vw',
            zIndex: -2,
            maxHeight: "36.6vh",
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            borderTopLeftRadius: '20px',
            filter: "drop-shadow(0.15rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5))"
          }}
          >
            <ListItem 
              sx={{
                cursor: "pointer",
                height: "6.5vh",
                fontFamily: "Inria Serif",
                "&:hover": {
                  backgroundColor: "#E8E8E8", 
                }}}
                onClick={() => navigate("/settings")}
                >
              Account Settings
            </ListItem>
            {isAdmin ? null : (
              <ListItem
              sx={{
                cursor: "pointer",
                height: "6.5vh",
                fontFamily: "Inria Serif",
                "&:hover": {
                  backgroundColor: "#E8E8E8", 
                }}}
                onClick={() => {
                  navigate("/borrow-history");
                }}
                >
                History
              </ListItem>
            )}
            <ListItem 
            sx={{
              cursor: "pointer",
              height: "6.5vh",
              fontFamily: "Inria Serif",
              "&:hover": {
                backgroundColor: "#E8E8E8", 
              }}}
              onClick={handleLogout}
              >
              Log Out
            </ListItem>
          </List>
          </ClickAwayListener>
          </Collapse>
          <Collapse in={notificationOpen} timeout="auto" unmountOnExit>
          <ClickAwayListener onClickAway={() => setNotificationOpen(false)}>
          <List
          sx={{
            width: '100%',
            maxWidth: '20vw',
            bgcolor: '#d9d9d9',
            position: 'absolute',
            overflow: 'auto',
            "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbars for WebKit browsers
          },
            top: '10.88vh',
            left: '73.5vw',
            zIndex: -2,
            maxHeight: "45vh",
            height: "45vh",
            borderRadius: '20px',
            filter: "drop-shadow(0.15rem 0.15rem 0.2rem rgba(0, 0, 0, 0.5))"
          }}
          >
            {notification?.filter((item)=> item.acc_id === currentUser.acc_id).length === 0 ? 
            (<ListItem 
              sx={{
                  height: "45vh", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center"}}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "1.5rem",
                    color: "#191919",
                  }}
                >
                No Notification
                </Typography>
            </ListItem> )
            :
            (notification?.filter((item)=> item.acc_id === currentUser.acc_id).map((item)=>(
              <ListItem
              key={item._id}
                sx={{
                  "&:hover": {
                backgroundColor: "#E8E8E8", 

              },
              borderBottom: "1px solid #2e2e2e"
                }}
              
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",   
                    height: "10vh",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: "#191919",
                    }}
                  >
                    {item.title.toUpperCase()}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      height: "6vh",
                      width: "100%",
                    }}
                  >
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      color: "#191919",
                    }}
                  >
                    {item.message}
                  </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "0.5rem",
                        fontWeight: "500",
                        color: "#191919",
                      }}
                    >
                      {new Date(item.date).toLocaleString("default", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))
            )}
          </List>
          </ClickAwayListener>
          </Collapse>
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
          
            onClick={handleNotificationClick}
            sx={{
              backgroundColor:
                notificationOpen ? "#D9D9D9" : "transparent",
              color: notificationOpen ? "#191919" : "#F4F4F4",
              borderRadius: "15px",
              borderBottomLeftRadius: notificationOpen ? "0px" : "15px",
              borderBottomRightRadius: notificationOpen ? "0px" : "15px",
              "&:hover": {
                backgroundColor: "#D9D9D9",
                color: "#191919",
              },
            }}
          >
              {notification?.filter((item)=> item.status === "unread").length > 0 ?
              <i
              className="fi fi-ss-circle"
              style={{
                color: "#FF4444",
                fontSize: ".75vw",
                position: "absolute",
                top: ".3vh",
                right: "1.1vw",
              }}
            />
            :""  
            }
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
            onClick={handleBurgerClick}
            sx={{
              backgroundColor:
                burgerOpen ? "#D9D9D9" : "transparent",
              color: burgerOpen ? "#191919" : "#F4F4F4",
              borderRadius: "15px",
              borderBottomLeftRadius: burgerOpen ? "0px" : "15px",
              borderBottomRightRadius: burgerOpen ? "0px" : "15px",
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
    </Box>
  );
};
export default Navbar;
