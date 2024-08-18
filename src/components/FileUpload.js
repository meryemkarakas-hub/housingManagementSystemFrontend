import React, { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUpload({ onFileChange }) {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file); // Dosyayı üst bileşene ilet

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData); // JSON verileriyle işlem yap
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <label htmlFor="excel-file-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ m: 1, minWidth: 350, textTransform: "none" }}
        >
          Konut Bilgisi Excel Dosyasını yükle
        </Button>
      </label>
      <VisuallyHiddenInput
        id="excel-file-upload"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      {fileName && <p>Yüklenen Dosya: {fileName}</p>}
    </div>
  );
}
