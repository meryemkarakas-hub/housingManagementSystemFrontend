import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identityNumber, setIdentityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [identityError, setIdentityError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/[a-z]/.test(password)) {
      return false;
    }

    if (!/[0-9]/.test(password)) {
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword.slice(0, 16));
    setPasswordError(false); 
  };

  const handleIdentityNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setIdentityNumber(value);
      setIdentityError(false); 
    }
  };
  const handleSubmit = async () => {
    if (!identityNumber) {
      setIdentityError(true);
    } else {
      setIdentityError(false);
    }

    if (!password) {
      setPasswordError(true);
    }

    if (identityNumber && password) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          {
            identityNumber,
            password,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error occurred:", error);
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
          helperText={
            identityError ? "TC kimlik numarası alanı zorunludur." : ""
          }
          error={identityError}
          id="demo-helper-text-misaligned"
          label="TC Kimlik Numarası"
          value={identityNumber}
          onChange={handleIdentityNumberChange}
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
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            inputProps={{
              style: { color: "gray" },
            }}
          />
          <FormHelperText error={passwordError}>
            {passwordError ? "Şifre alanı zorunludur." : ""}
          </FormHelperText>
        </FormControl>
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
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
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
  );
};

export default Login;
