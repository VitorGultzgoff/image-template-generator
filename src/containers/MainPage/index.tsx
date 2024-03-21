// Libs
import React from "react";

// Components
import EditImages from "components/EditImages";
import GenerateTemplate from "components/GenerateTemplate";
import Grid from "@mui/material/Grid";
import IncludingInformation from "components/IncludingInformation";
import SelectImages from "components/SelectImages";
import StepConnectorStyled from "components/StepConnectorStyled";
import StepIconStyled from "components/StepIconStyled";
import { Step, StepLabel, Stepper } from "@mui/material";

// Constants
import { MAIN_STEPS_ENUM } from "constants/steps";

// Hooks
import { usePictures } from "hooks/usePictures";
import { useSteps } from "hooks/useSteps";

// Libs
import { useTranslation } from "react-i18next";

// Style
import "./index.css";

// Utils
import _isEmpty from "lodash/isEmpty";

function MainPage() {
  const { t } = useTranslation();
  const { pictures, picturesInfo } = usePictures();
  const { activeStep, setActiveStep } = useSteps();
  const getSteps = () => {
    const functionalities_prefix = "functionalities.";
    return [
      t(`${functionalities_prefix}select_images`),
      t(`${functionalities_prefix}edit_images`),
      t(`${functionalities_prefix}including_information`),
      t(`${functionalities_prefix}template_generation`),
    ];
  };
  const steps = getSteps();

  const handleStep = (step: number) => () => {
    if (activeStep === step) return false;
    const isValid = validateStepTarget(step);
    if (!isValid) return false;
    setActiveStep(step);
    return true;
  };

  const renderContentAccordingStep = () => {
    switch (activeStep) {
      case MAIN_STEPS_ENUM.SELECT_IMAGES:
        return <SelectImages />;
      case MAIN_STEPS_ENUM.EDIT_IMAGES:
        return <EditImages />;
      case MAIN_STEPS_ENUM.INCLUDE_INFORMATION:
        return <IncludingInformation />;
      case MAIN_STEPS_ENUM.GENERATE_TEMPLATE:
        return <GenerateTemplate />;
      default:
        break;
    }
    return null;
  };

  const validateStepTarget = (stepTarget: number) => {
    if (stepTarget < activeStep) return true;
    switch (activeStep) {
      case MAIN_STEPS_ENUM.SELECT_IMAGES:
        if (_isEmpty(pictures)) return false;
        return true;
      case MAIN_STEPS_ENUM.EDIT_IMAGES:
        if (_isEmpty(pictures)) return false;
        return true;
      case MAIN_STEPS_ENUM.INCLUDE_INFORMATION:
      case MAIN_STEPS_ENUM.GENERATE_TEMPLATE:
        if (_isEmpty(picturesInfo)) return false;
        return true;
      default:
        break;
    }
    return false;
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
