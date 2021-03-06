// Libs
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

// Components
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CropIcon from "@mui/icons-material/Crop";

// Libs
import { useTranslation } from "react-i18next";

// Utils
import _clone from "lodash/clone";
import { convertCanvasIntoImg } from "utils/image";
import { containerHorizontalCenterAligned } from "utils/style";
import isNil from "lodash/isNil";

// Style
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";

interface IEditImagesProps {
  pictures: string[];
  croppedPictures: string[];
  setCroppedPictures: (croppedPictures: string[]) => void;
}

const EditImages = ({
  pictures,
  croppedPictures,
  setCroppedPictures,
}: IEditImagesProps) => {
  const { t } = useTranslation();
  const genericImg = useRef(null);
  const previewCanvasRef = useRef(null);
  const [actualPictureIndex, setActualPictureIndex] = useState(0);
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [crop, setCrop] = useState<Crop>();
  const isFirstPicture = actualPictureIndex <= 0;
  const isLastPicture = actualPictureIndex >= pictures?.length - 1;

  const backPicture = () => {
    if (isFirstPicture) return false;
    setActualPictureIndex(actualPictureIndex - 1);
    return true;
  };

  const cropPicture = () => {
    const { current } = previewCanvasRef;
    if (isNil(current)) return;
    const pictureMapped = convertCanvasIntoImg(current);
    mapCroppedPicture(actualPictureIndex, pictureMapped?.src);
    nextPicture();
  };

  const mapCroppedPicture = (pictureIndex: number, updatedPicture: string) => {
    const mappedCroppedPictures = _clone(croppedPictures);
    mappedCroppedPictures[pictureIndex] = updatedPicture;
    setCroppedPictures(mappedCroppedPictures);
  };

  const nextPicture = () => {
    if (isLastPicture) return false;
    setActualPictureIndex(actualPictureIndex + 1);
    return true;
  };

  const onLoad = useCallback((img) => {
    genericImg.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !genericImg.current)
      return;

    const image: HTMLImageElement = genericImg.current;
    const canvas: HTMLCanvasElement = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const canvasRenderingReference: CanvasRenderingContext2D | null =
      canvas.getContext("2d");

    if (isNil(canvasRenderingReference))
      throw new Error("2d context not supported or canvas already initialized");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    canvasRenderingReference.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    canvasRenderingReference.imageSmoothingQuality = "high";

    canvasRenderingReference.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <section id="editImgContainer">
      <div className="cropContainer">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img
            alt={`${actualPictureIndex} of template`}
            src={pictures[actualPictureIndex]}
            onLoad={onLoad}
          />
        </ReactCrop>
      </div>
      <div className="previewContainer">
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>

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
    </section>
  );
};

export default EditImages;
