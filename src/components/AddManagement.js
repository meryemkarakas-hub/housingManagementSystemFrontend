import {
  Box,
  Container,
  Paper,
  Stack,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function AddManagement() {
  const [formData, setFormData] = useState({
    id: "",
    informationManagementSelect: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [housingTypes, setHousingTypes] = useState("");
  const [housingTypesList, setHousingTypesList] = useState([]);
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [name, setName] = useState("");

  const handleChangeForHousingTypes = (event) => {
    setHousingTypes(event.target.value);
  };

  const handleChangeForCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeForCountry = (event) => {
    setCountry(event.target.value);
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
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/api/reference/housing-types")
      .then((response) => {
        setHousingTypesList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching housing types data:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/api/reference/city")
      .then((response) => {
        setCityList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/api/reference/country")
      .then((response) => {
        setCityList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "http://localhost:8080/api/user/login";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Response from the server:", response.data);

        const { message, status } = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3}>
        <Box m={3} p={2}>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            style={{ marginTop: "40px", marginBottom: "40px" }}
          >
            Yönetim Ekle
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3}>
              <FormControl
                required
                sx={{ m: 1, minWidth: 350, marginTop: "25px" }}
              >
                <InputLabel
                  id="demo-simple-select-required-label"
                  style={{ color: formErrors.housingTypes ? "#dc143c" : "" }}
                >
                  Konut Tipi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={housingTypes}
                  label="Konut Tipi"
                  onChange={handleChangeForHousingTypes}
                  error={Boolean(formErrors.housingTypes)}
                  helperText={formErrors.housingTypes || " "}
                  onFocus={() => setFormErrors({ ...formErrors, housingTypes: "" })}
                  onBlur={() => {
                    if (!housingTypes) {
                      setFormErrors({
                        ...formErrors,
                        housingTypes: "Konut Tipi alanı zorunludur.",
                      });
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Lütfen konut tipini seçiniz.</em>
                  </MenuItem>
                  {housingTypesList.map((housingTypesItem) => (
                    <MenuItem key={housingTypesItem.id} value={housingTypesItem.id}>
                      {housingTypesItem.housingTypes}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  style={{
                    color: formErrors.housingTypes ? "#dc143c" : "transparent",
                  }}
                >
                  Konut Tipi alanı zorunludur.
                </FormHelperText>
              </FormControl>

              <FormControl
                required
                sx={{ m: 1, minWidth: 350, marginTop: "25px" }}
              >
                <InputLabel
                  id="demo-simple-select-required-label"
                  style={{ color: formErrors.city ? "#dc143c" : "" }}
                >
                  İl
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={city}
                  label="İl"
                  onChange={handleChangeForCity}
                  error={Boolean(formErrors.city)}
                  helperText={formErrors.city || " "}
                  onFocus={() => setFormErrors({ ...formErrors, city: "" })}
                  onBlur={() => {
                    if (!city) {
                      setFormErrors({
                        ...formErrors,
                        city: "İl alanı zorunludur.",
                      });
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Lütfen ili seçiniz.</em>
                  </MenuItem>
                  {cityList.map((cityItem) => (
                    <MenuItem key={cityItem.id} value={cityItem.id}>
                      {cityItem.city}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  style={{
                    color: formErrors.city ? "#dc143c" : "transparent",
                  }}
                >
                  İl alanı zorunludur.
                </FormHelperText>
              </FormControl>

              <FormControl
                required
                sx={{ m: 1, minWidth: 350, marginTop: "25px" }}
              >
                <InputLabel
                  id="demo-simple-select-required-label"
                  style={{ color: formErrors.country ? "#dc143c" : "" }}
                >
                  İlçe
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={country}
                  label="İlçe"
                  onChange={handleChangeForCountry}
                  error={Boolean(formErrors.country)}
                  helperText={formErrors.country || " "}
                  onFocus={() => setFormErrors({ ...formErrors, country: "" })}
                  onBlur={() => {
                    if (!country) {
                      setFormErrors({
                        ...formErrors,
                        country: "İlçe alanı zorunludur.",
                      });
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Lütfen ilçeyi seçiniz.</em>
                  </MenuItem>
                  {countryList.map((countryItem) => (
                    <MenuItem key={countryItem.id} value={countryItem.id}>
                      {countryItem.country}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  style={{
                    color: formErrors.country ? "#dc143c" : "transparent",
                  }}
                >
                  İlçe alanı zorunludur.
                </FormHelperText>
              </FormControl>


             
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
              <Button
                variant="contained"
                sx={{ m: 1, minWidth: 350, textTransform: "none" }}
                onClick={handleSubmit}
              >
                Yönetim Ekle
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
