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


  const handleChangeForHousingTypes = (event) => {
    setHousingTypes(event.target.value);
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

  const handleChangeForCity = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    setCountry(""); // İl değiştiğinde ilçe bilgisini sıfırla
    fetchCountry(selectedCity); // Seçilen ile göre ilçeleri getir
  };

  const handleChangeForCountry = (event) => {
    setCountry(event.target.value);
  };

  const fetchCountry = (cityId) => {
    axiosInstance
      .get(`http://localhost:8080/api/reference/country/${cityId}`)
      .then((response) => {
        setCountryList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Burada ilçe bilgisini de formData'ya ekleyebilirsiniz
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
              
              <FormControl required sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-simple-select-required-label">İlçe</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={country}
                  label="İlçe"
                  onChange={handleChangeForCountry}
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
              </FormControl>
            
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
