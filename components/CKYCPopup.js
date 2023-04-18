import {
  Box,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export default function CKYCPopup({ open, handleClose, singleAccountData }) {
  console.log("ss", singleAccountData);
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ p: "40px" }}>
        <Typography variant="h5">EKYC Certificate</Typography>
        <TableContainer component={Paper} sx={{ mx: "auto" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>Reference Number:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">{singleAccountData?.ref}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>Aadhaar Number:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">{singleAccountData?.UID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>Pan Number:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">{singleAccountData?.panNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>Full Name:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {singleAccountData?.fullName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>Mobile Number:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {singleAccountData?.phoneNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>Gender:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">{singleAccountData?.Gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="body1">
                    <b>DOB:</b>
                  </Typography>
                </TableCell>
                <TableCell align="left">{singleAccountData?.DOB}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Dialog>
  );
}
