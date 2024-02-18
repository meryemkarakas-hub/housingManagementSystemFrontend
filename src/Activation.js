import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Activation = () => {
  const [formData, setFormData] = useState({
    identityNumber: "",
    password: "",
    rePassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [identityError, setIdentityError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repasswordError, setRepasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowRepassword = () => setShowRepassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownRepassword = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: newPassword.slice(0, 16),
    }));
    setPasswordError(false);
  };

  const handleRepasswordChange = (e) => {
    const newRepassword = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rePassword: newRepassword.slice(0, 16),
    }));
    setRepasswordError(false);
  };

  const handleIdentityNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        identityNumber: value,
      }));
      setIdentityError(false);
    }
  };
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

  const handleSubmit = (event) => {
    const { identityNumber, password, rePassword } = formData;
    if (!identityNumber && !password && !rePassword) {
      setIdentityError(true);
      setPasswordError(true);
      setRepasswordError(true);
      return;
    } else if (!identityNumber) {
      setIdentityError(true);
      return;
    } else if (!password) {
      setPasswordError(true);
      return;
    } else if (!rePassword) {
      setRepasswordError(true);
      return;
    } else if (identityNumber.length !== 11) {
      setIdentityError(true);
      showSnackbar("TC kimlik numaranız 11 haneden oluşmalıdır.", 0);
      return;
    }
    setIdentityError(false);
    setPasswordError(false);
    setRepasswordError(false);
    event.preventDefault();
    const apiUrl = "http://localhost:8080/api/auth/activation";
    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);
        const { message, status } = response.data;
        if (status === 1) {
          console.log(message);
          showSnackbar(message, 1);
        } else {
          console.error(message);
          showSnackbar(message, 0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showSnackbar("Aktivasyon işlemi yapılırken bir hata oluştu.", 0);
      });
  };
  useEffect(() => {
    const activationCode = window.location.pathname.split("/").pop();
    setFormData((prevFormData) => ({
      ...prevFormData,
      activationCode,
    }));
  }, []);
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
            height: 550,
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
            Aktivasyon İşlemi
          </Typography>
          <TextField
            required
            sx={{ m: 1, minWidth: 350 }}
            helperText={
              identityError ? "TC kimlik numarası alanı zorunludur." : ""
            }
            error={identityError}
            id="demo-helper-text-misaligned"
            label="TC Kimlik Numarası"
            value={formData.identityNumber}
            onChange={handleIdentityNumberChange}
            autoComplete="off"
          />
          <FormControl sx={{ m: 1, minWidth: 350 }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              style={{ color: passwordError ? "#dc143c" : "#616161" }}
            >
              Şifre *
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Şifre"
              value={formData.password}
              onChange={handlePasswordChange}
              error={passwordError}
              inputProps={{
                style: { color: "gray" },
                maxLength: 16,
              }}
              autoComplete="off"
            />
            <FormHelperText error={passwordError}>
              {passwordError ? "Şifre alanı zorunludur." : ""}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 350 }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-repassword"
              style={{ color: repasswordError ? "#dc143c" : "#616161" }}
            >
              Şifre Tekrar *
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-repassword"
              type={showRepassword ? "text" : "password"} // type="password" olarak değiştirildi
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRepassword}
                    onMouseDown={handleMouseDownRepassword}
                    edge="end"
                  >
                    {showRepassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Şifre Tekrar"
              value={formData.repassword}
              onChange={handleRepasswordChange}
              error={repasswordError}
              inputProps={{
                style: { color: "gray" },
                maxLength: 16,
              }}
              autoComplete="off"
            />
            <FormHelperText error={repasswordError}>
              {repasswordError ? "Şifre tekrar alanı zorunludur." : ""}
            </FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            sx={{ m: 1, minWidth: 350, textTransform: "none" }}
            onClick={handleSubmit}
          >
            Aktivasyon İşlemini Gerçekleştir
          </Button>
          {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
        </Paper>
      </Box>
    </>
  );
};
export default Activation;
