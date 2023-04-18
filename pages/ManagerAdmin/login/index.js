import Head from "next/head";
import Image from "next/image";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { db } from "../../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

export default function Login() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });

  const collectionManagerDb = collection(db, "manager-login");

  const onLogin = () => {
    getDocs(collectionManagerDb)
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
          localStorage.setItem("auth", "admin");

          router.push("/ManagerAdmin/accounts");
        } else {
          toast.error("please enter a valid username and password");
        }
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <Typography variant="h4" sx={{ textAlign: "center", mt: "20px" }}>
        Admin Login
      </Typography>
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
