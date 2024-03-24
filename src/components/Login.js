import React, { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue.slice(0, 16));
    if (inputValue.length === 1 ) {
      setFormErrors({ ...formErrors, password: "" });
    } 
  };

  const validateUserInfo = () => {
    const errors = {};

    const requiredFields = {
      identityNumber: "TC kimlik numarası",
      password: "Şifre",
    };

    const checkField = (field, fieldName) => {
      if (!field) {
        errors[fieldName] = `${requiredFields[fieldName]} alanı zorunludur.`;
      }
    };

    checkField(identityNumber, "identityNumber");
    checkField(password, "password");
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

  const handleSubmit = async () => {
    if (validateUserInfo()) {
      try {
        // const data=authService.login(identityNumber,password);

        // const { message, status } = data;
        dispatch(login(identityNumber, password))
          .then(() => {
            navigate("/select-management");
            // navigate("/dashboard");
            window.location.reload();
          })
          .catch((error) => {
            showSnackbar(message, 0);
          });

        // if (status === 1) {
        //   console.log(message);
        //   showSnackbar(message, 1);
        // } else {
        //   console.error(message);
        //   showSnackbar(message, 0);
        // }
      } catch (error) {
        console.error("Error occurred:", error);
        showSnackbar("Giriş yapılırken bir hata oluştu.", 0);
      }
    }
  };

  const navigate = useNavigate();

  const handleResetPasswordClick = () => {
    navigate("/reset-password");
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
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
            Giriş Yap
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
          <Checkbox />
          <span
            style={{ color: "gray", marginLeft: "5px", marginRight: "100px" }}
          >
            Beni Hatırla
          </span>
          <Link variant="body2" onClick={handleResetPasswordClick}>
            {"Şifremi Unuttum"}
          </Link>
          <Button
            variant="contained"
            sx={{ m: 1, minWidth: 350, textTransform: "none" }}
            onClick={handleSubmit}
          >
            Giriş Yap
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <p style={{ color: "grey", marginRight: "5px", marginTop: "15px" }}>
              Üyeliğiniz yok mu?
            </p>
            <Link variant="body2" onClick={handleSignUpClick}>
              Kaydol
            </Link>
          </div>
        </Paper>
      </Box>
    </>
  );
};
export default Login;
