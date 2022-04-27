// Libs
import ReactCountryFlag from "react-country-flag"
import React, { useState } from "react";

// Components
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Constants
import { LANGUAGES } from "constants/i18n"

// Icons
import LanguageIcon from '@mui/icons-material/Language';

// Utils
import { switchLanguage } from "utils/i18n"

export default function MenuLanguages() {
  const [anchorLangs, setAnchorLang] = useState(null);
  
  const switchGlobalLanguage = (event, lang) => {
    switchLanguage(lang)
    closeMenuLanguagesMenu(event)
  }

  const switchMenuLanguages = (event) => {
    setAnchorLang(event?.currentTarget);
  };

  const closeMenuLanguagesMenu = (event) => {
    setAnchorLang(null)
  };

  return (
    <>
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
        <MenuItem onClick={(e) => switchGlobalLanguage(e, LANGUAGES.PORTUGUESE_BRAZIL)}>
          <ReactCountryFlag countryCode="BR" />
        </MenuItem>
        <MenuItem onClick={(e) => switchGlobalLanguage(e, LANGUAGES.ENGLISH)}>
          <ReactCountryFlag countryCode="US" />
        </MenuItem>
      </Menu>
    </>
  );
}
