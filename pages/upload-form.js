import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { db, storage } from "../firebase/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function UploadForm() {
  const [selectedImage, setSelectedImage] = useState({});
  const [accountData, setAccountData] = useState();

  const [formData, setFormData] = useState();

  const collectionAcc = query(
    collection(db, "accounts"),
    where("ref", "==", String(formData))
  );

  console.log("res", formData);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  const onSubmit = () => {
    const storageRef = ref(storage, selectedImage?.name);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    const docToUpdate = doc(db, "accounts", accountData.id);
    const data = {
      ref: formData.ref,
      upl: selectedImage,
    };

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        toast.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateDoc(docToUpdate, {
            uploadFile: downloadURL,
          }).then(() => {
            toast.success("Your file is successfully uploaded");
            toast("Your document is under process");
          });
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const getAccountDetails = async () => {
    console.log("first");
    await getDocs(collectionAcc)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        setAccountData(data[0]);
      })

      .catch((err) => console.log(err));
  };

  console.log(accountData);

  useEffect(() => {
    getAccountDetails();
  }, [formData]);

  console.log(formData);
  return (
    <Box sx={{ mt: "40px" }}>
      <Typography variant="h3">Upload Document</Typography>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <InputLabel required>Upload signed document</InputLabel>
        <TextField
          sx={{ mb: "20px", background: "#2A3A8D20" }}
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleChangeImage}
        />
        <InputLabel required>Enter Reference Number</InputLabel>
        <TextField
          type="text"
          name="ref"
          value={formData}
          className="form-style"
          onChange={(e) => setFormData(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          backgroundColor: "#2A3A8D",
          color: "#fff",
          p: "10px 20px",
          mt: "20px",
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
