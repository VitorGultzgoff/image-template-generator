// Libs
import React from "react";

// Icons
import CropIcon from "@mui/icons-material/Crop";
import InfoIcon from "@mui/icons-material/Info";
import PanToolIcon from "@mui/icons-material/PanTool";
import WorkIcon from "@mui/icons-material/Work";

// Styling
import { styled } from "@mui/material";

const StyledContainer = styled("div")({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function StepIconStyled(props) {
  const icons = {
    1: <PanToolIcon />,
    2: <CropIcon />,
    3: <InfoIcon />,
    4: <WorkIcon />,
  };

  return <StyledContainer>{icons[String(props.icon)]}</StyledContainer>;
}

export default StepIconStyled;
