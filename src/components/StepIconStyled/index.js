// Libs
import React from 'react'
import clsx from 'clsx';

// Icons
import CropIcon from '@material-ui/icons/Crop';
import InfoIcon from '@material-ui/icons/Info';
import PanToolIcon from '@material-ui/icons/PanTool';
import WorkIcon from '@material-ui/icons/Work';

// Styling
import { makeStyles } from '@material-ui/core/styles';

const useStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function StepIconStyled(props) {
  const classes = useStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PanToolIcon />,
    2: <CropIcon />,
    3: <InfoIcon />,
    4: <WorkIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

export default StepIconStyled
