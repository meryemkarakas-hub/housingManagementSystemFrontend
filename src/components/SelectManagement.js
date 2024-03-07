import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function SelectManagement() {
  const [formData, setFormData] = useState({
    id: "",
    informationManagementSelect: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [informationManagementSelectList, setInformationManagementSelectList] =
    useState([]);
  const [informationManagementSelect, setInformationManagementSelect] =
    useState("");

  const handleChangeForInformationManagementSelect = (event) => {
    setInformationManagementSelect(event.target.value);
  };

  useEffect(() => {
    axiosInstance
      .get("/user/information/management-select")
      .then((response) => {
        setInformationManagementSelectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gender data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = "/user/information/management-select";

    axiosInstance
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
            Oturum Seç
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3}>
              <FormControl
                required
                sx={{ m: 1, minWidth: 350, marginTop: "25px" }}
              >
                <InputLabel
                  id="demo-simple-select-required-label"
                  style={{
                    color: formErrors.informationManagementSelect
                      ? "#dc143c"
                      : "",
                  }}
                >
                  Oturum Seçimi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={informationManagementSelect}
                  label="Oturum Seçimi"
                  onChange={handleChangeForInformationManagementSelect}
                  error={Boolean(formErrors.informationManagementSelect)}
                  helperText={formErrors.informationManagementSelect || " "}
                  onFocus={() =>
                    setFormErrors({
                      ...formErrors,
                      informationManagementSelect: "",
                    })
                  }
                  onBlur={() => {
                    if (!informationManagementSelect) {
                      setFormErrors({
                        ...formErrors,
                        informationManagementSelect:
                          "Oturum Seçim alanı zorunludur.",
                      });
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Lütfen işlem yapacağınız oturumu seçiniz.</em>
                  </MenuItem>
                  {informationManagementSelectList.map(
                    (informationManagementSelectItem) => (
                      <MenuItem
                        key={informationManagementSelectItem.id}
                        value={informationManagementSelectItem.id}
                      >
                        {
                          informationManagementSelectItem.informationManagementSelect
                        }
                      </MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText
                  style={{
                    color: formErrors.informationManagementSelect
                      ? "#dc143c"
                      : "transparent",
                  }}
                >
                  Oturum Seçim alanı zorunludur.
                </FormHelperText>
              </FormControl>

              <Button
                variant="contained"
                sx={{ m: 1, minWidth: 350, textTransform: "none" }}
                onClick={handleSubmit}
              >
                Oturum Seç
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
