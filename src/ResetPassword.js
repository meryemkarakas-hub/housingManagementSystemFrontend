import React from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from '@mui/material/Button';

const ResetPassword = () => {
  
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
          id="demo-helper-text-misaligned"
          label="TC Kimlik Numarası"
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          helperText="E-posta Adresi alanı zorunludur."
          id="demo-helper-text-misaligned"
          label="E-posta Adresi"
        />
      <Button variant="contained" sx={{ m: 1, minWidth: 350, textTransform: 'none'}}>Şifre Yenile</Button>
        {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
