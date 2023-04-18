import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase.config";
import FormDownload from "../../../components/FormDownload";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import CKYCPopup from "../../../components/CKYCPopup";

export default function Accounts() {
  const collectionAcc = collection(db, "accounts");
  const router = useRouter();

  const [accountData, setAccountData] = useState();
  const [singleAccountData, setSingleAccountData] = useState();
  const [showForm, setShowForm] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAccounts = async () => {
    await getDocs(collectionAcc)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        setAccountData(data);
      })
      .catch((err) => console.log(err));
  };

  console.log(accountData);

  const accpetFormUpdate = (id, appr) => {
    const docToUpdate = doc(db, "accounts", id);
    updateDoc(docToUpdate, {
      managerStatus: appr,
    })
      .then(() => {
        router.push("/ManagerAdmin/accounts", { shallow: true });
        setShowForm(false);
        toast.success("Success");
      })
      .catch((err) => toast.error(err));
  };
  console.log("ss1", singleAccountData);

  useEffect(() => {
    getAccounts();
  }, [showForm]);
  return (
    <Box sx={{ mt: "40px", ml: "-100px", mr: "-100px" }}>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        {!showForm && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="left">CIF</TableCell>
                  <TableCell align="left">REF</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">EKYC Detail</TableCell>
                  <TableCell align="left">Preview</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountData?.map((data) => {
                  return (
                    <TableRow>
                      <TableCell align="left">{data.fullName}</TableCell>
                      <TableCell align="left">{data.CIF}</TableCell>
                      <TableCell align="left">{data.ref}</TableCell>
                      <TableCell align="left">{data.managerStatus}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            handleOpen();
                            setSingleAccountData(data);
                          }}
                        >
                          Preview EKYC
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            setShowForm(true);
                            setSingleAccountData(data);
                          }}
                        >
                          Preview Form
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {showForm && (
          <Box>
            <Grid container>
              <Grid lg={6}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    color: "#2A3A8D",
                    borderBottom: "1px solid #2A3A8D",
                  }}
                >
                  Online Filled
                </Typography>
                <FormDownload accountData={singleAccountData} wd={650} />
              </Grid>
              <Grid lg={6}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    color: "#2A3A8D",
                    borderBottom: "1px solid #2A3A8D",
                  }}
                >
                  Uploaded Signed
                </Typography>
                <img
                  src={singleAccountData.uploadFile}
                  style={{ width: "100%", height: "auto", marginTop: "20px" }}
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() =>
                  accpetFormUpdate(singleAccountData.id, "Approved")
                }
                sx={{
                  backgroundColor: "#2A3A8D",
                  color: "#fff",
                  p: "10px 20px",
                  mt: "20px",
                  mr: "10px",
                }}
              >
                Accept this form
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  accpetFormUpdate(singleAccountData.id, "Rejected")
                }
                sx={{
                  backgroundColor: "#D7301A",
                  color: "#fff",
                  p: "10px 20px",
                  mt: "20px",
                }}
              >
                Reject this form
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <CKYCPopup
        open={open}
        handleClose={handleClose}
        singleAccountData={singleAccountData}
      />
    </Box>
  );
}
