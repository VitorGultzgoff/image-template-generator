const convertCanvasIntoImg = (canvasTarget) => {
  let imgConverted = new Image();
  imgConverted.src = canvasTarget.toDataURL();
  return imgConverted;
};

const exportContentAsImg = (contentTargetId) => {
  const elementTarget = document.getElementById(contentTargetId)
  // Convert, adapt the container and remove all the not include references
  return elementTarget
}

export { convertCanvasIntoImg, exportContentAsImg };
