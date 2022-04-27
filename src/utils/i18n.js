// Libs
import i18n from "../i18n";

// Utils
import _isNil from "lodash/isNil"

export const switchLanguage = (lang) => {
  if(_isNil(lang)) return;
  const { changeLanguage } = i18n
  changeLanguage(lang)
}
