// Libs
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

// Components
import { Grid } from "@mui/material";
import PrintAction from 'components/GenerateTemplate/PrintAction'
import SwitchFormInput from "components/form/Switch/SwitchFormInput";

// Icons
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// Utils
import { exportContentAsJPEG } from "utils/image";
import { formatBRLCurrency } from "utils/currency";
import { exportDataAsJSON } from "utils/file";

// Style
import "./index.css";
import classNames from "classnames";

function GenerateTemplate({ croppedPictures, picturesInfo }) {
  const componentRef = useRef();
  const [isPdfFile, setIsPdfFile] = useState(false);
  const contentToPrintElement = "contentToPrint";
  const exportedFileName = "catalogo-vendas";
  const exportedJSONData = { croppedPictures, picturesInfo }

  const exportAllImgData = () => {
    exportContentAsJPEG(contentToPrintElement, exportedFileName)
    exportDataAsJSON(exportedJSONData, exportedFileName)
  }

  const printSwitcher = () => {
    if (isPdfFile) {
      return (
        <ReactToPrint
          trigger={() => <PrintAction />}
          content={() => componentRef.current}
          onAfterPrint={() => exportDataAsJSON(exportedJSONData)}
        />
      );
    }
    return <PrintAction action={() => exportAllImgData()} />;
  };

  return (
    <div className="templateContainer">
      <Grid container className="contentFlexCenter">
        <SwitchFormInput
          checked={isPdfFile}
          onChange={(e) => setIsPdfFile(e?.target?.checked)}
          LeftIcon={ImageIcon}
          RightIcon={PictureAsPdfIcon}
        />
      </Grid>
      <Grid container className="basicMarginBlock contentFlexCenter">
        {printSwitcher()}
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
