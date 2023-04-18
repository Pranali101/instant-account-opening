import {
  Box,
  Button,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import ReceiptDownload from "../../components/ReceiptDownload";
import Pdf from "react-to-pdf";
import FormDownload from "../../components/FormDownload";

export default function cifID() {
  const ref = useRef();
  const router = useRouter();
  const CIF = router.query.cifId;

  const options = {
    orientation: "landscape",
    unit: "in",
    format: [7, 7],
  };

  const [amount, setAmount] = useState(0);
  const [switchCont, setSwitchCont] = useState(false);
  const [accountData, setAccountData] = useState();

  const collectionAcc = query(
    collection(db, "accounts"),
    where("CIF", "==", String(CIF))
  );

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

  const onSubmitAmount = (toPdf) => {
    toPdf();
    router.push(`/GeneratedAccount/${CIF}`);
  };
  useEffect(() => {
    getAccountDetails();
  }, [CIF]);

  return (
    <Box sx={{ mt: "40px" }}>
      {!switchCont && (
        <Box>
          <Typography variant="h4">Inital Deposit Amount</Typography>
          <Box
            sx={{
              mt: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              p: "20px",
              textAlign: "center",
            }}
          >
            <InputLabel required>Enter Amount</InputLabel>
            <TextField
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-style-cust"
            />

            <Typography
              variant="body1"
              sx={{
                mt: "10px",
                color: "#2A3A8D",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <InfoIcon size={20} />
              Minimum amount of Inital deposit is Rs.0
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: "10px",
                color: "#2A3A8D",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <InfoIcon size={20} />
              Minimum amount of Inital deposit is Rs.1000
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: "10px",
                color: "#2A3A8D",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <InfoIcon size={20} />
              For zero balance account, please enter Rs.0
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={() => setSwitchCont(true)}
              sx={{
                backgroundColor: "#2A3A8D",
                color: "#fff",
                p: "10px 20px",
                mt: "20px",
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      )}
      {switchCont && (
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Initial Deposit Confirmation
          </Typography>
          <Box
            sx={{
              mt: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              p: "20px",
            }}
          >
            <TableContainer component={Paper} sx={{ mx: "auto", width: 650 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Customer Name:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left"> {accountData?.fullName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>CIF Number:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{accountData?.CIF}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Initial Deposit Amount: </b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left"> {amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Enrollment Charges: </b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="body1">
                        <b>Total Amount:</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Pdf
              targetRef={ref}
              options={options}
              scale={1}
              filename={`document`}
            >
              {({ toPdf }) => (
                <Button
                  variant="contained"
                  onClick={() => onSubmitAmount(toPdf)}
                  sx={{
                    backgroundColor: "#2A3A8D",
                    color: "#fff",
                    p: "10px 20px",
                    mt: "20px",
                  }}
                >
                  Submit
                </Button>
              )}
            </Pdf>
            <Box sx={{ opacity: 0, textAlign: "left" }}>
              <ReceiptDownload CIF={CIF} reff={ref} amount={amount} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
