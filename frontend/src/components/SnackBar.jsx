import React, {useState, useEffect} from 'react'
import { Snackbar } from '@mui/material';

const SnackBar = ({open, updateOpen, successfulLogin}) => {
    const [autoHide, setAutoHide] = useState(false)

    useEffect(() => {
        if (open) {
          const timeoutId = setTimeout(() => {
            setAutoHide(true);
          }, 2000); // adjust the duration as needed
          return () => clearTimeout(timeoutId);
        }
      }, [open]);
    
      useEffect(() => {
        if (autoHide) {
          updateOpen(false);
          setAutoHide(false);
        }
      }, [autoHide, updateOpen]);

  return (
    <Snackbar
        
        open={open}
        autoHideDuration={null}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            updateOpen(false);
          }
        }}
        message={successfulLogin ?"Login successful" : "Login Failed"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
  )
}

export default SnackBar