import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import Tesseract, { createWorker } from "tesseract.js";
import { auth, db } from "../firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import ReferencePDFGenerator from "./ReferencePDFGenerator";
import PDFPopup from "./PDFPopup";
import PancardVerify from "./CreateAccountSteps/PancardVerify";
import { uuid } from "uuidv4";

export const OCRAdhar = () => {
  const [formData, setFormData] = useState({
    UID: "",
    panNo: "",
    phoneNumber: "",
    otp: "",
  });
  const [customerDataPan, setCustomerDataPan] = useState({ panNo: "" });
  const [selectedImage, setSelectedImage] = useState();
  const [textResult, setTextResult] = useState("");
  const [userOtp, setUserOtp] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userFetchData, setUserFetchData] = useState();
  const [userFetchDataPan, setUserFetchDataPan] = useState([]);
  const [existsData, setExistsData] = useState();

  const [showOtp, setShowOtp] = useState(false);
  const unique_id = uuid();

  const collectionEkyCheck = query(
    collection(db, "ekyc"),
    where("UID", "==", Number(formData.UID))
  );

  const collectionAadhaar = query(
    collection(db, "adhar-db"),
    where("UID", "==", Number(formData.UID))
  );

  const collectionEkyc = collection(db, "ekyc");

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

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

  const handleOTP = () => {
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
    getExistsdata();
  }

  const getExistsdata = async () => {
    await getDocs(collectionEkyCheck)
      .then((res) => {
        setExistsData(
          res.docs.map((item) => {
            return {
              ...item.data(),
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const getDataUser = async () => {
    const randomNumber = Math.random() * 1000000000; // generate a random number
    const uniqueId = parseInt(randomNumber);
    await getDocs(collectionAadhaar)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
            phoneNumber: formData.phoneNumber,
          };
        });
        setUserFetchData(data[0]);
        return data;
      })
      .then((data) => {
        console.log(data, existsData);

        if (data) {
          const userData = {
            ...data[0],
            ref: `1${uniqueId}`,
          };

          toast("your pdf is Generated");
          console.log(data);
          if (existsData.length === 0) {
            setUserFetchData((prevData) => {
              return {
                ...prevData,
                ref: `1${uniqueId}`,
              };
            });
            addDoc(collectionEkyc, userData)
              .then((res) => {
                handleOpen();
                setFormData({ UID: null, phoneNumber: null, otp: null });
              })
              .catch((err) => console.log(err));
          } else {
            handleOpen();
            setFormData({ UID: null, phoneNumber: null, otp: null });
          }
        } else {
          toast.error("Please make sure aadhaar number is correct.");
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    getDataUser();
  };

  const getAdharDetails = async () => {
    await getDocs(collectionAadhaar)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        const dataSpread = data[0];
        setFormData(dataSpread);
        if (dataSpread.panNo) {
          toast.success("Your pan is linked with aadhaar");
        } else {
          toast.error("Your pan is not linked with aadhaar");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCloseBtn = () => {
    handleClose();
    setFormData({ UID: "", phoneNumber: "", otp: "" });
    setSelectedImage();
  };

  console.log(userFetchData);

  useEffect(() => {
    formData.UID && getAdharDetails();
  }, [formData.UID]);

  useEffect(() => {
    textResult &&
      setFormData((prevData) => {
        return {
          ...prevData,
          UID: Number(textResult),
        };
      });
  }, [textResult]);

  useEffect(() => {
    selectedImage && toast("Your Image is processing. Please Wait");
  }, [selectedImage]);

  let totalMilliseconds = 0;
  var stopwatchInterval;
  function startStopwatch() {
    stopwatchInterval = setInterval(function () {
      totalMilliseconds += 10;

      var date = new Date(totalMilliseconds);
      var minutes = date.getUTCMinutes().toString().padStart(2, "0");
      var seconds = date.getUTCSeconds().toString().padStart(2, "0");
      var milliseconds = (date.getUTCMilliseconds() / 10)
        .toFixed(0)
        .toString()
        .padStart(2, "0");

      console.log("m:", minutes, "s:", seconds, "ms:", milliseconds);
    }, 10);
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
  }

  useEffect(() => {
    selectedImage &&
      Tesseract.recognize(selectedImage, "eng")
        .then(({ data: { text } }) => {
          return text;
        })
        .then((text) => {
          console.log(text);
          // stopStopwatch();
          const textSplit = text.split("\n");
          console.log(textSplit);
          const checkAdhar =
            textSplit[textSplit.length - 3].length > 10
              ? textSplit.length - 3
              : textSplit.length - 2;
          setTextResult(textSplit[checkAdhar].replaceAll(" ", "").slice(0, 12));
        });
  }, [selectedImage]);

  return (
    <Box sx={{ mt: "40px" }}>
      <Typography variant="h3">EKYC Certificate Generation</Typography>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Typography variant="body2">Enter the following details :</Typography>
        <br></br>
        <InputLabel required>Aadhaar Number</InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            disabled
            type="number"
            name="UID"
            value={formData.UID}
            className="form-style"
            onChange={handleFormChange}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
                cursor: "not-allowed",
              },
            }}
          />
          <TextField
            sx={{ ml: "20px", background: "#2A3A8D20" }}
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </Box>
        <InputLabel required>Pan Number</InputLabel>
        <TextField
          disabled
          type="text"
          name="panNo"
          value={formData.panNo}
          className="form-style"
          onChange={handleFormChange}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
              cursor: "not-allowed",
            },
          }}
        />
        <InputLabel required>Mobile Number</InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="number"
            name="phoneNumber"
            className="form-style"
            value={formData.phoneNumber}
            onChange={handleFormChange}
          />
          {!showOtp && <Button onClick={handleOTP}>Get OTP</Button>}
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
      <PDFPopup
        existsData={existsData}
        userFetchData={userFetchData}
        open={open}
        handleClose={handleClose}
        handleCloseBtn={handleCloseBtn}
      />
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          backgroundColor: "#2A3A8D",
          color: "#fff",
          p: "10px 20px",
          mt: "20px",
        }}
        disabled={!formData.UID || !userOtp}
      >
        Submit
      </Button>
    </Box>
  );
};
