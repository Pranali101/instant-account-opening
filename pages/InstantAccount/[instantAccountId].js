import {
  Box,
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config";
import Step1CustomerDetails from "../../components/CreateAccountSteps/Step1CustomerDetails";
import Step2CKYC from "../../components/CreateAccountSteps/Step2CKYC";
import Step3NomieDetails from "../../components/CreateAccountSteps/Step3NomieDetails";
import Step4AtmCard from "../../components/CreateAccountSteps/Step4AtmCard";
export default function InstantAccountId() {
  const router = useRouter();
  const ref = router.query.instantAccountId;

  const [customerData, setCustomerData] = useState({ panNo: "" });
  const [ckycData, setCkycData] = useState({
    kycDoc: "aadhaar",
    addressType: "business",
  });
  const [nomineData, setNomineData] = useState({ isNomine: "no" });
  const [atmData, setAtmData] = useState({ isAtmCard: "no" });

  const [value, setValue] = useState(1);

  const collectionAccCreate = collection(db, "account-create");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitForm = () => {
    const data = {
      ...customerData,
      ...ckycData,
      ...nomineData,
      ...atmData,
      managerStatus: "Pending",
    };

    console.log(data);
    addDoc(collectionAccCreate, data)
      .then((res) => {
        console.log(res);
        router.push(`/Validate/${ref}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ mt: "40px" }}>
      <Typography variant="h3">Instant Account Customer Enrollment</Typography>
      <Box
        sx={{
          mt: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Box sx={{ p: "20px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                sx={{
                  border: "1px solid #000000",
                  borderRadius: "5px",
                  p: "6px",
                  "& .MuiButtonBase-root.Mui-selected": {
                    background: "#2A3A8D",
                    borderRadius: "5px",
                    color: "#fff",
                  },
                  "&.MuiTabs-root": { minHeight: "12px" },
                  "& .MuiButtonBase-root.MuiTab-root": {
                    p: "6px",
                    minHeight: "12px",
                  },
                  "& .MuiTabs-flexContainer": {
                    justifyContent: { lg: "space-between", xs: "center" },
                    flexWrap: { xs: "wrap" },
                  },
                }}
              >
                <Tab label="Customer Details" value={1} />
                <Tab label="CKYC" value={2} />
                <Tab label="Nomine Details" value={3} />
                <Tab label="ATM Card" value={4} />
              </TabList>
            </Box>
            <TabPanel sx={{ p: "0px" }} value={1}>
              <Step1CustomerDetails
                customerData={customerData}
                setCustomerData={setCustomerData}
              />
            </TabPanel>
            <TabPanel sx={{ p: "0px" }} value={2}>
              <Step2CKYC ckycData={ckycData} setCkycData={setCkycData} />
            </TabPanel>
            <TabPanel sx={{ p: "0px" }} value={3}>
              <Step3NomieDetails
                nomineData={nomineData}
                setNomineData={setNomineData}
              />
            </TabPanel>
            <TabPanel sx={{ p: "0px" }} value={4}>
              <Step4AtmCard setAtmData={setAtmData} atmData={atmData} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", my: "20px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2A3A8D",
            color: "#fff",
            p: "10px 20px",
            mt: "20px",
          }}
          onClick={onSubmitForm}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
