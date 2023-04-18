import { Box, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config";
import Step5PanCard from "./Step5PanCard";

export default function Step1CustomerDetails({
  customerData,
  setCustomerData,
}) {
  const router = useRouter();
  const ref = router.query.instantAccountId;

  const collectionEKYC = query(
    collection(db, "ekyc"),
    where("ref", "==", String(ref))
  );
  const collectionPan = query(
    collection(db, "pan-db"),
    where("panNo", "==", customerData.panNo)
  );

  const getDataUser = () => {
    getDocs(collectionEKYC)
      .then((res) => {
        const dataRes = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setCustomerData((prevData) => {
          return {
            ...prevData,
            ...dataRes[0],
          };
        });
      })
      .catch((err) => console.log(err));
  };
  console.log(customerData);

  const getDataUserPan = async () => {
    await getDocs(collectionPan)
      .then((res) => {
        const dataRes = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        console.log("data", dataRes);
        setCustomerData((prevData) => {
          return {
            ...prevData,
            ...dataRes[0],
          };
        });
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataUser();
    getDataUserPan();
  }, [ref, customerData.panNo]);

  return (
    <Box sx={{ mt: "40px" }}>
      {customerData && (
        <Grid container>
          <Grid lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <InputLabel required>Full Name</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="fullName"
                value={customerData?.fullName}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Mobile number</InputLabel>
              <TextField
                type="number"
                className="form-style-cust"
                name="phoneNumber"
                value={customerData?.phoneNumber}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>DOB</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="DOB"
                value={customerData?.DOB}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Gender</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="Gender"
                value={customerData?.Gender}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Address</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="address"
                value={customerData?.address}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>City</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="city"
                value={customerData?.city}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>State</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="state"
                value={customerData?.state}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Pincode</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                name="pincode"
                value={customerData?.pincode}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <InputLabel required>Aadhaar number</InputLabel>
              <TextField
                type="number"
                className="form-style-cust"
                disabled
                name="UID"
                value={customerData?.UID}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Ref no</InputLabel>
              <TextField
                type="text"
                className="form-style-cust"
                disabled
                name="ref"
                value={customerData?.ref}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>marital Status</InputLabel>
              <TextField
                type="text"
                required
                className="form-style-cust"
                name="maritalStatus"
                value={customerData?.maritalStatus}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Pan Number</InputLabel>
              <TextField
                type="text"
                required
                disabled
                className="form-style-cust"
                name="panNo"
                value={customerData?.panNo}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Full name as NSDL:</InputLabel>
              <TextField
                type="text"
                required
                disabled
                className="form-style-cust"
                name="fullNameNSDL"
                value={customerData?.fullNameNSDL}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>Father name as NSDL: </InputLabel>
              <TextField
                type="text"
                required
                disabled
                className="form-style-cust"
                name="fatherFullNameNSDL"
                value={customerData?.fatherFullNameNSDL}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
              <InputLabel required>DOB name as NSDL:</InputLabel>
              <TextField
                type="text"
                required
                disabled
                className="form-style-cust"
                name="DOBNSDL"
                value={customerData?.DOBNSDL}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    cursor: "not-allowed",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
