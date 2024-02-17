import React, { useState } from "react";
import axios from "axios"; 
import {
  Alert,
  Box,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Button from '@mui/material/Button';

const ResetPassword = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [identityError, setIdentityError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, status) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(status === 0 ? "error" : "success");
    setSnackbarOpen(true);
  };

  const validateTCNumber = (tcNumber) => {
    const tcRegex = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
    return tcRegex.test(tcNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = () => {
    setShowErrors(true);

    if (!validateTCNumber(identityNumber)) {
      setIdentityError(true);
    } else {
      setIdentityError(false);
    }

    if (!validateEmail(emailAddress)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (validateTCNumber(identityNumber) && validateEmail(emailAddress)) {
      axios.post("http://localhost:8080/api/auth/reset-password", {
        identityNumber: identityNumber,
        emailAddress: emailAddress
      })
      
      .then(response => {
        const { message, status } = response.data;
      if (status === 1) {
        console.log(message);
        showSnackbar(message, 1);
      } else {
        console.error(message);
        showSnackbar(message, 0);
      }
        console.log(response.data); 
      })
      .catch(error => {
        console.error('İstek hatası:', error); 
      });
    }
  };

  return (
    <>
     <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": {
          m: 1,
          width: 400,
          height: 450,
          p: 2,
        },
      }}
    >
      <Paper elevation={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          Şifremi Unuttum
        </Typography>
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          helperText={showErrors && !identityNumber ? "TC kimlik numarası alanı zorunludur." : ""}
          id="identityNumber"
          label="TC Kimlik Numarası"
          value={identityNumber}
          error={identityError}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input)) {
              setIdentityNumber(input.slice(0, 11));
              setIdentityError(false);
            }
          }}
          inputProps={{ maxLength: 11 }}
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          helperText={showErrors && !emailAddress ? "E-posta Adresi alanı zorunludur." : ""}
          id="emailAddress"
          label="E-posta Adresi"
          value={emailAddress}
          error={emailError}
          onChange={(e) => {
            const input = e.target.value;
            if (input.length <= 40) {
              setEmailAddress(input);
              setEmailError(false);
            }
          }}
        />
        <Button variant="contained" sx={{ m: 1, minWidth: 350, textTransform: 'none'}} onClick={handleResetPassword}>Şifre Yenile</Button>
        {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
      </Paper>
    </Box>
    </>
  );
};

export default ResetPassword;
