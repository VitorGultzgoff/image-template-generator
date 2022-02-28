// Libs
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

// Icons
import LanguageIcon from '@mui/icons-material/Language';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";

export default function AppToolbar() {
  const [anchorLangs, setAnchorLang] = useState(null);
  const { t } = useTranslation();

  const switchMenuLanguages = (event) => {
    setAnchorLang(event?.currentTarget);
  };

  const closeMenuLanguagesMenu = (event) => {
    setAnchorLang(null)
  }

  return (
    <AppBar>
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
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={switchMenuLanguages}
          color="inherit"
        >
          <LanguageIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorLangs}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorLangs)}
            onClose={closeMenuLanguagesMenu}
          >
            <MenuItem onClick={closeMenuLanguagesMenu}>PT-BR</MenuItem>
            <MenuItem onClick={closeMenuLanguagesMenu}>EN</MenuItem>
          </Menu>
      </Toolbar>
    </AppBar>
  );
}
