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
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase.config";
import Pdf from "react-to-pdf";
import FormDownload from "../../components/FormDownload";

export default function cifId() {
  const router = useRouter();
  const CIF = router.query.cifId;
  const ref = useRef();

  const options = {
    orientation: "portrait",
    unit: "in",
    format: [16, 14],
  };

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
        <Box sx={{ mx: "auto", textAlign: "left" }}>
          <Typography variant="h6" sx={{ my: "10px" }}>
            Steps to follow:
          </Typography>
          <Typography variant="body1" sx={{ my: "10px", textAlign: "left" }}>
            1. Download the below form
          </Typography>

          <Typography variant="body1" sx={{ my: "10px", textAlign: "left" }}>
            2. Complete the form by signing in the designated area.
          </Typography>
          <Typography variant="body1" sx={{ my: "10px", textAlign: "left" }}>
            3. Once you've signed the form, upload the form.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Pdf targetRef={ref} options={options} scale={1} filename={`document`}>
          {({ toPdf }) => (
            <Button
              variant="contained"
              onClick={toPdf}
              sx={{
                backgroundColor: "#2A3A8D",
                color: "#fff",
                p: "10px 20px",
                mt: "20px",
              }}
            >
              Download Form
            </Button>
          )}
        </Pdf>
      </Box>
      <FormDownload accountData={accountData} reff={ref} wd={850} />
    </Box>
  );
}
