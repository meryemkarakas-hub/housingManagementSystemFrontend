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
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();


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

  const handleIdentityNumberChange = (event) => {
    let inputValue = event.target.value.trim();
    const onlyDigits = /^\d*$/;
    if (onlyDigits.test(inputValue)) {
      if (inputValue.length === 11) {
        setIdentityNumber(inputValue);
        setFormErrors({ ...formErrors, identityNumber: "" });
      } else {
        setIdentityNumber(inputValue);
        setFormErrors({
          ...formErrors,
          identityNumber: "TC Kimlik Numarası 11 haneli olmalıdır.",
        });
      }
    } else {
      setFormErrors({
        ...formErrors,
        identityNumber: "TC Kimlik Numarası alanı sadece rakam içermelidir.",
      });
    }
  };

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputValue === "" || emailRegex.test(inputValue)) {
      setEmailAddress(inputValue);
      setFormErrors({ ...formErrors, emailAddress: "" });
    } else {
      setEmailAddress(inputValue);
      setFormErrors({
        ...formErrors,
        emailAddress: "Geçerli bir e-posta adresi giriniz.",
      });
    }
  };

  const validateUserInfo = () => {
    const errors = {};

    const requiredFields = {
      identityNumber: "TC kimlik numarası",
      emailAddress: "E-posta Adresi",
    };

    const checkField = (field, fieldName) => {
      if (!field) {
        errors[fieldName] = `${requiredFields[fieldName]} alanı zorunludur.`;
      }
    };

    checkField(identityNumber, "identityNumber");
    checkField(emailAddress, "emailAddress");
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetPassword = async () => {
    if (validateUserInfo()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/reset-password",
          {
            identityNumber,
            emailAddress,
          }
        );
        const { message, status } = response.data;
        if (status === 1) {
          console.log(message);
          showSnackbar(message, 1);
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        } else {
          console.error(message);
          showSnackbar(message, 0);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        showSnackbar("Şifre sıfırlarken bir hata oluştu.", 0);
      }
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
            error={Boolean(formErrors.identityNumber)}
            helperText={formErrors.identityNumber || " "}
            id="demo-helper-text-misaligned"
            label="TC Kimlik Numarası"
            value={identityNumber}
            onChange={handleIdentityNumberChange}
            autoComplete="off"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 11,
            }}
          />
        <TextField
            required
            sx={{ m: 1, minWidth: 350 }}
            error={Boolean(formErrors.emailAddress)}
            helperText={formErrors.emailAddress || " "}
            id="demo-helper-text-misaligned"
            label="E-posta Adresi"
            value={emailAddress}
            onChange={handleEmailChange}
            autoComplete="off"
            inputProps={{
              maxLength: 50,
            }}
          />
        <Button variant="contained" sx={{ m: 1, minWidth: 350, textTransform: 'none'}} onClick={handleResetPassword}>Şifre Yenile</Button>
      </Paper>
    </Box>
    </>
  );
};

export default ResetPassword;
