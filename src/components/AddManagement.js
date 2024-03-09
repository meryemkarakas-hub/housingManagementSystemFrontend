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
  const [name, setName] = useState("");

  const handleChangeForHousingTypes = (event) => {
    setHousingTypes(event.target.value);
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
