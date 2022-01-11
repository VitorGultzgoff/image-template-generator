// Libs
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'

// Components
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CropIcon from '@mui/icons-material/Crop'

// Utils
import _clone from 'lodash/clone'
import _isNil from 'lodash/isNil'
import { convertCanvasIntoImg } from 'utils/image'

// Style
import 'react-image-crop/dist/ReactCrop.css'
import './index.css'

function EditImages({ pictures, croppedPictures, setCroppedPictures }) {
  const genericImg = useRef(null)
  const previewCanvasRef = useRef(null);
  const [actualPictureIndex, setActualPictureIndex] = useState(0)
  const [completedCrop, setCompletedCrop] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const isFirstPicture = actualPictureIndex <= 0
  const isLastPicture = actualPictureIndex >= pictures?.length - 1

  const backPicture = () => {
    if (isFirstPicture) return false
    setActualPictureIndex(actualPictureIndex - 1)
  }

  const cropPicture = () => {
    const { current } = previewCanvasRef
    const pictureMapped = convertCanvasIntoImg(current)
    mapCroppedPicture(actualPictureIndex, pictureMapped?.src)
  }

  const mapCroppedPicture = (pictureIndex, updatedPicture) => {
    const mappedCroppedPictures = _clone(croppedPictures)
    mappedCroppedPictures[pictureIndex] = updatedPicture
    setCroppedPictures(mappedCroppedPictures)
  }

  const mapInitialCroppedPictures = () => {
    const basicPictures = _clone(pictures)
    const mappedCroppedPictures = _clone(croppedPictures)
    basicPictures.forEach((actualBasicPicture, actualBasicPictureIndex) => {
      if (_isNil(mappedCroppedPictures[actualBasicPictureIndex])) mappedCroppedPictures[actualBasicPictureIndex] = actualBasicPicture
    });
    setCroppedPictures(mappedCroppedPictures)
  }

  const nextPicture = ()=> {
    if (isLastPicture) return false
    setActualPictureIndex(actualPictureIndex + 1)
  }

  const onLoad = useCallback((img) => {
    genericImg.current = img;
  }, []);

  useEffect(() => {
    mapInitialCroppedPictures()
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !genericImg.current) return;

    const image = genericImg.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
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
          src={pictures[actualPictureIndex]}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
      </div>
      <div className="previewContainer">
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>

      <div className="actionsContainer">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Button
              disabled={isFirstPicture}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              color="error"
              onClick={backPicture}
            >
              Anterior
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              color="primary"
              onClick={cropPicture}
            >
              Recortar
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              disabled={isLastPicture}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              color="secondary"
              onClick={nextPicture}
            >
              Próxima
            </Button>
          </Grid>
        </Grid>
      </div>

    </section>
  )
}

export default EditImages
