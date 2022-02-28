// Libs
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Libs
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation()

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
      <FilePond
        className="selectImgContainer"
        files={pictures}
        onupdatefiles={uploadImages}
        allowMultiple={true}
        maxFiles={250}
        name="files"
        labelIdle={`${t('select_images.uploader.description')} <span class="filepond--label-action">${t('select_images.uploader.description')}</span>`}
      />
    </>
  );
}

export default SelectImages;
