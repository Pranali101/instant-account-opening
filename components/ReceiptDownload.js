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
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";

export default function ReceiptDownload({ CIF, reff, amount }) {
  const router = useRouter();

  const [accountData, setAccountData] = useState();

  const collectionAcc = query(
    collection(db, "accounts"),
    where("CIF", "==", String(CIF))
  );

  const printPage = () => {
    window.print();
  };

  const getAccountDetails = async () => {
    await getDocs(collectionAcc)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setAccountData(data[0]);
      })

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAccountDetails();
  }, [CIF]);

  return (
    <Box>
      <Box
        sx={{
          mt: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Box ref={reff}>
          <Typography variant="h6" sx={{ my: "10px", ml: "10px" }}>
            Receipt of the enrolled account
          </Typography>
          <TableContainer component={Paper} sx={{ width: 650 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <b>Reference Number</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.ref}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>CIF Number</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.CIF}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Account Number</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.accId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Amount Deposited</b>
                  </TableCell>
                  <TableCell align="left">{amount}.Rs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>First Name</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.firstName}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">
                    <b>Last Name </b>
                  </TableCell>
                  <TableCell align="left">{accountData?.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Full Name</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Address</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Date Of Birth </b>
                  </TableCell>
                  <TableCell align="left">{accountData?.DOB}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Father Name </b>
                  </TableCell>
                  <TableCell align="left">
                    {accountData?.fatherFullNameCkyc}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Gender </b>
                  </TableCell>
                  <TableCell align="left">{accountData?.Gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <b>Identification details</b>
                  </TableCell>
                  <TableCell align="left">{accountData?.UID}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={printPage}
          sx={{
            backgroundColor: "#2A3A8D",
            color: "#fff",
            p: "10px 20px",
            mt: "20px",
          }}
        >
          print
        </Button>
      </Box>
    </Box>
  );
}
