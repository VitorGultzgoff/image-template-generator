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

// Style
import 'react-image-crop/dist/ReactCrop.css'
import './index.css'

function EditImages({ pictures }) {
  const genericImg = useRef(null)
  const previewCanvasRef = useRef(null);
  const [actualImgIndex, setActualImgIndex] = useState(0)
  const [completedCrop, setCompletedCrop] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const isFirstPicture = actualImgIndex <= 0
  const isLastPicture = actualImgIndex >= pictures?.length - 1

  const backImg = () => {
    if (isFirstPicture) return false
    setActualImgIndex(actualImgIndex - 1)
  }

  const cropImg = () => {
  }

  const nextImg = ()=> {
    if (isLastPicture) return false
    setActualImgIndex(actualImgIndex + 1)
  }

  const onLoad = useCallback((img) => {
    genericImg.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !genericImg.current) {
      return;
    }

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
          src={pictures[actualImgIndex]}
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
              onClick={backImg}
            >
              Anterior
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              disabled
              variant="contained"
              startIcon={<CropIcon />}
              color="primary"
              onClick={cropImg}
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
              onClick={nextImg}
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