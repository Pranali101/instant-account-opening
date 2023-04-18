import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { OCRAdhar } from "../components/OCRAdhar";
import { Navbar } from "../components/Navbar";
import { Box, Button, TextField } from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });

  const collectionAgentDb = collection(db, "agent-login");

  const onLogin = () => {
    getDocs(collectionAgentDb)
      .then((res) => {
        return res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
      })
      .then((data) => {
        console.log(data, loginForm);
        if (
          data[0].userName === loginForm.userName &&
          data[0].password === loginForm.password
        ) {
          localStorage.setItem("auth", "user");
          router.push("/ekyc");
        } else {
          toast.error("please enter a valid username and password");
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "40px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "40px 20px",
          mx: "30%",
          textAlign: "center",
        }}
      >
        <TextField
          label="Username"
          type="text"
          name="userName"
          value={loginForm.userName}
          onChange={(e) =>
            setLoginForm((prevData) => {
              return {
                ...prevData,
                userName: e.target.value,
              };
            })
          }
          variant="outlined"
          sx={{ mb: "20px", width: "300px" }}
        />
        <br></br>
        <TextField
          type="password"
          label="password"
          name="password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm((prevData) => {
              return {
                ...prevData,
                password: e.target.value,
              };
            })
          }
          variant="outlined"
          sx={{ mb: "20px", width: "300px" }}
        />
        <br></br>
        <Button
          variant="contained"
          onClick={onLogin}
          sx={{
            backgroundColor: "#2A3A8D",
            color: "#fff",
            p: "10px 20px",
            mt: "20px",
          }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}
