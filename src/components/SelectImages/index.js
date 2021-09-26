// Libs
import React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

// Utils
import { fileToDataURL } from 'utils/file'

// Styles
import './index.css'

// FilePond
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function SelectImages({ pictures, setPictures }) {
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
    images.then(imgsData => setPictures(imgsData))
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
