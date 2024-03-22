// Libs
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useTranslation } from "react-i18next";

// Hooks
import { usePictures } from "hooks/usePictures";

// Models
import { IPictureInformation } from "models/picture/picture.model";

// Utils
import { fileToDataURL } from "utils/file";

// Styles
import "./SelectImages.css";

// FilePond
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ActualFileObject, FilePondFile } from "filepond";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const SelectImages = () => {
  const { t } = useTranslation();
  const { setPicturesInfo } = usePictures();
  const { pictures, setCroppedPictures, setPictures } = usePictures();

  const setMappedPicturesInfo = (imgsData: Blob[]) => {
    const picturesInfo: IPictureInformation[] = [];
    // May be replaced for an array create without forEach
    imgsData.forEach((actualImg) => {
      picturesInfo.push({
        id: undefined,
        value: undefined,
      });
    });
    setPicturesInfo(picturesInfo);
  };

  const transformFilesIntoImages = (files: ActualFileObject[]) => {
    const filesArray = Array.prototype.slice.call(files);
    return Promise.all(filesArray.map(fileToDataURL));
  };

  const transformPondDataIntoImages = (pondData: FilePondFile[]) => {
    return pondData.map((actualPondData) => actualPondData.file);
  };

  const uploadImages = (pondData: FilePondFile[]) => {
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
        allowMultiple={true}
        allowReorder={true}
        className="selectImgContainer"
        files={pictures}
        maxFiles={250}
        name="files"
        onreorderfiles={uploadImages}
        onupdatefiles={uploadImages}
        labelIdle={`${t(
          "select_images.uploader.description"
        )} <span class="filepond--label-action">${t(
          "select_images.uploader.complemented_description"
        )}</span>`}
      />
    </>
  );
};

export default SelectImages;
