// Libs
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

// Components
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import SwitchFormInput from "components/form/Switch/SwitchFormInput";

// Icons
import PrintIcon from "@mui/icons-material/Print";

// Utils
import { exportContentAsJPEG } from "utils/image";
import { formatBRLCurrency } from "utils/currency";

// Style
import "./index.css";
import classNames from "classnames";

function GenerateTemplate({ croppedPictures, picturesInfo }) {
  const componentRef = useRef();
  const contentToPrintElement = "contentToPrint";
  const exportedFileName = "catalogo-vendas";
  return (
    <div className="templateContainer">
      <Grid container>
        <SwitchFormInput
          onChange={() =>
            exportContentAsJPEG(contentToPrintElement, exportedFileName)
          }
        />
      </Grid>
      <Grid container className="printContainer">
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
      </Grid>
      <div id={contentToPrintElement} ref={componentRef}>
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
