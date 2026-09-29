import React, { useEffect, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export default function SignIn() {
  //navigation hook
  const navigate = useNavigate();
  //set user
  const callbackResponse = useCallback(
    (response) => {
      localStorage.setItem("user", response.credential);
      navigate("/search");
    },
    [navigate],
  );

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/search");
      return;
    }
    if (!CLIENT_ID) return;

    const renderButton = () => {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: callbackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        {
          theme: "outline",
          size: "large",
        },
      );
    };

    //the Google script loads async, so wait for it instead of reloading
    if (window.google?.accounts?.id) {
      renderButton();
      return;
    }
    const script = document.getElementById("google-gsi");
    script.addEventListener("load", renderButton);
    return () => script.removeEventListener("load", renderButton);
  }, [callbackResponse, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h3" sx={{ marginTop: 4 }}>
        Book App
      </Typography>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1,
          borderRadius: "16px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Typography variant="h4">Sign In</Typography>
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}></Avatar>
        {CLIENT_ID ? (
          <div id="google-signin" style={{ marginBottom: "10px" }} />
        ) : (
          <Typography color="error" sx={{ mb: 2, px: 2 }}>
            Sign-in is not configured
          </Typography>
        )}
      </Box>
    </Container>
  );
}
