// Libs
import React from "react";

// Components
import Button from "@mui/material/Button";

// Icons
import PrintIcon from "@mui/icons-material/Print";

// Libs
import { useTranslation } from 'react-i18next';

export default function PrintAction({ action, onClick }) {
  const { t } = useTranslation()
  const actionMapped = action ? action : onClick
  return (
    <Button variant="contained" startIcon={<PrintIcon />} color="primary" onClick={actionMapped}>
      {t('general.print')}
    </Button>
  );
}
