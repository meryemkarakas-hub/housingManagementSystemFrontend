import React from "react";
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

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
          helperText="TC kimlik numarası alanı zorunludur."
          id="demo-helper-text-misaligned"
          label="TC Kimlik Numarası"
        />
        <FormControl sx={{ m: 1, minWidth: 350 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Şifre *</InputLabel>
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
          />
          <FormHelperText>Şifre alanı zorunludur.</FormHelperText>
        </FormControl>
        <Checkbox {...label} />
        <span
          style={{ color: "gray", marginLeft: "5px", marginRight: "100px" }}
        >
          Beni Hatırla
        </span>
        <Link href="#" underline="hover">
          {"Şifremi Unuttum"}
        </Link>
        <Button
          variant="contained"
          sx={{ m: 1, minWidth: 350, textTransform: "none" }}
        >
          Giriş Yap
        </Button>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          <p style={{ color: "grey", marginRight: "5px", marginTop: "15px" }}>
            Üyeliğiniz yok mu?
          </p>
          <Link href="#" underline="hover">
            Kaydol
          </Link>
        </div>
      </Paper>
    </Box>
  );
};

export default Login;
