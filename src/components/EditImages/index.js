// Libs
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop'

// Style
import 'react-image-crop/dist/ReactCrop.css'
import './index.css'

function EditImages({ pictures }) {
  const genericImg = useRef(null)
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });

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
      <ReactCrop
        src={pictures[0]}
        crop={crop}
        onImageLoaded={onLoad}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
    </section>
  )
}

export default EditImages
