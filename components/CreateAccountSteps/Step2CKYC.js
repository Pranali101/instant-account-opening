import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function Step2CKYC({ ckycData, setCkycData }) {
  const handleCkycChange = (e) => {
    const { name, value } = e.target;
    setCkycData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  return (
    <Box sx={{ mt: "40px" }}>
      <Grid container>
        <Grid lg={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel required>Father Full Name</InputLabel>
            <TextField
              type="text"
              className="form-style-cust"
              name="fatherFullNameCkyc"
              value={ckycData.fatherFullNameCkyc}
              onChange={handleCkycChange}
            />
            <InputLabel required>Mother Full Name</InputLabel>
            <TextField
              type="text"
              className="form-style-cust"
              name="motherFullNameCkyc"
              value={ckycData.motherFullNameCkyc}
              onChange={handleCkycChange}
            />
            <InputLabel required>KYC Document Type</InputLabel>
            <Select
              className="form-style-cust"
              required
              name="kycDoc"
              value={ckycData.kycDoc}
              onChange={handleCkycChange}
            >
              <MenuItem value="aadhaar">Aadhaar</MenuItem>
              <MenuItem value="pan">Pan</MenuItem>
            </Select>
            <InputLabel required>CKYC State</InputLabel>
            <TextField
              type="text"
              className="form-style-cust"
              name="ckycState"
              value={ckycData.ckycState}
              onChange={handleCkycChange}
            />
            <InputLabel required>CKYC Country</InputLabel>
            <TextField
              type="text"
              className="form-style-cust"
              name="ckycCountry"
              value={ckycData.ckycCountry}
              onChange={handleCkycChange}
            />
          </Box>
        </Grid>
        <Grid lg={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel required>Address Type</InputLabel>
            <Select
              className="form-style-cust"
              required
              name="addressType"
              value={ckycData.addressType}
              onChange={handleCkycChange}
            >
              <MenuItem value="business">Residential or Business</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </Select>
            <InputLabel required>Address Proof Number</InputLabel>
            <TextField
              type="number"
              className="form-style-cust"
              name="addressProof"
              value={ckycData.addressProof}
              onChange={handleCkycChange}
            />
            <InputLabel required>Address</InputLabel>
            <TextField
              type="text"
              className="form-style-cust"
              name="addressCkyc"
              value={ckycData.addressCkyc}
              onChange={handleCkycChange}
            />
            <InputLabel required>Pin Code</InputLabel>
            <TextField
              type="number"
              className="form-style-cust"
              name="ckycPinCode"
              value={ckycData.ckycPinCode}
              onChange={handleCkycChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
