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
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function AddManagement() {
  const [formData, setFormData] = useState({
    housingTypes: "",
    city: "",
    country: "",
    address: "",
    apartmentName: "",
    numberOfFlats: "",
    siteApartmentName: "",
    siteSingleHouseName: "",
    numberOfSingleHouse: "",
    blockCount: "",
    blocks: "",
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
  const [siteApartmentName, setSiteApartmentName] = useState("");
  const [siteSingleHouseName, setSiteSingleHouseName] = useState("");
  const [numberOfSingleHouse, setNumberOfSingleHouse] = useState("");
  const [blockCount, setBlockCount] = useState("");
  const [blocks, setBlocks] = useState([]);

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
    setCountry("");
    fetchCountry(selectedCity);
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
    const onlyNumbers = /^\d{0,3}$/;
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
    const onlyNumbers = /^\d{0,3}$/;
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

  const handleBlocksChange = (index, field, value) => {
    const onlyLetters = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;
    const onlyNumbers = /^\d{0,3}$/;
  
    const updatedBlocks = [...blocks];
    updatedBlocks[index][field] = value;
    setBlocks(updatedBlocks);
  
    if (field === 'blockName') {
      if (!value) {
        setFormErrors({ ...formErrors, [`blockName${index}`]: "Blok Adı alanı zorunludur." });
      } else if (!onlyLetters.test(value)) {
        setFormErrors({ ...formErrors, [`blockName${index}`]: "Blok Adı harflerden oluşmalıdır." });
      } else {
        setFormErrors({ ...formErrors, [`blockName${index}`]: "" });
      }
    } else if (field === 'numberOfFlatsForBlock') {
      if (!value) {
        setFormErrors({ ...formErrors, [`numberOfFlatsForBlock${index}`]: "Daire Sayısı alanı zorunludur." });
      } else if (!onlyNumbers.test(value)) {
        setFormErrors({ ...formErrors, [`numberOfFlatsForBlock${index}`]: "Daire sayısı alanı sadece rakamlardan oluşmalıdır." });
      } else if (value.length > 3) {
        setFormErrors({ ...formErrors, [`numberOfFlatsForBlock${index}`]: "Daire Sayısı alanı en fazla 3 karakterden oluşmalıdır." });
      } else {
        setFormErrors({ ...formErrors, [`numberOfFlatsForBlock${index}`]: "" });
      }
    }
  };
  

  const handleBlockCountChange = (event) => {
    const inputValue = event.target.value;
    const onlyNumbers = /^\d{0,3}$/;

    if (inputValue === "") {
      setBlockCount("");
      setFormErrors({
        ...formErrors,
        blockCount: "Blok Sayısı alanı zorunludur.",
      });
    } else if (onlyNumbers.test(inputValue)) {
      setBlockCount(inputValue);
      setFormErrors({ ...formErrors, blockCount: "" });

      if (inputValue.length > 3) {
        setFormErrors({
          ...formErrors,
          blockCount: "Blok Sayısı sadece 3 rakamdan oluşmalıdır.",
        });
      } else {
        const newBlocks = [];
        for (let i = 0; i < inputValue; i++) {
          newBlocks.push({ blockName: "", numberOfFlatsForBlock: "" });
        }
        setBlocks(newBlocks);
      }
    } else {
      setFormErrors({
        ...formErrors,
        blockCount: "Blok Sayısı alanı sadece rakamlardan oluşmalıdır.",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSend = {
      housingTypes: housingTypes,
      city: city,
      country: country,
      address: address,
      apartmentName: apartmentName,
      numberOfFlats: numberOfFlats,
      siteApartmentName: siteApartmentName,
      siteSingleHouseName: siteSingleHouseName,
      numberOfSingleHouse: numberOfSingleHouse,
      blockCount: blockCount,
      blocks: blocks
    };

    const apiUrl = "/user/management-add";
    axiosInstance
      .post(apiUrl,formDataToSend)
      .then((response) => {
        console.log("Response from the server:", response.data);

        const { message, status } = response.data;
        if (status === 1) {
          console.log(message);
        }
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
                    error={Boolean(formErrors.blockCount)}
                    helperText={formErrors.blockCount || " "}
                    id="demo-helper-text-misaligned"
                    label="Blok Sayısı"
                    value={blockCount}
                    onChange={handleBlockCountChange}
                    autoComplete="off"
                  />
                  {blocks.map((block, index) => (
                    <React.Fragment key={index}>
                      <TextField
                        required
                        sx={{ m: 1, minWidth: 350 }}
                        error={Boolean(formErrors[`blockName${index}`])}
                        helperText={formErrors[`blockName${index}`] || " "}
                        id={`block-name-${index}`}
                        label={`Blok Adı ${index + 1}`}
                        value={block.blockName}
                        onChange={(event) =>
                          handleBlocksChange(
                            index,
                            "blockName",
                            event.target.value
                          )
                        }
                        autoComplete="off"
                        inputProps={{
                          maxLength: 50,
                        }}
                      />
                      <TextField
                        required
                        sx={{ m: 1, minWidth: 350 }}
                        error={Boolean(
                          formErrors[`numberOfFlatsForBlock${index}`]
                        )}
                        helperText={
                          formErrors[`numberOfFlatsForBlock${index}`] || " "
                        }
                        id={`number-of-flats-for-block-${index}`}
                        label={`Daire Sayısı ${index + 1}`}
                        value={block.numberOfFlatsForBlock}
                        onChange={(event) =>
                          handleBlocksChange(
                            index,
                            "numberOfFlatsForBlock",
                            event.target.value
                          )
                        }
                        autoComplete="off"
                      />
                    </React.Fragment>
                  ))}
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
