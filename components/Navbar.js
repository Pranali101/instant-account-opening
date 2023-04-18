import {
  AppBar,
  Box,
  Button,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const pages = [
    { name: "Home", url: "/" },
    { name: "EKYC", url: "/ekyc" },
    { name: "Create Account", url: "/createaccount" },
    { name: "Upload", url: "/upload-form" },
  ];

  const [auth, setAuth] = useState();

  const logout = () => {
    localStorage.setItem("auth", "");
    router.push("/");
    setAuth("");
  };

  useEffect(() => {
    setAuth(localStorage.getItem("auth"));
  }, [router]);

  return (
    <Box sx={{ flexGrow: 1, p: 0, backgroundColor: "#2A3A8D" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#2A3A8D", px: "200px" }}
      >
        <Toolbar>
          {pages.map((page, index) => (
            <MenuItem key={index}>
              <Link
                href={page.url}
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                {page.name}
              </Link>
            </MenuItem>
          ))}
        </Toolbar>
        {auth && (
          <Box sx={{ position: "absolute", top: "16px", right: "200px" }}>
            <Button onClick={logout} sx={{ color: "#Fff" }}>
              {" "}
              Logout
            </Button>
          </Box>
        )}
      </AppBar>
    </Box>
  );
};
