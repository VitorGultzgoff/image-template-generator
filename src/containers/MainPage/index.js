// Libs
import React, { useState } from 'react'

// Components
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepConnectorStyled from 'components/StepConnectorStyled'
import StepIconStyled from 'components/StepIconStyled'
import StepLabel from '@material-ui/core/StepLabel'

function getSteps() {
  return ['Seleção de imagens', 'Edição de imagens', 'Inclusão de informações', 'Geração do template']
}

function MainPage() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnectorStyled />}>
        {steps.map((label, stepIndex) => (
          <Step key={label} onClick={handleStep(stepIndex)}>
            <StepLabel StepIconComponent={StepIconStyled}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default MainPage
