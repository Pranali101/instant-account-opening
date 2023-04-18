import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import Tesseract, { createWorker } from "tesseract.js";
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
import { auth, db } from "../../firebase/firebase.config";
import { previewData } from "next/dist/client/components/headers";

export default function Step5PanCard({ customerData, setCustomerData }) {
  const [selectedImage, setSelectedImage] = useState();
  const [textResult, setTextResult] = useState("");

  const collectionPan = query(
    collection(db, "pan-db"),
    where("panNo", "==", customerData.panNo)
  );

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
    setCustomerData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const getDataUser = async () => {
    await getDocs(collectionPan)
      .then((res) => {
        const panData = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        console.log("pan", panData);
        setCustomerData((prevData) => {
          return {
            ...prevData,
            ...panData[0],
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    getDataUser();
    toast.success("Verified successfully");
  };

  useEffect(() => {
    textResult &&
      setCustomerData((prevData) => {
        return {
          ...prevData,
          panNo: textResult,
        };
      });
  }, [textResult]);

  useEffect(() => {
    selectedImage && toast("Your Image is processing. Please Wait");
  }, [selectedImage]);

  useEffect(() => {
    selectedImage &&
      Tesseract.recognize(selectedImage, "eng")
        .then(({ data: { text } }) => {
          return text;
        })
        .then((text) => {
          console.log(text);
          const textSplit = text.split("\n");
          console.log(textSplit);
          setTextResult(
            textSplit[textSplit.length - 3].replaceAll(" ", "").slice(0, 10)
          );
        });
  }, [selectedImage]);

  return (
    <Box>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "28px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        {/* <Typography variant="body2">Enter the following details :</Typography> */}
        <br></br>
        <InputLabel required>Pan Number</InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="text"
            name="panNo"
            value={customerData.panNo}
            className="form-style"
            onChange={handleFormChange}
          />
          {/* <TextField
            sx={{ ml: "20px", background: "#2A3A8D20" }}
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleChangeImage}
          /> */}
        </Box>
      </Box>

      {/* <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          backgroundColor: "#2A3A8D",
          color: "#fff",
          p: "10px 20px",
          mt: "20px",
        }}
        disabled={!customerData.panNo}
      >
        Verify
      </Button> */}

      <Box>
        <InputLabel required>Full name as NSDL: </InputLabel>
        <TextField
          type="text"
          name="fullNameNSDL"
          value={customerData.fullNameNSDL}
          className="form-style-cust"
          disabled
          onChange={handleFormChange}
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
          name="fatherFullNameNSDL"
          value={customerData.fatherFullNameNSDL}
          className="form-style-cust"
          disabled
          onChange={handleFormChange}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
              cursor: "not-allowed",
            },
          }}
        />
        <InputLabel required>DOB name as NSDL: </InputLabel>
        <TextField
          type="text"
          name="DOBNSDL"
          value={customerData.DOBNSDL}
          className="form-style-cust"
          disabled
          onChange={handleFormChange}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
              cursor: "not-allowed",
            },
          }}
        />
      </Box>
    </Box>
  );
}

// import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
// import { useCallback, useEffect, useState, useRef } from "react";
// import Tesseract, { createWorker } from "tesseract.js";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { Toaster, toast } from "react-hot-toast";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import { auth, db } from "../../firebase/firebase.config";

// export default function Step5PanCard() {
//   const [formData, setFormData] = useState({
//     panNo: "",
//     phoneNo: "",
//     otp: "",
//   });
//   const [selectedImage, setSelectedImage] = useState();
//   const [textResult, setTextResult] = useState("");
//   const [userOtp, setUserOtp] = useState("");

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const [userFetchData, setUserFetchData] = useState();

//   const [showOtp, setShowOtp] = useState(false);

//   const collectionAadhaar = query(
//     collection(db, "adhar-db"),
//     where("UID", "==", formData.panNo)
//   );

//   const collectionEkyc = collection(db, "ekyc");

//   const handleChangeImage = (e) => {
//     if (e.target.files[0]) {
//       setSelectedImage(URL.createObjectURL(e.target.files[0]));
//     } else {
//       setSelectedImage(null);
//       setTextResult("");
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       return {
//         ...prevData,
//         [name]: value,
//       };
//     });
//   };

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             handleOTP();
//           },
//           "expired-callback": () => {},
//         },
//         auth
//       );
//     }
//   }

//   const handleOTP = () => {
//     setShowOtp(true);
//     onCaptchVerify();
//     const appVerifier = window.recaptchaVerifier;
//     const formatPh = "+91" + formData.phoneNo;
//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         toast("Check your phone for OTP");
//         window.confirmationResult = confirmationResult;
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
//   };

//   function onOTPVerify() {
//     window.confirmationResult
//       .confirm(formData.otp ? formData.otp : 0)
//       .then(async (res) => {
//         console.log("otpres", res);
//         setUserOtp(res._tokenResponse.idToken);
//       })
//       .catch((err) => {
//         toast.error("Please enter a valid OTP");
//       });
//   }

//   const getDataUser = async () => {
//     await getDocs(collectionAadhaar)
//       .then((res) => {
//         setUserFetchData(
//           res.docs.map((item) => {
//             return {
//               ...item.data(),
//               ref: item.id.slice(0, 5) + formData.phoneNo.slice(5, 8),
//               phoneNumber: formData.phoneNo,
//             };
//           })
//         );
//         return res.docs.map((item) => {
//           return {
//             ...item.data(),
//             ref: item.id.slice(0, 5) + formData.phoneNo.slice(5, 8),
//             phoneNumber: formData.phoneNo,
//           };
//         });
//       })
//       .then((data) => {
//         if (data) {
//           const userData = {
//             ref: data[0].ref,
//             UID: data[0].UID,
//             fullName: data[0].fullName,
//             DOB: data[0].DOB,
//             Gender: data[0].Gender,
//             phoneNo: data[0].phoneNumber,
//           };
//           toast("your pdf is Generated");
//           console.log(data);
//           addDoc(collectionEkyc, userData)
//             .then((res) => {
//               handleOpen();
//               setFormData({ panNo: null, phoneNo: null, otp: null });
//             })
//             .catch((err) => console.log(err));
//         } else {
//           toast.error("Please make sure aadhaar number is correct.");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const onSubmit = () => {
//     getDataUser();
//   };

//   const handleCloseBtn = () => {
//     handleClose();
//     setFormData({ panNo: "", phoneNo: "", otp: "" });
//     setSelectedImage();
//   };

//   console.log(userFetchData);

//   useEffect(() => {
//     textResult &&
//       setFormData((prevData) => {
//         return {
//           ...prevData,
//           panNo: Number(textResult),
//         };
//       });
//   }, [textResult]);

//   useEffect(() => {
//     selectedImage && toast("Your Image is processing. Please Wait");
//   }, [selectedImage]);

//   useEffect(() => {
//     selectedImage &&
//       Tesseract.recognize(selectedImage, "eng")
//         .then(({ data: { text } }) => {
//           return text;
//         })
//         .then((text) => {
//           console.log(text);
//           const textSplit = text.split("\n");
//           setTextResult(
//             textSplit[textSplit.length - 3].replaceAll(" ", "").slice(0, 12)
//           );
//         });
//   }, [selectedImage]);

//   return (
//     <Box sx={{ mt: "40px" }}>
//       <Toaster position="top-center" reverseOrder={true} />
//       <Box
//         sx={{
//           mt: "40px",
//           backgroundColor: "#fff",
//           borderRadius: "10px",
//         }}
//       >
//         <Typography variant="body2">Enter the following details :</Typography>
//         <br></br>
//         <InputLabel required>Pan Number</InputLabel>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <TextField
//             type="number"
//             name="panNo"
//             value={formData.panNo}
//             className="form-style"
//             onChange={handleFormChange}
//           />
//           <TextField
//             sx={{ ml: "20px", background: "#2A3A8D20" }}
//             type="file"
//             id="upload"
//             accept="image/*"
//             onChange={handleChangeImage}
//           />
//         </Box>
//         <InputLabel required>Mobile Number</InputLabel>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <TextField
//             type="number"
//             name="phoneNo"
//             className="form-style"
//             value={formData.phoneNo}
//             onChange={handleFormChange}
//           />
//           {!showOtp && <Button onClick={handleOTP}>Get OTP</Button>}
//         </Box>
//         <div id="recaptcha-container"></div>
//         {showOtp && formData.phoneNo && (
//           <Box>
//             <InputLabel required>Enter Otp</InputLabel>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <TextField
//                 type="number"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={handleFormChange}
//                 sx={{ width: "100px" }}
//               />
//               {!userOtp ? (
//                 <Button onClick={onOTPVerify}>Verify OTP</Button>
//               ) : (
//                 <Button
//                   sx={{ color: "green" }}
//                   startIcon={<CheckCircleOutlineIcon />}
//                 >
//                   Verified
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         )}
//       </Box>

//       <Button
//         variant="contained"
//         onClick={onSubmit}
//         sx={{
//           backgroundColor: "#2A3A8D",
//           color: "#fff",
//           p: "10px 20px",
//           mt: "20px",
//         }}
//         disabled={!formData.panNo || !userOtp}
//       >
//         Verify
//       </Button>
//     </Box>
//   );
// }
