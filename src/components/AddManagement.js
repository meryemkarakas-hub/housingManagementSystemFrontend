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
  const [address, setAddress] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [numberOfFlats, setNumberOfFlats] = useState("");
  const [numberOfBlocks, setNumberOfBlocks] = useState("");
  const [siteApartmentName, setSiteApartmentName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [numberOfFlatsForBlock, setNumberOfFlatsForBlock] = useState("");
  const [siteSingleHouseName, setSiteSingleHouseName] = useState("");
  const [numberOfSingleHouse, setNumberOfSingleHouse] = useState("");

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

  const handleAddressChange = (event) => {
    const inputValue = event.target.value;
    const anyCharacter = /^[^\s]*$/;
    if (anyCharacter.test(inputValue) || inputValue === "") {
      setAddress(inputValue);
      setFormErrors({ ...formErrors, address: "" });
    }
    if (inputValue === "") {
      setFormErrors({ ...formErrors, address: "Adres alanı zorunludur." });
    }
  };

  const handleApartmentNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setApartmentName(inputValue);
      setFormErrors({ ...formErrors, apartmentName: "" });
    } else {
      setFormErrors({
        ...formErrors,
        apartmentName: "Apartman Adı alanı sadece harflerden oluşmalıdır.",
      });
    }
    if (inputValue === "") {
      setFormErrors({
        ...formErrors,
        apartmentName: "Apartman Adı alanı zorunludur.",
      });
    }
  };

  const handleNumberOfFlatsChange = (event) => {
    const inputValue = event.target.value;
    const onlyNumbers = /^\d{0,3}$/; // Sadece rakamlar ve en fazla üç karakter
    if (inputValue === "") {
      setNumberOfFlats("");
      setFormErrors({
        ...formErrors,
        numberOfFlats: "Daire Sayısı alanı zorunludur.",
      });
    } else if (onlyNumbers.test(inputValue)) {
      setNumberOfFlats(inputValue);
      setFormErrors({ ...formErrors, numberOfFlats: "" });
    } else {
      setFormErrors({
        ...formErrors,
        numberOfFlats: "Daire Sayısı alanı rakamlardan oluşmalıdır.",
      });
    }
    if (inputValue.length > 3) {
      setFormErrors({
        ...formErrors,
        numberOfFlats: "Daire Sayısı alanı en fazla üç rakamdan oluşmalıdır.",
      });
    }
  };

  const handleSiteApartmentNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setSiteApartmentName(inputValue);
      setFormErrors({ ...formErrors, siteApartmentName: "" });
    } else {
      setFormErrors({
        ...formErrors,
        siteApartmentName: "Site Adı alanı sadece harflerden oluşmalıdır.",
      });
    }
    if (inputValue === "") {
      setFormErrors({
        ...formErrors,
        siteApartmentName: "Site Adı alanı zorunludur.",
      });
    }
  };

  const handleNumberOfBlocksChange = (event) => {
    const inputValue = event.target.value;
    const onlyNumbers = /^\d{0,3}$/; // Sadece rakamlar ve en fazla üç karakter
    if (inputValue === "") {
      setNumberOfBlocks("");
      setFormErrors({
        ...formErrors,
        numberOfBlocks: "Blok Sayısı alanı zorunludur.",
      });
    } else if (onlyNumbers.test(inputValue)) {
      setNumberOfBlocks(inputValue);
      setFormErrors({ ...formErrors, numberOfBlocks: "" });
    } else {
      setFormErrors({
        ...formErrors,
        numberOfBlocks: "Blok Sayısı alanı rakamlardan oluşmalıdır.",
      });
    }
    if (inputValue.length > 3) {
      setFormErrors({
        ...formErrors,
        numberOfBlocks: "Blok Sayısı alanı en fazla üç rakamdan oluşmalıdır.",
      });
    }
  };

  const handleBlockNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setBlockName(inputValue);
      setFormErrors({ ...formErrors, blockName: "" });
    } else {
      setFormErrors({
        ...formErrors,
        blockName: "Blok Adı alanı sadece harflerden oluşmalıdır.",
      });
    }
    if (inputValue === "") {
      setFormErrors({
        ...formErrors,
        blockName: "Blok Adı alanı zorunludur.",
      });
    }
  };

  const handleNumberOfFlatsForBlockChange = (event) => {
    const inputValue = event.target.value;
    const onlyNumbers = /^\d{0,3}$/; // Sadece rakamlar ve en fazla üç karakter
    if (inputValue === "") {
      setNumberOfFlatsForBlock("");
      setFormErrors({
        ...formErrors,
        numberOfFlatsForBlock: "Daire Sayısı alanı zorunludur.",
      });
    } else if (onlyNumbers.test(inputValue)) {
      setNumberOfFlatsForBlock(inputValue);
      setFormErrors({ ...formErrors, numberOfFlatsForBlock: "" });
    } else {
      setFormErrors({
        ...formErrors,
        numberOfFlatsForBlock: "Daire Sayısı alanı rakamlardan oluşmalıdır.",
      });
    }
    if (inputValue.length > 3) {
      setFormErrors({
        ...formErrors,
        numberOfFlatsForBlock:
          "Daire Sayısı alanı en fazla üç rakamdan oluşmalıdır.",
      });
    }
  };

  const handleSiteSingleHouseNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setSiteSingleHouseName(inputValue);
      setFormErrors({ ...formErrors, siteSingleHouseName: "" });
    } else {
      setFormErrors({
        ...formErrors,
        siteSingleHouseName: "Site Adı alanı sadece harflerden oluşmalıdır.",
      });
    }
    if (inputValue === "") {
      setFormErrors({
        ...formErrors,
        siteSingleHouseName: "Site Adı alanı zorunludur.",
      });
    }
  };

  const handleNumberOfSingleHouseChange = (event) => {
    const inputValue = event.target.value;
    const onlyNumbers = /^\d{0,3}$/; // Sadece rakamlar ve en fazla üç karakter
    if (inputValue === "") {
      setNumberOfSingleHouse("");
      setFormErrors({
        ...formErrors,
        numberOfSingleHouse: "Konut Sayısı alanı zorunludur.",
      });
    } else if (onlyNumbers.test(inputValue)) {
      setNumberOfSingleHouse(inputValue);
      setFormErrors({ ...formErrors, numberOfSingleHouse: "" });
    } else {
      setFormErrors({
        ...formErrors,
        numberOfSingleHouse: "Konut Sayısı alanı rakamlardan oluşmalıdır.",
      });
    }
    if (inputValue.length > 3) {
      setFormErrors({
        ...formErrors,
        numberOfSingleHouse:
          "Konut Sayısı alanı en fazla üç rakamdan oluşmalıdır.",
      });
    }
  };

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
                  onFocus={() =>
                    setFormErrors({ ...formErrors, housingTypes: "" })
                  }
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
                    <MenuItem
                      key={housingTypesItem.id}
                      value={housingTypesItem.id}
                    >
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
                <InputLabel id="demo-simple-select-required-label">
                  İlçe
                </InputLabel>
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
              <TextField
                required
                sx={{ m: 1, minWidth: 350 }}
                error={Boolean(formErrors.address)}
                helperText={formErrors.address || " "}
                id="demo-helper-text-misaligned"
                label="Adres"
                value={address}
                onChange={handleAddressChange}
                autoComplete="off"
                inputProps={{
                  maxLength: 200,
                }}
              />
              {housingTypes === 1 && (
                <>
                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.apartmentName)}
                    helperText={formErrors.apartmentName || " "}
                    id="demo-helper-text-misaligned"
                    label="Apartman Adı"
                    value={apartmentName}
                    onChange={handleApartmentNameChange}
                    autoComplete="off"
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.numberOfFlats)}
                    helperText={formErrors.numberOfFlats || " "}
                    id="demo-helper-text-misaligned"
                    label="Daire Sayısı"
                    value={numberOfFlats}
                    onChange={handleNumberOfFlatsChange}
                    autoComplete="off"
                  />
                </>
              )}
              {housingTypes === 2 && (
                <>
                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.siteApartmentName)}
                    helperText={formErrors.siteApartmentName || " "}
                    id="demo-helper-text-misaligned"
                    label="Site Adı"
                    value={siteApartmentName}
                    onChange={handleSiteApartmentNameChange}
                    autoComplete="off"
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.numberOfBlocks)}
                    helperText={formErrors.numberOfBlocks || " "}
                    id="demo-helper-text-misaligned"
                    label="Blok Sayısı"
                    value={numberOfBlocks}
                    onChange={handleNumberOfBlocksChange}
                    autoComplete="off"
                  />

                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.blockName)}
                    helperText={formErrors.blockName || " "}
                    id="demo-helper-text-misaligned"
                    label="Blok Adı"
                    value={blockName}
                    onChange={handleBlockNameChange}
                    autoComplete="off"
                    inputProps={{
                      maxLength: 50,
                    }}
                  />

                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.numberOfFlatsForBlock)}
                    helperText={formErrors.numberOfFlatsForBlock || " "}
                    id="demo-helper-text-misaligned"
                    label="Daire Sayısı"
                    value={numberOfFlatsForBlock}
                    onChange={handleNumberOfFlatsForBlockChange}
                    autoComplete="off"
                  />
                </>
              )}
              {housingTypes === 3 && (
                <>
                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.siteSingleHouseName)}
                    helperText={formErrors.siteSingleHouseName || " "}
                    id="demo-helper-text-misaligned"
                    label="Site Adı"
                    value={siteSingleHouseName}
                    onChange={handleSiteSingleHouseNameChange}
                    autoComplete="off"
                    inputProps={{
                      maxLength: 50,
                    }}
                  />
                  <TextField
                    required
                    sx={{ m: 1, minWidth: 350 }}
                    error={Boolean(formErrors.numberOfSingleHouse)}
                    helperText={formErrors.numberOfSingleHouse || " "}
                    id="demo-helper-text-misaligned"
                    label="Konut Sayısı"
                    value={numberOfSingleHouse}
                    onChange={handleNumberOfSingleHouseChange}
                    autoComplete="off"
                  />
                </>
              )}
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
