import { Box } from '@mui/material'
import React from 'react'

const BookCard = ({book}) => {
  return (
    <Box
        sx={{
            width: "22.5vw",
            height: "67.5vh",
            background: book.coverImage !== undefined ? `url(${book.coverImage})` : "#2e2e2e",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
        }}
    >
      
    </Box>
  )
}

export default BookCard