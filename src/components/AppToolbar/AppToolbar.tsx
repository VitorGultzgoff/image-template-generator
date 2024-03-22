// Libs
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import AppBar from "@mui/material/AppBar";
import MenuLanguages from "components/MenuLanguages";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

// Icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";

export const AppToolbar = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("image_template_generator")}
        </Typography>
        <MenuLanguages />
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
