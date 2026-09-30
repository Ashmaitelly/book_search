import React, { useEffect, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography, Paper } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router";
import { isSignedIn, signIn } from "../functions/auth";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export default function SignIn() {
  //navigation hook
  const navigate = useNavigate();
  //set user
  const callbackResponse = useCallback(
    (response) => {
      signIn(response.credential);
      navigate("/search");
    },
    [navigate],
  );

  useEffect(() => {
    if (isSignedIn()) {
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3f51b5 0%, #7986cb 100%)",
        p: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            <MenuBookIcon />
          </Avatar>
          <Typography variant="h4" component="h1">
            Book Finder
          </Typography>
          <Typography color="text.secondary">
            Sign in to search thousands of free ebooks
          </Typography>
          {CLIENT_ID ? (
            <div id="google-signin" style={{ marginTop: 8 }} />
          ) : (
            <Typography color="error">Sign-in is not configured</Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
