import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { previewData } from "next/dist/client/components/headers";

export default function Step3NomineDetails({ nomineData, setNomineData }) {
  const handleNomineChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNomineData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  return (
    <Box sx={{ mt: "40px" }}>
      <Box sx={{}}>
        <InputLabel>Nominate a person</InputLabel>
        <RadioGroup row>
          <FormControlLabel
            name="isNomine"
            value="yes"
            control={
              <Radio
                checked={nomineData.isNomine === "yes"}
                onChange={handleNomineChange}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            name="isNomine"
            value="no"
            control={
              <Radio
                checked={nomineData.isNomine === "no"}
                onChange={handleNomineChange}
              />
            }
            label="No"
          />
        </RadioGroup>
      </Box>
      {nomineData.isNomine === "yes" && (
        <Grid container>
          <Grid lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <InputLabel required>Nomine First Name</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="nomineFirstName"
                value={nomineData.nomineFirstName}
                onChange={handleNomineChange}
              />
              <InputLabel required>Nomine Middle Name</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="nomineMiddleName"
                value={nomineData.nomineMiddleName}
                onChange={handleNomineChange}
              />
              <InputLabel required>Nomine Last Name</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="nomineLastName"
                value={nomineData.nomineLastName}
                onChange={handleNomineChange}
              />
              <InputLabel required>Gender</InputLabel>
              <Select
                className="form-style-cust"
                required
                name="nomineGender"
                value={nomineData.nomineGender}
                onChange={handleNomineChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <InputLabel required>Nomine Aadhaar number</InputLabel>
              <TextField
                type="number"
                className="form-style-cust"
                name="nomineAadhar"
                value={nomineData.nomineAadhar}
                onChange={handleNomineChange}
              />
              <InputLabel required>Relationship</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="nomineRelationship"
                value={nomineData.nomineRelationship}
                onChange={handleNomineChange}
              />
              <InputLabel required>DOB</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="nomineDob"
                value={nomineData.nomineDob}
                onChange={handleNomineChange}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
