// Libs
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import clsx from "clsx";

// Components
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSwitch } from '@mui/base/SwitchUnstyled';
import SwitchInput from "components/form/Switch/SwitchInput"
import SwitchRoot from "components/form/Switch/SwitchRoot"
import SwitchThumb from "components/form/Switch/SwitchThumb"
import SwitchTrack from "components/form/Switch/SwitchTrack"

// Icons
import PrintIcon from "@mui/icons-material/Print";

// Utils
import { formatBRLCurrency } from "utils/currency";

// Style
import "./index.css";
import classNames from "classnames";

function GenerateTemplate({ croppedPictures, picturesInfo }) {
  const componentRef = useRef();
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };
  return (
    <div className="templateContainer">
      <Grid container>
        <SwitchRoot className={clsx(stateClasses)}>
          <SwitchTrack>
            <SwitchThumb className={clsx(stateClasses)} />
          </SwitchTrack>
          <SwitchInput {...getInputProps()} aria-label="Demo switch" />
        </SwitchRoot>
      </Grid>
      <div className="printContainer">
        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              color="primary"
            >
              Imprimir
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div id="contentToPrint" ref={componentRef}>
        {croppedPictures.map((actualPicture, actualPictureIndex) => {
          const idValue = picturesInfo[actualPictureIndex].id;
          const amountValue = picturesInfo[actualPictureIndex].value;
          return (
            <div
              className={classNames("pictureContainer", {
                noContentInBox: !idValue && !amountValue,
              })}
            >
              <img
                src={actualPicture}
                alt={actualPictureIndex}
                className="pictureImg"
              />
              {(idValue || amountValue) && (
                <span className="valuesContainer">
                  {idValue} {formatBRLCurrency(amountValue)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GenerateTemplate;
