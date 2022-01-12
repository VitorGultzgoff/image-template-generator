// Libs
import React, { useEffect, useState } from "react";

// Components
import EditImages from "components/EditImages";
import GenerateTemplate from "components/GenerateTemplate";
import IncludingInformations from "components/IncludingInformations";
import SelectImages from "components/SelectImages";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepConnectorStyled from "components/StepConnectorStyled";
import StepIconStyled from "components/StepIconStyled";
import StepLabel from "@material-ui/core/StepLabel";

// Constants
import { MAIN_STEPS_ENUM } from "constants/steps";

// Style
import "./index.css";

// Utils
import _isEmpty from "lodash/isEmpty";

function getSteps() {
  return [
    "Seleção de imagens",
    "Edição de imagens",
    "Inclusão de informações",
    "Geração do template",
  ];
}

function MainPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [croppedPictures, setCroppedPictures] = useState([]);
  const [picturesInfo, setPicturesInfo] = useState([]);
  const steps = getSteps();

  const handleStep = (step) => () => {
    if (activeStep === step) return false;
    const isValid = validateStepTarget(step);
    if (!isValid) return;
    setActiveStep(step);
  };

  const renderContentAccordingStep = () => {
    switch (activeStep) {
      case MAIN_STEPS_ENUM.SELECT_IMAGES:
        return (
          <SelectImages
            croppedPictures={croppedPictures}
            pictures={pictures}
            setPictures={setPictures}
            setCroppedPictures={setCroppedPictures}
            setPicturesInfo={setPicturesInfo}
          />
        );
      case MAIN_STEPS_ENUM.EDIT_IMAGES:
        return (
          <EditImages
            croppedPictures={croppedPictures}
            pictures={pictures}
            setCroppedPictures={setCroppedPictures}
          />
        );
      case MAIN_STEPS_ENUM.INCLUDE_INFORMATIONS:
        return (
          <IncludingInformations
            croppedPictures={croppedPictures}
            picturesInfo={picturesInfo}
            setPicturesInfo={setPicturesInfo}
          />
        );
      case MAIN_STEPS_ENUM.GENERATE_TEMPLATE:
        return (
          <GenerateTemplate
            croppedPictures={croppedPictures}
            picturesInfo={picturesInfo}
          />
        );
      default:
        break;
    }
  };

  const validateStepTarget = (stepTarget) => {
    if (stepTarget < activeStep) return true;
    switch (activeStep) {
      case MAIN_STEPS_ENUM.SELECT_IMAGES:
        if (_isEmpty(pictures)) return false;
        return true;
      case MAIN_STEPS_ENUM.EDIT_IMAGES:
        if (_isEmpty(pictures)) return false;
        return true;
      case MAIN_STEPS_ENUM.INCLUDE_INFORMATIONS:
      case MAIN_STEPS_ENUM.GENERATE_TEMPLATE:
        if (_isEmpty(picturesInfo)) return false;
        return true;
      default:
        break;
    }
  };

  return (
    <div className="mainContainer">
      <Stepper
        className="stepContainer"
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnectorStyled />}
      >
        {steps.map((label, stepIndex) => (
          <Step key={label} onClick={handleStep(stepIndex)}>
            <StepLabel StepIconComponent={StepIconStyled}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderContentAccordingStep()}
    </div>
  );
}

export default MainPage;
