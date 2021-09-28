// Libs
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';

// Components
import Button from '@mui/material/Button'

// Icons
import PrintIcon from '@mui/icons-material/Print';

// Style
import './index.css'

function GenerateTemplate({ pictures, picturesInfo }) {
  const componentRef = useRef();
  return (
    <div className="templateContainer">
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
        {pictures.map((actualPicture, actualPictureIndex) => {
          const idValue = picturesInfo[actualPictureIndex].id
          const amountValue = picturesInfo[actualPictureIndex].value
          return (
            <div className="pictureContainer">
              <img src={actualPicture} alt={actualPictureIndex} className="pictureImg" />
              <span className="valuesContainer">{idValue} {amountValue}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GenerateTemplate
