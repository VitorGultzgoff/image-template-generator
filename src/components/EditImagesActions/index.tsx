// Libs
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

// Components
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// Hooks
import { IPicturesContextData, usePictures } from "hooks/usePictures";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CropIcon from "@mui/icons-material/Crop";

// Libs
import { useTranslation } from "react-i18next";

// Utils
import _clone from "lodash/clone";
import isNil from "lodash/isNil";
import { containerHorizontalCenterAligned } from "utils/style";
import { convertCanvasIntoImg } from "utils/image";

// Style
import "./index.css";

interface EditImagesProps {
  actualPictureIndex: number;
  croppedPictures: IPicturesContextData["croppedPictures"];
  isFirstPicture: boolean;
  isLastPicture: boolean;
  lastPictureCallback?: () => void;
  previewCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  setActualPictureIndex: Dispatch<SetStateAction<number>>;
}

const EditImages = ({
  actualPictureIndex,
  croppedPictures,
  isFirstPicture,
  isLastPicture,
  lastPictureCallback,
  previewCanvasRef,
  setActualPictureIndex,
}: EditImagesProps) => {
  const { t } = useTranslation();
  const { setCroppedPictures } = usePictures();

  const backPicture = () => {
    if (isFirstPicture) return false;
    setActualPictureIndex((prevIndex) => prevIndex - 1);
    return true;
  };

  const cropPicture = () => {
    const { current } = previewCanvasRef;
    if (isNil(current)) return;
    const pictureMapped = convertCanvasIntoImg(current);
    mapCroppedPicture(actualPictureIndex, pictureMapped?.src);
    if (isLastPicture) lastPictureCallback && lastPictureCallback();
    nextPicture();
  };

  const mapCroppedPicture = (pictureIndex: number, updatedPicture: string) => {
    const mappedCroppedPictures = _clone(croppedPictures);
    mappedCroppedPictures[pictureIndex] = updatedPicture;
    setCroppedPictures(mappedCroppedPictures);
  };

  const nextPicture = () => {
    if (isLastPicture) return false;
    setActualPictureIndex((prevIndex) => prevIndex + 1);
    return true;
  };

  return (
    <div className="actionsContainer">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} {...containerHorizontalCenterAligned}>
          <Button
            disabled={isFirstPicture}
            variant="contained"
            startIcon={<ArrowBackIcon />}
            color="error"
            onClick={backPicture}
          >
            {t("general.previous")}
          </Button>
        </Grid>
        <Grid item xs={12} md={4} {...containerHorizontalCenterAligned}>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            color="primary"
            onClick={cropPicture}
          >
            {t("general.crop")}
          </Button>
        </Grid>
        <Grid item xs={12} md={4} {...containerHorizontalCenterAligned}>
          <Button
            disabled={isLastPicture}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            color="secondary"
            onClick={nextPicture}
          >
            {t("general.nextImage")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditImages;
