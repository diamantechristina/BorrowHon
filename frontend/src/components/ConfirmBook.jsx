import React from 'react'
import { useState } from "react";
import { Box, Typography, Button, Modal, Backdrop } from "@mui/material";
import { useBook } from "../library/book.js";
import { useSnackbar } from '../library/snackbar.js';

const ConfirmBook = ({pageTitle, confirmOpen, setOpen, setConfirmOpen, handleHover, newBook}) => {
    const { createBook, deleteBook,updateBook } = useBook();
    const {setOpenSnackbar, setSnackbarSuccess, setSnackbarMessage} = useSnackbar();
    const handleAddBook = async () => {
        const { success, message } = await createBook(newBook);
        console.log("Success:", success);
        console.log("Message:", message);
        setConfirmOpen(false)
        setOpenSnackbar(true)
        setSnackbarSuccess(success)
        setSnackbarMessage(message)
        setOpen !== null ? setOpen(false) : () => {}
        
    };
    const handleDeleteBook = async () => {
        const { success, message } = await deleteBook(newBook._id);
        console.log("Success:", success);
        console.log("Message:", message);
        setConfirmOpen(false)
        setOpenSnackbar(true)
        setSnackbarSuccess(success)
        setSnackbarMessage(message)
        setOpen !== null ? setOpen(false) : () => {}
    }
    
    const handleUpdateBook = async () => {
        const { success, message } = await updateBook(newBook._id,newBook);
        console.log("Success:", success);
        console.log("Message:", message);
        setConfirmOpen(false)
        setOpenSnackbar(true)
        setSnackbarSuccess(success)
        setSnackbarMessage(message)
        setOpen !== null ? setOpen(false) : () => {}
    }

    const handleConfirmClose = () => {
        setConfirmOpen(false)
        handleHover(false)
    };
    return (
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={confirmOpen}
            onClose={handleConfirmClose}
            // slots={{ backdrop: StyledBackdrop }}
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
                    width: "60vw",
                    height: "80vh",
                    bgcolor: "#225560",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#F4F4F4",
                    flexDirection: "column",
                    // marginTop:
                    gap: "20px",
                    // overflow: "auto",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "4vw",
                        fontWeight: "bold",
                        fontFamily: "montserrat",
                        //   marginTop: "-5vh",
                    }}
                >
                    {pageTitle.toUpperCase()}
                </Typography>
                <Box
                    sx={{
                        width: "60vw",
                        height: "55vh",
                        // backgroundColor: "yellow",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        // overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            width: "30vw",
                            height: "inherit",
                            // backgroundColor: "blue",
                        }}
                    >
                        <Box
                            sx={{
                                //   width: "25vw",
                                height: "55vh",

                                backgroundImage: `url(${newBook.coverImage})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                mx: "1.5vw",
                            }}
                        ></Box>
                    </Box>
                    <Box
                        sx={{
                            width: "50vw",
                            height: "inherit",
                            // backgroundColor: "red",
                            color: "#F4F4F4",
                            marginRight: "2vw",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "2.5vw",
                                fontWeight: "bold",
                                fontFamily: "montserrat",
                                textTransform: "uppercase",
                            }}
                        >
                            {newBook.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                // fontWeight: "bold",
                                fontFamily: "montserrat",
                            }}
                        >
                            {newBook.genre}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.5vw",
                                fontWeight: "bold",
                                fontFamily: "montserrat",
                            }}
                        >
                            {newBook.author}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontFamily: "montserrat",
                                my: "2vh",
                            }}
                        >
                            ISBN: {newBook.isbn}
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "#F4F4F4",
                                my: "2vh",
                            }}
                        ></Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                fontFamily: "montserrat",
                            }}
                        >
                            {newBook.description}
                        </Typography>
                    </Box>
                </Box>
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
                    onClick={pageTitle === "Confirm Add Book" ? handleAddBook : (pageTitle === "Confirm Delete Book") ? handleDeleteBook : handleUpdateBook}
                >
                    Confirm
                </Button>
            </Box>
        </Modal>
    )
}

export default ConfirmBook