// Libs
import React, { useState } from "react";

// Components
import EditImages from "components/EditImages";
import GenerateTemplate from "components/GenerateTemplate";
import Grid from "@mui/material/Grid";
import IncludingInformations from "components/IncludingInformations";
import SelectImages from "components/SelectImages";
import StepConnectorStyled from "components/StepConnectorStyled";
import StepIconStyled from "components/StepIconStyled";
import { Step, StepLabel, Stepper } from "@mui/material";
// Constants
import { MAIN_STEPS_ENUM } from "constants/steps";

// Libs
import { useTranslation } from "react-i18next";

// Style
import "./index.css";

// Utils
import _isEmpty from "lodash/isEmpty";

function getSteps(t) {
  const functionalities_prefix = "functionalities.";
  return [
    t(`${functionalities_prefix}select_images`),
    t(`${functionalities_prefix}edit_images`),
    t(`${functionalities_prefix}including_information`),
    t(`${functionalities_prefix}template_generation`),
  ];
}

function MainPage() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [croppedPictures, setCroppedPictures] = useState([]);
  const [picturesInfo, setPicturesInfo] = useState([]);
  const steps = getSteps(t);

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
      <Grid container>
        <Grid item xs={12}>
          <Stepper
            className="stepContainer"
            alternativeLabel
            activeStep={activeStep}
            connector={<StepConnectorStyled />}
          >
            {steps.map((label, stepIndex) => (
              <Step key={label} onClick={handleStep(stepIndex)}>
                <StepLabel StepIconComponent={StepIconStyled}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          {renderContentAccordingStep()}
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
