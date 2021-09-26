// Libs
import React, { useState } from 'react'

// Components
import EditImages from 'components/EditImages'
import SelectImages from 'components/SelectImages'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepConnectorStyled from 'components/StepConnectorStyled'
import StepIconStyled from 'components/StepIconStyled'
import StepLabel from '@material-ui/core/StepLabel'

// Constants
import { MAIN_STEPS_ENUM } from 'constants/steps'

// Style
import './index.css'

// Utils
import _isEmpty from 'lodash/isEmpty'

function getSteps() {
  return ['Seleção de imagens', 'Edição de imagens', 'Inclusão de informações', 'Geração do template']
}

function MainPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [pictures, setPictures] = useState([]);
  const steps = getSteps();

  const handleStep = (step) => () => {
    if (activeStep === step) return false
    const isValid = validateStepTarget(step)
    if (!isValid) return
    setActiveStep(step)
  }

  const renderContentAccordingStep = () => {
    switch(activeStep) {
      case MAIN_STEPS_ENUM.SELECT_IMAGES:
        return <SelectImages pictures={pictures} setPictures={setPictures} />
      case MAIN_STEPS_ENUM.EDIT_IMAGES:
        return <EditImages pictures={pictures} />
      default:
        break;
    }
  }

  const validateStepTarget = (stepTarget) => {
    switch (activeStep) {
      case MAIN_STEPS_ENUM.SELECT_IMAGES:
        if (_isEmpty(pictures)) {
          return false
        }
        return true
      case MAIN_STEPS_ENUM.EDIT_IMAGES:
      case MAIN_STEPS_ENUM.INCLUDE_INFORMATIONS:
      case MAIN_STEPS_ENUM.GENERATE_TEMPLATE:
      default:
        break;
    }
  }

  return (
    <div>
      <Stepper
        className="stepContainer"
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnectorStyled />}>
        {steps.map((label, stepIndex) => (
          <Step
            key={label}
            onClick={handleStep(stepIndex)}
          >
            <StepLabel StepIconComponent={StepIconStyled}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderContentAccordingStep()}
    </div>
  )
}

export default MainPage
