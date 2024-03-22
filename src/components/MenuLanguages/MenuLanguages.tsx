// Libs
import ReactCountryFlag from "react-country-flag";
import React, { useState } from "react";

// Components
import { IconButton, Menu, MenuItem } from "@mui/material";

// Constants
import { LANGUAGES } from "constants/i18n";

// Icons
import LanguageIcon from "@mui/icons-material/Language";

// Utils
import { switchLanguage } from "utils/i18n";

export const MenuLanguages = () => {
  const [anchorLangs, setAnchorLang] = useState<HTMLElement | null>(null);

  const switchGlobalLanguage = (lang: string) => {
    switchLanguage(lang);
    closeMenuLanguagesMenu();
  };

  const switchMenuLanguages = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLang(event?.currentTarget);
  };

  const closeMenuLanguagesMenu = () => {
    setAnchorLang(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => switchMenuLanguages}
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
      >
        <MenuItem
          onClick={() => switchGlobalLanguage(LANGUAGES.PORTUGUESE_BRAZIL)}
        >
          <ReactCountryFlag countryCode="BR" />
        </MenuItem>
        <MenuItem onClick={() => switchGlobalLanguage(LANGUAGES.ENGLISH)}>
          <ReactCountryFlag countryCode="US" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuLanguages;
