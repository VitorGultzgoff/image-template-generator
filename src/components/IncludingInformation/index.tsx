// Libs
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useTranslation } from "react-i18next";

// Components
import CurrencyInput from "components/form/CurrencyInput";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

// Hooks
import { usePictures } from "hooks/usePictures";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LabelIcon from "@mui/icons-material/Label";

// Utils
import { containerHorizontalCenterAligned } from "utils/style";

// Styles
import {
  IncludingInfoActionBtn,
  NextActionContainer,
  PreviousActionContainer,
  ProductInfoContainer,
  ProductInfoInput,
  ProductInfoInputValueContainer,
} from "./styles";
import "./index.css";

function IncludingInformation() {
  const { t } = useTranslation();
  const { croppedPictures, picturesInfo, setPicturesInfo } = usePictures();
  const [actualImgIndex, setActualImgIndex] = useState(0);
  const [idValue, setIdValue] = useState<string | undefined>(
    picturesInfo[actualImgIndex]?.id
  );
  const [amountValue, setAmountValue] = useState<number | undefined>(
    picturesInfo[actualImgIndex].value
  );
  const isFirstPicture = actualImgIndex <= 0;
  const isLastPicture = actualImgIndex >= croppedPictures?.length - 1;

  const resetValues = (indexTarget: number) => {
    setIdValue(picturesInfo[indexTarget]?.id);
    setAmountValue(picturesInfo[indexTarget].value);
  };

  const backImg = () => {
    if (isFirstPicture) return false;
    const indexTarget = actualImgIndex - 1;
    setActualImgIndex(indexTarget);
    resetValues(actualImgIndex - 1);
    return true;
  };

  const nextImg = () => {
    if (isLastPicture) return false;
    const indexTarget = actualImgIndex + 1;
    setActualImgIndex(indexTarget);
    resetValues(indexTarget);
    return true;
  };

  const updatePicturesInfo = useCallback(() => {
    let picturesInfoMapped = picturesInfo;
    picturesInfoMapped[actualImgIndex].id = idValue;
    picturesInfoMapped[actualImgIndex].value = amountValue;
    setPicturesInfo(picturesInfoMapped);
  }, [actualImgIndex, amountValue, picturesInfo, idValue, setPicturesInfo]);

  useEffect(() => {
    updatePicturesInfo();
  }, [idValue, amountValue, updatePicturesInfo]);

  return (
    <div className="includingInfoContainer">
      <div className="infoContainer">
        <Grid container className="actionsContainer">
          <Grid item xs={12} container>
            <img
              src={croppedPictures[actualImgIndex]}
              className="pictureImgPreview"
              alt="Img info"
            />
          </Grid>
          <Grid container>
            <Grid container spacing={2}>
              <PreviousActionContainer
                item
                xs={12}
                md={6}
                container
                justifyContent={{ xs: "center", md: "end" }}
              >
                <IncludingInfoActionBtn
                  disabled={isFirstPicture}
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  color="error"
                  onClick={backImg}
                >
                  {t("general.previous")}
                </IncludingInfoActionBtn>
              </PreviousActionContainer>
              <NextActionContainer
                item
                xs={12}
                md={6}
                container
                justifyContent={{ xs: "center", md: "start" }}
              >
                <IncludingInfoActionBtn
                  disabled={isLastPicture}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  color="primary"
                  onClick={nextImg}
                >
                  {t("general.nextImage")}
                </IncludingInfoActionBtn>
              </NextActionContainer>
            </Grid>
          </Grid>
          <ProductInfoContainer container>
            <Grid item xs={12} {...containerHorizontalCenterAligned}>
              <ProductInfoInput
                className="infoInput"
                required
                label={t("general.product.identifier")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIdValue(e?.target?.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <LabelIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder={t("general.product.identifier")}
                value={idValue}
              />
            </Grid>
            <ProductInfoInputValueContainer
              item
              xs={12}
              {...containerHorizontalCenterAligned}
            >
              <ProductInfoInput
                className="infoInput"
                required
                label={`${t("general.product.value")}(${t(
                  "currency.brl.main_ticker"
                )})`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <AttachMoneyIcon className="moneyIcon" />
                    </InputAdornment>
                  ),
                  inputComponent: CurrencyInput,
                  inputProps: {
                    component: NumberFormat,
                    setValue: setAmountValue,
                  },
                }}
                placeholder={`${t("general.product.value")}(${t(
                  "currency.brl.main_ticker"
                )})`}
                value={amountValue}
              />
            </ProductInfoInputValueContainer>
          </ProductInfoContainer>
        </Grid>
      </div>
    </div>
  );
}

export default IncludingInformation;
