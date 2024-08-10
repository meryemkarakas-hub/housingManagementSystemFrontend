import React from 'react';
import { Button, Input } from '@mui/material';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function FileUpload() {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      // Handling the Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming you want to work with the first sheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData); // Do something with the JSON data
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="excel-file-upload"
      />
      <label htmlFor="excel-file-upload">
        <Button variant="contained" component="span">
          Upload Excel File
        </Button>
      </label>
      {fileName && <p>Uploaded file: {fileName}</p>}
    </div>
  );
}
