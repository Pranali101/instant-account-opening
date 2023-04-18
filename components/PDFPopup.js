import {
  Box,
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import Pdf from "react-to-pdf";
import CancelIcon from "@mui/icons-material/Cancel";
export default function PDFPopup({
  open,
  handleClose,
  userFetchData,
  handleCloseBtn,
  existsData,
}) {
  const ref = useRef();

  const options = {
    orientation: "portrait",
    unit: "in",
    format: [4.8, 4],
  };

  return (
    <Dialog open={open} onClose={handleCloseBtn}>
      <Box sx={{ textAlign: "right" }}>
        <Button startIcon={<CancelIcon onClick={handleCloseBtn} />}></Button>
      </Box>
      {userFetchData && (
        <Box sx={{ p: "40px" }}>
          <Box ref={ref} sx={{ p: "10px", textAlign: "center" }}>
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
                    <TableCell align="left">
                      {userFetchData?.ref
                        ? userFetchData?.ref
                        : existsData[0].ref}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Aadhaar Number:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{userFetchData?.UID}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Pan Number:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{userFetchData?.panNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Full Name:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {userFetchData?.fullName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Mobile Number:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {userFetchData?.phoneNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Gender:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{userFetchData?.Gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>DOB:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{userFetchData?.DOB}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2">
              please make use of reference number to create account.
            </Typography>
          </Box>

          <Pdf
            targetRef={ref}
            options={options}
            scale={1}
            filename={`${userFetchData?.fullName} ${userFetchData?.ref}`}
          >
            {({ toPdf }) => <Button onClick={toPdf}>Download PDF</Button>}
          </Pdf>
        </Box>
      )}
    </Dialog>
  );
}
