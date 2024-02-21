import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Snackbar,
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
  const [showErrors, setShowErrors] = useState(false);
  const [identityError, setIdentityError] = useState(false);



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
        "http://localhost:8080/api/auth/reference/user-roles"
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
      .get("http://localhost:8080/api/auth/reference/gender")
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
  const validateUserInfo = () => {
    const errors = {};

    const requiredFields = {
      identityNumber: "TC kimlik numarası",
      name: "Ad",
      surname: "Soyad",
      emailAddress: "E-posta Adresi",
      mobileNumber: "Telefon numarası",
      dateOfBirth: "Doğum Tarihi",
      gender: "Cinsiyet",
      kvkk: "KVKK Aydınlatma Metni",
      userRole: "Kullanıcı Rolü",
    };

    const checkField = (field, fieldName) => {
      if (!field) {
        errors[fieldName] = `${requiredFields[fieldName]} alanı zorunludur.`;
      }
    };

    checkField(identityNumber, "identityNumber");
    checkField(name, "name");
    checkField(surname, "surname");
    checkField(emailAddress, "emailAddress");
    checkField(mobileNumber, "mobileNumber");
    checkField(dateOfBirth, "dateOfBirth");
    checkField(gender, "gender");
    checkField(kvkk, "kvkk");
    checkField(userRole, "userRole");

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTCNumber = (tcNumber) => {
    const tcRegex = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
    return tcRegex.test(tcNumber);
  };

  const handleSignUp = async () => {
    setShowErrors(true);
    if (!validateTCNumber(identityNumber)) {
      setIdentityError(true);
    } else {
      setIdentityError(false);
    }
    if (validateUserInfo()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/sign-up",
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
          helperText={showErrors && !identityNumber ? "TC kimlik numarası alanı zorunludur." : ""}
          id="identityNumber"
          label="TC Kimlik Numarası"
          value={identityNumber}
          error={identityError}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input)) {
              setIdentityNumber(input.slice(0, 11));
              setIdentityError(false);
            }
          }}
          inputProps={{ maxLength: 11 }}
        />
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
              label={
                <span
                  style={{ color: formErrors.dateOfBirth ? "#dc143c" : "" }}
                >
                  Doğum Tarihi *
                </span>
              }
              sx={{ width: "95%" }}
              value={dateOfBirth}
              onChange={(newDate) => setDateOfBirth(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(formErrors.dateOfBirth)}
                  helperText={
                    formErrors.dateOfBirth
                      ? "Doğum Tarihi alanı zorunludur."
                      : " "
                  }
                />
              )}
            />
          </DemoContainer>
          <Typography
            variant="body2"
            color={formErrors.dateOfBirth ? "#dc143c" : "textSecondary"}
            style={{
              fontSize: "0.8em",
              marginLeft: "20px",
            }}
          >
            {formErrors.dateOfBirth ? "Doğum Tarihi alanı zorunludur." : " "}
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
        <div>
          <Checkbox
            checked={kvkk}
            onChange={(e) => setKvkk(e.target.checked)}
          />
          <span style={{ color: "gray" }}>
            KVKK Aydınlatma Metni'ni okudum.
          </span>
          <Link href="#" underline="hover">
            Tıklayınız.
          </Link>
        </div>
        <FormHelperText
          style={{
            color: formErrors.kvkk ? "#dc143c" : "transparent",
            marginLeft: "25px",
          }}
        >
          KVKK Aydınlatma Metni alanı zorunludur.
        </FormHelperText>
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
    </>
  );
};

export default SignUp;
