import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { Toaster, toast } from "react-hot-toast";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function CreateAccountForm() {
  const [formData, setFormData] = useState({
    ref: "",
    phoneNumber: "",
    otp: "",
  });

  const [showOtp, setShowOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  const router = useRouter();

  const collectionEkyc = query(
    collection(db, "ekyc"),
    where("ref", "==", formData.ref)
  );

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleOTP();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const getOTP = () => {
    setShowOtp(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + formData.phoneNumber;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        toast("Check your phone for OTP");
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  function onOTPVerify() {
    window.confirmationResult
      .confirm(formData.otp ? formData.otp : 0)
      .then(async (res) => {
        console.log("otpres", res);
        setUserOtp(res._tokenResponse.idToken);
      })
      .catch((err) => {
        toast.error("Please enter a valid OTP");
      });
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const getDataUser = async () => {
    await getDocs(collectionEkyc)
      .then((res) => {
        return res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
      })
      .then((data) => {
        console.log("first", data[0].phoneNumber, formData.phoneNumber);
        if (data[0].phoneNumber === formData.phoneNumber) {
          router.push(`/InstantAccount/${formData.ref}`);
        } else {
          toast.error("Reference no details doesn't match with phone number");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    getDataUser();
  };

  return (
    <Box sx={{ mt: "40px" }}>
      <Typography variant="h3">Create Account</Typography>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <InputLabel>Reference Number</InputLabel>
        <TextField
          type="text"
          name="ref"
          value={formData.ref}
          className="form-style"
          onChange={handleFormChange}
        />
        <InputLabel>Mobile Number</InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="number"
            name="phoneNumber"
            className="form-style"
            value={formData.phoneNumber}
            onChange={handleFormChange}
          />
          {!showOtp && <Button onClick={getOTP}>Get OTP</Button>}
        </Box>
        <div id="recaptcha-container"></div>
        {showOtp && formData.phoneNumber && (
          <Box>
            <InputLabel>Enter Otp</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                type="number"
                name="otp"
                value={formData.otp}
                onChange={handleFormChange}
                sx={{ width: "100px" }}
              />
              {!userOtp ? (
                <Button onClick={onOTPVerify}>Verify OTP</Button>
              ) : (
                <Button
                  sx={{ color: "green" }}
                  startIcon={<CheckCircleOutlineIcon />}
                >
                  Verified
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#2A3A8D",
          color: "#fff",
          p: "10px 20px",
          mt: "20px",
        }}
        disabled={!formData.ref || !userOtp}
      >
        Submit
      </Button>
    </Box>
  );
}
