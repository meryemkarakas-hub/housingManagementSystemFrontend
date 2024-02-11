import React, { useState } from "react";
import axios from "axios"; // Axios kütüphanesini ekledik
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

  const handleResetPassword = () => {
    axios.post("http://localhost:8080/api/user/reset-password", {
      identityNumber: identityNumber,
      emailAddress: emailAddress
    })
    .then(response => {
      console.log(response.data); // Yanıtı konsola yazdırabilirsiniz
      // İsteğin başarılı olduğunu kullanıcıya bildirmek için gerekli işlemleri yapabilirsiniz
    })
    .catch(error => {
      console.error('İstek hatası:', error); // Hata durumunda konsola hata mesajını yazdırabilirsiniz
      // Kullanıcıya isteğin başarısız olduğunu bildirmek için gerekli işlemleri yapabilirsiniz
    });
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
          helperText="TC kimlik numarası alanı zorunludur."
          id="identityNumber"
          label="TC Kimlik Numarası"
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          helperText="E-posta Adresi alanı zorunludur."
          id="emailAddress"
          label="E-posta Adresi"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <Button variant="contained" sx={{ m: 1, minWidth: 350, textTransform: 'none'}} onClick={handleResetPassword}>Şifre Yenile</Button>
        {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
