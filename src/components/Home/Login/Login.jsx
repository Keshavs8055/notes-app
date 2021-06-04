import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { googleSignIn } from "../../../firebase";

const handleClick = (setLoading) => {
  setLoading(true);
  googleSignIn().catch((e) => {
    alert(e.message);
    console.log(e);
  });
};

export const Login = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Box textAlign="center" marginTop={10}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box textAlign="center" marginTop={3}>
        <Typography variant="h5">Please log in first</Typography>
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{ margin: "10px auto" }}
          onClick={() => handleClick(setLoading)}
        >
          Login
        </Button>
      </Box>
    );
  }
};
