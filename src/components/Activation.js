import React, { useState } from "react";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router";

const Activation = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepassword = () => setShowRepassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownRepassword = (event) => {
    event.preventDefault();
  };
  

  const handlePasswordChange = (event) => {
    let inputValue = event.target.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
    if (inputValue.length > 16) {
        inputValue = inputValue.slice(0, 16);
    }
    setPassword(inputValue);
    if (!inputValue) {
      setFormErrors({ ...formErrors, password: "Şifre alanı zorunludur." });
    } else if (inputValue.length < 8 || inputValue.length > 16 || !passwordRegex.test(inputValue)) {
      setFormErrors({ ...formErrors, password: "Şifre alanı en az 8 karakterden en fazla 16 karakterden oluşmalıdır. Büyük harf, küçük harf, özel karakter ve rakam içermelidir." });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  
  const handleRepasswordChange = (event) => {
    let inputValue = event.target.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
    if (inputValue.length > 16) {
        inputValue = inputValue.slice(0, 16);
    }
    setRePassword(inputValue);
    if (!inputValue) {
      setFormErrors({ ...formErrors, rePassword: "Şifre alanı zorunludur." });
    } else if (inputValue.length < 8 || inputValue.length > 16 || !passwordRegex.test(inputValue)) {
      setFormErrors({ ...formErrors, rePassword: "Şifre alanı en az 8 karakterden en fazla 16 karakterden oluşmalıdır. Büyük harf, küçük harf, özel karakter ve rakam içermelidir." });
    } else {
      setFormErrors({ ...formErrors, rePassword: "" });
    }
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

  const navigate = useNavigate();

  const validateUserInfo = () => {
    const errors = {};

    const requiredFields = {
      identityNumber: "TC kimlik numarası",
      password: "Şifre",
      rePassword: "Şifre Tekrar",
    };

    const checkField = (field, fieldName) => {
      if (!field) {
        errors[fieldName] = `${requiredFields[fieldName]} alanı zorunludur.`;
      }
    };

    checkField(identityNumber, "identityNumber");
    checkField(password, "password");
    checkField(rePassword, "rePassword");
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const handleSubmit = async () => {
    const activationCode = window.location.pathname.split("/").pop();
    if (validateUserInfo()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/activation",
          {
            identityNumber,
            password,
            rePassword,
            activationCode,
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
        showSnackbar("Kaydolunurken bir hata oluştu.", 0);
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
            error={Boolean(formErrors.password)}
            helperText={formErrors.password || " "}
            id="outlined-adornment-password"
            label="Şifre"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
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
              ),
            }}
            autoComplete="off"
            variant="outlined"
          />
           <TextField
            required
            sx={{ m: 1, minWidth: 350 }}
            error={Boolean(formErrors.rePassword)}
            helperText={formErrors.rePassword || " "}
            id="outlined-adornment-rePassword"
            label="Şifre Tekrar"
            type={showRepassword ? "text" : "password"}
            value={rePassword}
            onChange={handleRepasswordChange}
            InputProps={{
              endAdornment: (
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
              ),
            }}
            autoComplete="off"
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ m: 1, minWidth: 350, textTransform: "none" }}
            onClick={handleSubmit}
          >
            Aktivasyon İşlemini Gerçekleştir
          </Button>
        </Paper>
      </Box>
    </>
  );
};
export default Activation;
