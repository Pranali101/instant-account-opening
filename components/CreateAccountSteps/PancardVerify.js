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

export default function PancardVerify({ customerDataPan, setCustomerDataPan }) {
  const [selectedImage, setSelectedImage] = useState();
  const [textResult, setTextResult] = useState("");

  const collectionPan = query(
    collection(db, "pan-db"),
    where("panNo", "==", customerDataPan.panNo)
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
    setCustomerDataPan((prevData) => {
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
        setCustomerDataPan((prevData) => {
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
      setCustomerDataPan((prevData) => {
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
        <InputLabel required>Pan Number</InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="text"
            name="panNo"
            value={customerDataPan.panNo}
            className="form-style"
            onChange={handleFormChange}
          />
          <TextField
            sx={{ ml: "20px", background: "#2A3A8D20" }}
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </Box>
      </Box>
    </Box>
  );
}
