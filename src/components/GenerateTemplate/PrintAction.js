// Libs
import React from "react";

// Components
import Button from "@mui/material/Button";

// Icons
import PrintIcon from "@mui/icons-material/Print";

export default function PrintAction({ action, onClick }) {
  const actionMapped = action ? action : onClick
  return (
    <Button variant="contained" startIcon={<PrintIcon />} color="primary" onClick={actionMapped}>
      Imprimir
    </Button>
  );
}
