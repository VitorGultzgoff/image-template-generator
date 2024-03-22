// Libs
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";

// Components
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import EditImagesActions from "../EditImagesActions";

// Hooks
import { usePictures } from "hooks/usePictures";
import { useSteps } from "hooks/useSteps";

// Utils
import isNil from "lodash/isNil";

// Style
import "react-image-crop/dist/ReactCrop.css";
import "./EditImages.css";

export const EditImages = () => {
  const { croppedPictures, pictures } = usePictures();
  const genericImg = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef(null);
  const [actualPictureIndex, setActualPictureIndex] = useState(0);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>();
  const [crop, setCrop] = useState<Crop>();
  const isFirstPicture = actualPictureIndex <= 0;
  const isLastPicture = actualPictureIndex >= pictures?.length - 1;
  const { activeStep, setActiveStep } = useSteps();

  const onLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const currentImg: HTMLImageElement = event.currentTarget;
    if (!currentImg) return;
    genericImg.current = currentImg;
    const { naturalWidth: width, naturalHeight: height } = currentImg;
    const crop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 16 / 9, width, height),
      width,
      height
    );

    setCrop(crop);
    setCompletedCrop(null);
  };

  const mapImageCropPreview = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop, crop]);

  useEffect(() => {
    mapImageCropPreview();
  }, [mapImageCropPreview]);

  const goToNextStep = () => setActiveStep(activeStep + 1);

  return (
    <Box marginTop={4}>
      <Divider />
      <EditImagesActions
        actualPictureIndex={actualPictureIndex}
        croppedPictures={croppedPictures}
        isFirstPicture={isFirstPicture}
        isLastPicture={isLastPicture}
        lastPictureCallback={() => goToNextStep()}
        previewCanvasRef={previewCanvasRef}
        setActualPictureIndex={setActualPictureIndex}
      />
      <Divider />
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
      </section>
    </Box>
  );
};

export default EditImages;
