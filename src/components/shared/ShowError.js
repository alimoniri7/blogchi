import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const ShowError = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>خطا!</AlertTitle>
      {error}
    </Alert>
  );
};

export default ShowError;
