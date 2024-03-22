// Libs
import React from "react";

// Icons
import CropIcon from "@mui/icons-material/Crop";
import InfoIcon from "@mui/icons-material/Info";
import PanToolIcon from "@mui/icons-material/PanTool";
import WorkIcon from "@mui/icons-material/Work";

// Styling
import { StepIconProps, styled } from "@mui/material";
import { isNil } from "lodash";

export const StyledContainer = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

export const StepIconStyled = (props: StepIconProps) => {
  const { active, completed, className } = props;
  const icons = {
    1: <PanToolIcon />,
    2: <CropIcon />,
    3: <InfoIcon />,
    4: <WorkIcon />,
  };

  if (isNil(props?.icon))
    return (
      <StyledContainer
        ownerState={{ completed, active }}
        className={className}
      />
    );
  const iconStr = parseInt(props?.icon.toString());

  return (
    <StyledContainer ownerState={{ completed, active }} className={className}>
      {icons[iconStr as keyof typeof icons]}
    </StyledContainer>
  );
};

export default StepIconStyled;
