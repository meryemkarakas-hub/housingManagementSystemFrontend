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

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setName(inputValue);
      setFormErrors({ ...formErrors, name: "" });
    } else {
      setFormErrors({
        ...formErrors,
        name: "Ad alanı sadece harflerden oluşmalıdır.",
      });
    }
    if (inputValue === "") {
      setFormErrors({ ...formErrors, name: "Ad alanı zorunludur." });
    }
  };

  const handleSurnameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setSurname(inputValue);
      setFormErrors({ ...formErrors, surname: "" });
    } else {
      setFormErrors({
        ...formErrors,
        surname: "Soyad alanı sadece harflerden oluşmalıdır.",
      });
    }
    if (inputValue === "") {
      setFormErrors({ ...formErrors, surname: "Soyad alanı zorunludur." });
    }
  };

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputValue === "" || emailRegex.test(inputValue)) {
      setEmailAddress(inputValue);
      setFormErrors({ ...formErrors, emailAddress: "" });
    } else {
      setEmailAddress(inputValue);
      setFormErrors({
        ...formErrors,
        emailAddress: "Geçerli bir e-posta adresi giriniz.",
      });
    }
  };

  const handleMobileNumberChange = (event) => {
    let inputValue = event.target.value.trim();
    const onlyDigits = /^\d*$/;
    if (onlyDigits.test(inputValue)) {
      if (inputValue.length === 10) {
        const formattedNumber = inputValue.replace(
          /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
          "0($2)-$3-$4-$5"
        );
        setMobileNumber(formattedNumber);
        setFormErrors({ ...formErrors, mobileNumber: "" });
      } else {
        setMobileNumber(inputValue);
        setFormErrors({
          ...formErrors,
          mobileNumber:
            "Cep telefonu numarası 10 haneli ve 5XXXXXXXXX formatında olmalıdır.",
        });
      }
    } else {
      setFormErrors({
        ...formErrors,
        mobileNumber:
          "Cep Telefonu Numarası alanı sadece rakamlardan oluşmalıdır.",
      });
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

  const handleSignUp = async () => {
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
              onFocus={() => setFormErrors({ ...formErrors, userRole: "" })}
              onBlur={() => {
                if (!userRole) {
                  setFormErrors({
                    ...formErrors,
                    userRole: "Kullanıcı rolü alanı zorunludur.",
                  });
                }
              }}
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
            error={Boolean(formErrors.name)}
            helperText={formErrors.name || " "}
            id="demo-helper-text-misaligned"
            label="Ad"
            value={name}
            onChange={handleNameChange}
            autoComplete="off"
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
            autoComplete="off"
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
            value={emailAddress}
            onChange={handleEmailChange}
            autoComplete="off"
            inputProps={{
              maxLength: 50,
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
            autoComplete="off"
            inputProps={{
              maxLength: 10,
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
              onFocus={() => setFormErrors({ ...formErrors, gender: "" })}
              onBlur={() => {
                if (!gender) {
                  setFormErrors({
                    ...formErrors,
                    gender: "Cinsiyet alanı zorunludur.",
                  });
                }
              }}
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
              onChange={(e) => {
                setKvkk(e.target.checked);
                setFormErrors({
                  ...formErrors,
                  kvkk: e.target.checked
                    ? ""
                    : "KVKK Aydınlatma Metni alanının işaretlenmesi zorunludur.",
                });
              }}
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
            {formErrors.kvkk || " "}
          </FormHelperText>

          <Button
            variant="contained"
            sx={{ m: 1, minWidth: 350, textTransform: "none" }}
            onClick={handleSignUp}
          >
            Kaydol
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <p style={{ color: "grey", marginRight: "5px", marginTop: "15px" }}>
              Üyeliğiniz var mı?
            </p>
            <Link variant="body2" onClick={handleLoginClick}>
              Giriş Yap
            </Link>
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default SignUp;
