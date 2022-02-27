// Libs
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Components
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

// Utils
import { fileToDataURL } from "utils/file";

// Styles
import "./index.css";

// FilePond
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function SelectImages({
  pictures,
  setCroppedPictures,
  setPictures,
  setPicturesInfo,
}) {
  const setMappedPicturesInfo = (imgsData) => {
    const picturesInfo = [];
    // May be replaced for an array create without forEach
    imgsData.forEach((actualImg) => {
      picturesInfo.push({
        id: "",
        value: "",
      });
    });
    setPicturesInfo(picturesInfo);
  };

  const transformFilesIntoImages = (files) => {
    const filesArray = Array.prototype.slice.call(files);
    return Promise.all(filesArray.map(fileToDataURL));
  };

  const transformPondDataIntoImages = (pondData) => {
    return pondData.map((actualPondData) => actualPondData.file);
  };

  const uploadImages = (pondData, quantityOfImagesUploaded) => {
    const files = transformPondDataIntoImages(pondData);
    const images = transformFilesIntoImages(files);
    images.then((imgsData) => {
      setPictures(imgsData);
      setCroppedPictures(imgsData);
      setMappedPicturesInfo(imgsData);
    });
  };

  return (
    <>
      <div className="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} container>
            <Button
              variant="contained"
              color="error"
            >
              Incluir dados
            </Button>
          </Grid>
          <Grid item xs={12} md={6} container>
            <Button
              variant="contained"
              color="primary"
            >
              Não incluir dados
            </Button>
          </Grid>
        </Grid>
      </div>
      <FilePond
        className="selectImgContainer"
        files={pictures}
        onupdatefiles={uploadImages}
        allowMultiple={true}
        maxFiles={250}
        name="files"
        labelIdle='Arraste e solte seus arquivos ou <span class="filepond--label-action">Procure o arquivo</span>'
      />
    </>
  );
}

export default SelectImages;
