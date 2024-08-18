import React, { useEffect, useState } from "react";
import NestedListMenu from "./NestedListMenu";
import DashboardMenu from "./DashboardMenu";
import FileUpload from "./FileUpload";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function AddHousingInformation() {
  const [formErrors, setFormErrors] = useState({});
  const [blockName, setBlokName] = useState("");
  const [blockNameList, setBlockNameList] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const showSnackbar = (message, status) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(status === 0 ? "error" : "success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validateBlockName = () => {
    const errors = {};

    const requiredFields = {
      blockName: "Blok Adı",
    };

    const checkField = (field, fieldName) => {
      if (!field) {
        errors[fieldName] = `${requiredFields[fieldName]} alanı zorunludur.`;
      }
    };

    checkField(blockName, "blockName");

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    axiosInstance
      .get("/housing-management/block-names")
      .then((response) => {
        setBlockNameList(response.data);
      })
      .catch((error) => {
        console.error("Blok adı verileri alınırken hata oluştu:", error);
      });
  }, []);

  const handleChangeForBlokName = (event) => {
    setBlokName(event.target.value);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleHousingInformation = async () => {
      try {
        const formData = new FormData();
        //formData.append("blockName", blockName);
        formData.append("file", file);

        const response = await axiosInstance.post(
          "/housing-management/add-housing-information",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
        console.error("Hata oluştu:", error);
        showSnackbar("Kayıt sırasında bir hata oluştu.", 0);
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
      <div>
        <DashboardMenu />
        <div className="leftMenu">
          <NestedListMenu />
        </div>
        <div className="rightMenu">
          <div>
            <FormControl
              required
              sx={{ m: 1, minWidth: 350, marginTop: "25px" }}
            >
              <InputLabel
                id="demo-simple-select-required-label"
                style={{ color: formErrors.blockName ? "#dc143c" : "" }}
              >
                Blok Adı
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={blockName}
                label="Blok Adı"
                onChange={handleChangeForBlokName}
                error={Boolean(formErrors.blockName)}
                helperText={formErrors.blockName || " "}
                onFocus={() => setFormErrors({ ...formErrors, blockName: "" })}
                onBlur={() => {
                  if (!blockName) {
                    setFormErrors({
                      ...formErrors,
                      blockName: "Blok Adı alanı zorunludur.",
                    });
                  }
                }}
              >
                <MenuItem value="">
                  <em>Lütfen işlem yapacağınız blok adını seçiniz.</em>
                </MenuItem>
                {blockNameList.map((blockNameItem) => (
                  <MenuItem key={blockNameItem.id} value={blockNameItem.id}>
                    {blockNameItem.blockName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                style={{
                  color: formErrors.blockName ? "#dc143c" : "transparent",
                }}
              >
                Blok Adı alanı zorunludur.
              </FormHelperText>
            </FormControl>
          </div>
          <FileUpload onFileChange={handleFileChange} />
          <Button
            variant="contained"
            sx={{ m: 1, minWidth: 350, textTransform: "none", backgroundColor: "green" }}
            onClick={handleHousingInformation}
          >
            Konut Bilgisi Ekle
          </Button>
        </div>
      </div>
    </>
  );
}
