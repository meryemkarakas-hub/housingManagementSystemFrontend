import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function AddManagement() {
  const [formData, setFormData] = useState({
    id: "",
    informationManagementSelect: "",
  });
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
            Oturum Seç
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3}>
              <TextField
                required
                sx={{ m: 1, minWidth: 350 }}
                id="demo-helper-text-misaligned"
                label="TC Kimlik Numarası"
                autoComplete="off"
              />

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
