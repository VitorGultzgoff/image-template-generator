// Libs
import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'

// Components
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepConnectorStyled from 'components/StepConnectorStyled'
import StepIconStyled from 'components/StepIconStyled'
import StepLabel from '@material-ui/core/StepLabel'

// Utils
import { fileToDataURL } from 'utils/file'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


function getSteps() {
  return ['Seleção de imagens', 'Edição de imagens', 'Inclusão de informações', 'Geração do template']
}

function MainPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [pictures, setPictures] = useState([]);
  const steps = getSteps();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

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
    <div>
      <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnectorStyled />}>
        {steps.map((label, stepIndex) => (
          <Step key={label} onClick={handleStep(stepIndex)}>
            <StepLabel StepIconComponent={StepIconStyled}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FilePond
        files={pictures}
        onupdatefiles={uploadImages}
        allowMultiple={true}
        maxFiles={250}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
}

export default MainPage
