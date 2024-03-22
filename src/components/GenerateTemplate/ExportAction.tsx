// Libs
import React from "react";

// Components
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

// Libs
import { useTranslation } from "react-i18next";

type ExportType = "image" | "pdf";

interface ExportActionProps {
  action?: () => void;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: ExportType;
}

export const ExportAction = ({
  action,
  loading,
  onClick,
  type = "image",
}: ExportActionProps) => {
  const { t } = useTranslation();
  const actionMapped = action ? action : onClick;
  const isImgExport = type === "image";

  const getExportIcon = () => {
    if (loading) return <CircularProgress color="inherit" size={20} />;

    return isImgExport ? <DownloadIcon /> : <PrintIcon />;
  };

  const getExportLabel = () => {
    if (loading)
      return isImgExport
        ? `${t("general.downloading")}...`
        : `${t("general.printing")}...`;

    return isImgExport ? t("general.download") : t("general.print");
  };

  return (
    <Button
      color="primary"
      disabled={loading}
      onClick={actionMapped}
      startIcon={getExportIcon()}
      variant="contained"
    >
      {getExportLabel()}
    </Button>
  );
};

export default ExportAction;
