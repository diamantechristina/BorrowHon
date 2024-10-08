import React from "react";
import { Box, Typography, TextField} from "@mui/material";

const AccountSettings = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2e2e2e",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "skyblue",
          width: "50vw",
          height: "70vh",
        }}
      >
        <Typography
          sx={{
            color: "green",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          ED Gwapo
        </Typography>
        <TextField label="Ed Gwapo" variant="outlined"/>
      </Box>
    </Box>
  );
};

export default AccountSettings;
