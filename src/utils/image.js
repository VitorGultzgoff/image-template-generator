// Libs
import { toJpeg} from 'html-to-image';

const convertCanvasIntoImg = (canvasTarget) => {
  let imgConverted = new Image();
  imgConverted.src = canvasTarget.toDataURL();
  return imgConverted;
};

const exportContentAsJPEG = (contentTargetId, imageName = 'generated-image') => {
  const elementTarget = document.getElementById(contentTargetId)
  toJpeg(elementTarget, { quality: 0.95 })
  .then(function (dataUrl) {
    const fileType = 'jpeg'
    let link = document.createElement('a');
    link.download = `${imageName}.${fileType}`;
    link.href = dataUrl;
    link.click();
  });
}

export { convertCanvasIntoImg, exportContentAsJPEG };
