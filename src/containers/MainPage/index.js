// Libs
import React, { useState } from 'react'

// Components
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepConnectorStyled from 'components/StepConnectorStyled'
import StepIconStyled from 'components/StepIconStyled'
import StepLabel from '@material-ui/core/StepLabel'

// Utils
import { fileToDataURL } from 'utils/file'

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

  const uploadImages = (event) => {
    const files = event.target.files;
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
      <input
        accept="image/*"
        multiple
        type="file"
        onChange={uploadImages}
      />
    </div>
  )
}

export default MainPage
