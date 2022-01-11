const convertCanvasIntoImg = (canvasTarget) => {
  let imgConverted = new Image();
  imgConverted.src = canvasTarget.toDataURL();
  return imgConverted;
};

export { convertCanvasIntoImg };
