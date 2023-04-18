import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function Step4AtmCard({ atmData, setAtmData }) {
  const handleAtmChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAtmData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  return (
    <Box sx={{ mt: "40px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl>
          <FormLabel>ATM Card Required</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              name="isAtmCard"
              value="yes"
              control={
                <Radio
                  checked={atmData.isAtmCard === "yes"}
                  onChange={handleAtmChange}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              name="isAtmCard"
              value="no"
              control={
                <Radio
                  checked={atmData.isAtmCard === "no"}
                  onChange={handleAtmChange}
                />
              }
              label="No"
            />
          </RadioGroup>
        </FormControl>
        <br></br>
        {atmData.isAtmCard === "yes" && (
          <Box>
            <InputLabel required>Name to pe printed on ATM </InputLabel>
            <TextField
              type="text"
              className="form-style-cust"
              name="printATMname"
              value={atmData.printATMname}
              onChange={handleAtmChange}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
