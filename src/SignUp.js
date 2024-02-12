import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [userRole, setUserRole] = React.useState("");

  const [gender, setGender] = React.useState("");

  const handleChangeFoUserRole = (event) => {
    setUserRole(event.target.value);
  };

  const handleChangeForGender = (event) => {
    setGender(event.target.value);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": {
          m: 1,
          width: 420,
          height: 1000,
          p: 2,
        },
      }}
    >
      <Paper elevation={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          style={{ marginTop: "20px", marginBottom: "20px" }}
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
            onChange={handleChangeFoUserRole}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ m: 1, minWidth: 350 }}
          >
            <DatePicker label="Doğum Tarihi *" sx={{ width: "95%" }} />
          </DemoContainer>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ fontSize: "0.8em", marginLeft: "20px"}}
          >
            Doğum Tarihi alanı zorunludur.
          </Typography>
        </LocalizationProvider>

        <FormControl required sx={{ m: 1, minWidth: 350, marginTop: "25px" }}>
          <InputLabel id="demo-simple-select-required-label">
            Cinsiyet
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={gender}
            label="Cinsiyet *"
            onChange={handleChangeForGender}
          >
            <MenuItem value="">
              <em>Lütfen cinsiyetinizi seçiniz.</em>
            </MenuItem>
            <MenuItem value={10}>Kadın</MenuItem>
            <MenuItem value={20}>Erkek</MenuItem>
          </Select>
          <FormHelperText>Cinsiyet alanı zorunludur.</FormHelperText>
        </FormControl>
        <Checkbox />
        <span style={{ color: "gray" }}>KVKK Aydınlatma Metni'ni okudum.</span>
        <Link href="#" underline="hover">
          Tıklayınız.
        </Link>
        <Button
          variant="contained"
          sx={{ m: 1, minWidth: 350, textTransform: "none" }}
        >
          Kaydol
        </Button>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          <p style={{ color: "grey", marginRight: "5px", marginTop: "15px" }}>
            Üyeliğiniz var mı?
          </p>
          <Link variant="body2" onClick={handleLoginClick}>
            Giriş Yap
          </Link>
        </div>
        {/* Kaydol Sayfasının Geri Kalanı Buraya Eklenebilir */}
      </Paper>
    </Box>
  );
};

export default SignUp;
