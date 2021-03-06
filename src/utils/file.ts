// Utils
import _isEmpty from "lodash/isEmpty";

const convertBase64IntoImg = (base64Data: string) => {
  if (_isEmpty(base64Data)) return base64Data;
  const img = new Image();
  img.src = base64Data;
  document.body.appendChild(img);
  return img;
};

const exportDataAsJSON = (jsonData: any, dataName = "generated-data") => {
  if (_isEmpty(jsonData)) return;
  const dataStr = JSON.stringify(jsonData);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  let link = document.createElement("a");
  link.download = `${dataName}-data.json`;
  link.href = dataUri;
  link.click();
};

const fileToDataURL = (file: File) => {
  var reader = new FileReader();
  return new Promise(function (resolve) {
    reader.onload = function (event) {
      resolve(event?.target?.result);
    };
    reader.readAsDataURL(file);
  });
};

export { convertBase64IntoImg, exportDataAsJSON, fileToDataURL };
