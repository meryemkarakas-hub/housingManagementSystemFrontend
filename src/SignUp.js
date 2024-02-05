import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const SignUp = () => {
  const [userRole, setUserRole] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value);
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
          height: 600,
          p: 2,
        },
      }}
    >
      <Paper elevation={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          style={{ marginTop: "20px", marginBottom: "40px" }}
        >
          KAYDOL
        </Typography>
        <FormControl required sx={{ m: 1, minWidth: 350 }}>
          <InputLabel id="demo-simple-select-required-label">
            Kullanıcı Rolü
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={userRole}
            label="Kullanıcı Rolü *"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Lütfen kullanıcı rolünüzü seçiniz.</em>
            </MenuItem>
            <MenuItem value={10}>Sistem Yöneticisi</MenuItem>
            <MenuItem value={20}>Konut Yöneticisi</MenuItem>
            <MenuItem value={30}>Konut Sakini</MenuItem>
          </Select>
          <FormHelperText>Kullanıcı rolü alanı zorunludur.</FormHelperText>
        </FormControl>
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
          helperText="Ad alanı zorunludur."
          id="demo-helper-text-misaligned"
          label="Ad"
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          helperText="Soyad alanı zorunludur."
          id="demo-helper-text-misaligned"
          label="Soyad"
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          helperText="Cep Telefonu alanı zorunludur."
          id="demo-helper-text-misaligned"
          label="Cep Telefonu"
        />
        {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
      </Paper>
    </Box>
  );
};

export default SignUp;
