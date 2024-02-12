import React, { useState } from "react";
import axios from "axios"; 
import {
  Box,
  Paper,
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

  const handleResetPassword = () => {
    setShowErrors(true);

    if (!identityNumber) {
      setIdentityError(true);
    } else {
      setIdentityError(false);
    }
    if (!emailAddress) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (identityNumber && emailAddress) {
      axios.post("http://localhost:8080/api/user/reset-password", {
        identityNumber: identityNumber,
        emailAddress: emailAddress
      })
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error('İstek hatası:', error); 
      });
    }
  };

  return (
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
            setIdentityNumber(e.target.value);
            setIdentityError(false);
          }}
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
            setEmailAddress(e.target.value);
            setEmailError(false);
          }}
        />
        <Button variant="contained" sx={{ m: 1, minWidth: 350, textTransform: 'none'}} onClick={handleResetPassword}>Şifre Yenile</Button>
        {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
