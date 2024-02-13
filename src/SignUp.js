import React, { useState, useEffect } from "react";
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
import axios from "axios";

const SignUp = () => {
  const [userRole, setUserRole] = React.useState("");
  const [roles, setRoles] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [gender, setGender] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [kvkk, setKvkk] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;

    if (onlyLetters.test(inputValue)) {
      setName(inputValue);
    }
  };

  const handleSurnameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;

    if (onlyLetters.test(inputValue)) {
      setSurname(inputValue);
    }
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/reference/user-roles"
      );
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const handleChangeFoUserRole = (event) => {
    setUserRole(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reference/gender")
      .then((response) => {
        setGenderList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gender data:", error);
      });
  }, []);

  const handleChangeForGender = (event) => {
    setGender(event.target.value);
  };

  const handleIdentityNumberChange = (event) => {
    let inputIdentityNumber = event.target.value.replace(/\D/g, "");
    inputIdentityNumber = inputIdentityNumber.slice(0, 11);
    setIdentityNumber(inputIdentityNumber);
  };

  const handleMobileNumberChange = (event) => {
    let inputMobileNumber = event.target.value.replace(/\D/g, "");
    inputMobileNumber = inputMobileNumber.slice(0, 10);
    const formattedNumber = inputMobileNumber.replace(
      /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
    setMobileNumber(formattedNumber);
  };
  const validateForm = () => {
    const errors = {};
    if (!identityNumber) {
      errors.identityNumber = "TC kimlik numarası alanı zorunludur.";
    }
    if (!name) {
      errors.name = "Ad alanı zorunludur.";
    }
    if (!surname) {
      errors.surname = "Soyad alanı zorunludur.";
    }
    if (!emailAddress) {
      errors.emailAddress = "E-posta Adresi alanı zorunludur.";
    }
    if (!mobileNumber) {
      errors.mobileNumber = "Telefon numarası alanı zorunludur.";
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = "Doğum Tarihi alanı zorunludur.";
    }
    if (!gender) {
      errors.gender = "Cinsiyet alanı zorunludur.";
    }
    if (!kvkk) {
      errors.kvkk = "KVKK Aydınlatma Metni alanı zorunludur.";
    }
    if (!userRole) {
      errors.userRole = "Kullanıcı Rolü alanı zorunludur.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/sign-up",
          {
            identityNumber,
            name,
            surname,
            emailAddress,
            mobileNumber,
            dateOfBirth,
            gender,
            kvkk,
            userRole,
          }
        );
        console.log("SignUp Successful:", response.data);
      } catch (error) {
        console.error("Error signing up:", error);
      }
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
          width: 420,
          height: 1100,
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
          <InputLabel
            id="demo-simple-select-required-label"
            style={{ color: formErrors.userRole ? "#dc143c" : "" }}
          >
            Kullanıcı Rolü
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={userRole}
            label="Kullanıcı Rolü *"
            onChange={handleChangeFoUserRole}
            error={Boolean(formErrors.userRole)}
            helperText={formErrors.userRole ? formErrors.userRole : " "}
          >
            <MenuItem value="">
              {Boolean(formErrors.userRole) ? (
                <em style={{ color: "#dc143c" }}>
                  Lütfen kullanıcı rolünüzü seçiniz.
                </em>
              ) : (
                <em>Lütfen kullanıcı rolünüzü seçiniz.</em>
              )}
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.userRoles}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            style={{ color: formErrors.userRole ? "#dc143c" : "transparent" }} 
          >
            Kullanıcı rolü alanı zorunludur.
          </FormHelperText>
        </FormControl>

        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          error={Boolean(formErrors.identityNumber)}
          helperText={formErrors.identityNumber || " "}
          id="demo-helper-text-misaligned"
          label="TC Kimlik Numarası"
          value={identityNumber}
          onChange={handleIdentityNumberChange}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 11,
          }}
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          error={Boolean(formErrors.name)}
          helperText={formErrors.name || " "}
          id="demo-helper-text-misaligned"
          label="Ad"
          value={name}
          onChange={handleNameChange}
          inputProps={{
            maxLength: 20,
          }}
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          error={Boolean(formErrors.surname)}
          helperText={formErrors.surname || " "}
          id="demo-helper-text-misaligned"
          label="Soyad"
          value={surname}
          onChange={handleSurnameChange}
          inputProps={{
            maxLength: 20,
          }}
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          error={Boolean(formErrors.emailAddress)}
          helperText={formErrors.emailAddress || " "}
          id="demo-helper-text-misaligned"
          label="E-posta Adresi"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          inputProps={{
            maxLength: 50,
            pattern: ".{1,50}",
          }}
        />
        <TextField
          required
          sx={{ m: 1, minWidth: 350 }}
          error={Boolean(formErrors.mobileNumber)}
          helperText={formErrors.mobileNumber || " "}
          id="demo-helper-text-misaligned"
          label="Cep Telefonu"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          inputProps={{
            maxLength: 14,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ m: 1, minWidth: 350 }}
          >
            <DatePicker
              label="Doğum Tarihi *"
              sx={{ width: "95%" }}
              value={dateOfBirth}
              onChange={(newDate) => setDateOfBirth(newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoContainer>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ fontSize: "0.8em", marginLeft: "20px" }}
          >
            Doğum Tarihi alanı zorunludur.
          </Typography>
        </LocalizationProvider>
        <FormControl required sx={{ m: 1, minWidth: 350, marginTop: "25px" }}>
          <InputLabel
            id="demo-simple-select-required-label"
            style={{ color: formErrors.gender ? "#dc143c" : "" }}
          >
            Cinsiyet
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={gender}
            label="Cinsiyet"
            onChange={handleChangeForGender}
            error={Boolean(formErrors.gender)}
            helperText={formErrors.gender || " "}
          >
            <MenuItem value="">
              <em>Lütfen cinsiyetinizi seçiniz.</em>
            </MenuItem>
            {genderList.map((genderItem) => (
              <MenuItem key={genderItem.id} value={genderItem.id}>
                {genderItem.gender}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            style={{ color: formErrors.gender ? "#dc143c" : "transparent" }}
          >
            Cinsiyet alanı zorunludur.
          </FormHelperText>
        </FormControl>
        <Checkbox checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} />
        <span style={{ color: "gray" }}>KVKK Aydınlatma Metni'ni okudum.</span>
        <Link href="#" underline="hover">
          Tıklayınız.
        </Link>
        <Button
          variant="contained"
          sx={{ m: 1, minWidth: 350, textTransform: "none" }}
          onClick={handleSignUp}
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
