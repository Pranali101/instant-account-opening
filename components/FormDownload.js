import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function FormDownload({ accountData, reff, wd }) {
  return (
    <Box>
      <Box
        sx={{
          mt: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
        ref={reff}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "left", mx: "auto", width: wd, my: "30px" }}
        >
          Customer Details
        </Typography>
        <TableContainer component={Paper} sx={{ mx: "auto", width: wd }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <b>CIF</b>
                </TableCell>
                <TableCell align="left">{accountData?.CIF}</TableCell>
                <TableCell align="left">
                  <b>Reference Number</b>
                </TableCell>
                <TableCell align="left">{accountData?.ref}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <b>First Name</b>
                </TableCell>
                <TableCell align="left">{accountData?.fullName}</TableCell>
                <TableCell align="left">
                  <b>Last Name</b>
                </TableCell>
                <TableCell align="left">{accountData?.lastName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>Aadhaar Number</b>
                </TableCell>
                <TableCell align="left">{accountData?.UID}</TableCell>
                <TableCell align="left">
                  <b>Pan Number</b>
                </TableCell>
                <TableCell align="left">{accountData?.panNo}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>DOB</b>
                </TableCell>
                <TableCell align="left">{accountData?.DOB}</TableCell>
                <TableCell align="left">
                  <b>Gender</b>
                </TableCell>
                <TableCell align="left">{accountData?.Gender}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>Address </b>
                </TableCell>
                <TableCell align="left">{accountData?.address}</TableCell>
                <TableCell align="left">
                  <b>City</b>
                </TableCell>
                <TableCell align="left">{accountData?.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <b>State</b>
                </TableCell>
                <TableCell align="left">{accountData?.state}</TableCell>
                <TableCell align="left">
                  <b>Pin Code</b>
                </TableCell>
                <TableCell align="left">{accountData?.pincode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <b>Marital Status </b>
                </TableCell>
                <TableCell align="left">{accountData?.maritalStatus}</TableCell>
                <TableCell align="left">
                  <b>Full name as NSDL</b>
                </TableCell>
                <TableCell align="left">{accountData?.fullNameNSDL}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <b>Father Full Name as NSDL </b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.fatherFullNameNSDL}
                </TableCell>
                <TableCell align="left">
                  <b>DOB name as NSDL</b>
                </TableCell>
                <TableCell align="left">{accountData?.DOBNSDL}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h4"
          sx={{ textAlign: "left", mx: "auto", width: wd, my: "20px" }}
        >
          CKYC Details
        </Typography>
        <TableContainer component={Paper} sx={{ mx: "auto", width: wd }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <b>Father Full Name </b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.fatherFullNameCkyc}
                </TableCell>
                <TableCell align="left">
                  <b>Mother Full Name</b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.motherFullNameCkyc}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <b>KYC Document Type</b>
                </TableCell>
                <TableCell align="left">{accountData?.kycDoc}</TableCell>
                <TableCell align="left">
                  <b>Address Type</b>
                </TableCell>
                <TableCell align="left">{accountData?.addressType}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>Address Proof</b>
                </TableCell>
                <TableCell align="left">{accountData?.addressProof}</TableCell>
                <TableCell align="left">
                  <b>Address</b>
                </TableCell>
                <TableCell align="left">{accountData?.addressCkyc}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>CKYC State</b>
                </TableCell>
                <TableCell align="left">{accountData?.ckycState}</TableCell>
                <TableCell align="left">
                  <b>CKYC Country</b>
                </TableCell>
                <TableCell align="left">{accountData?.ckycCountry}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>Pin Code </b>
                </TableCell>
                <TableCell align="left">{accountData?.ckycPinCode}</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h4"
          sx={{ textAlign: "left", mx: "auto", width: wd, my: "20px" }}
        >
          Nomine Details
        </Typography>
        <TableContainer component={Paper} sx={{ mx: "auto", width: wd }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <b>Nomine First Name </b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.nomineFirstName}
                </TableCell>
                <TableCell align="left">
                  <b>Nomie Middle Name</b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.nomineMiddleName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <b>Nomine Last Name</b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.nomineLastName}
                </TableCell>
                <TableCell align="left">
                  <b>Nomine Gender</b>
                </TableCell>
                <TableCell align="left">{accountData?.nomineGender}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>Nomine Aadhaar number </b>
                </TableCell>
                <TableCell align="left">{accountData?.UID}</TableCell>
                <TableCell align="left">
                  <b>Relationship</b>
                </TableCell>
                <TableCell align="left">
                  {accountData?.nomineRelationship}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <b>Nomine DOB</b>
                </TableCell>
                <TableCell align="left">{accountData?.DOB}</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h4"
          sx={{ textAlign: "left", mx: "auto", width: wd, my: "20px" }}
        >
          ATM Card Details
        </Typography>
        <TableContainer component={Paper} sx={{ mx: "auto", width: wd }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <b>Name to pe printed on ATM</b>
                </TableCell>
                <TableCell align="left">{accountData?.printATMname}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <TableContainer component={Paper} sx={{ mx: "auto", width: wd }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <b>Your Signature</b>
                </TableCell>
                <TableCell align="left">
                  <Box sx={{ border: "1px solid #000", padding: "20px" }}></Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
