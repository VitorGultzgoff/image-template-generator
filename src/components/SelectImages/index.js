// Libs
import React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

// Utils
import _clone from 'lodash/clone'
import _isNil from 'lodash/isNil'
import { fileToDataURL } from 'utils/file'

// Styles
import './index.css'

// FilePond
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function SelectImages({ croppedPictures, pictures, setCroppedPictures, setPictures, setPicturesInfo }) {
  const mapInitialCroppedPictures = (pictures) => {
    const basicPictures = _clone(pictures)
    const mappedCroppedPictures = _clone(croppedPictures)
    basicPictures.forEach((actualBasicPicture, actualBasicPictureIndex) => {
      if (_isNil(mappedCroppedPictures[actualBasicPictureIndex])) {
        mappedCroppedPictures[actualBasicPictureIndex] = actualBasicPicture
      }
    });
    setCroppedPictures(mappedCroppedPictures)
  }


  const setMappedPicturesInfo = (imgsData) => {
    const picturesInfo = []
    // May be replaced for an array create without forEach
    imgsData.forEach(actualImg => {
      picturesInfo.push({
        id: '',
        value: ''
      })
    });
    setPicturesInfo(picturesInfo)
  }


  const transformFilesIntoImages = files => {
    const filesArray = Array.prototype.slice.call(files)
    return Promise.all(filesArray.map(fileToDataURL))
  }

  const transformPondDataIntoImages = pondData => {
    return pondData.map(actualPondData => actualPondData.file)
  }

  const uploadImages = (pondData) => {
    const files = transformPondDataIntoImages(pondData)
    const images = transformFilesIntoImages(files)
    images.then(imgsData => {
      setPictures(imgsData)
      mapInitialCroppedPictures(imgsData)
      setMappedPicturesInfo(imgsData)
    })
  }

  return (
    <FilePond
      className="selectImgContainer"
      files={pictures}
      onupdatefiles={uploadImages}
      allowMultiple={true}
      maxFiles={250}
      name="files"
      labelIdle='Arraste e solte seus arquivos ou <span class="filepond--label-action">Procure o arquivo</span>'
    />
  )
}

export default SelectImages
