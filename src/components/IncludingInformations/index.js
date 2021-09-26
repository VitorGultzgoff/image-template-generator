// Libs
import React, { useState } from 'react'

// Components
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// Styles
import './index.css'

// Utils
import _isEmpty from 'lodash/isEmpty'

function IncludingInformations({ pictures, picturesInfo, setPicturesInfo }) {
  const [actualPictureIndex, setActualPictureIndex] = useState(0)

  console.log('picturesinfo = ', picturesInfo)

  const updateID = (e) => {
    const valueMapped = e?.target?.value
    if (_isEmpty(valueMapped)) return false;
    let picturesInfoMapped = picturesInfo
    picturesInfoMapped[actualPictureIndex].value = valueMapped
    console.log(picturesInfoMapped)
    setPicturesInfo(picturesInfoMapped)
  }

  const updateValue = () => {

  }

  return (
    <div className="includingInfoContainer">
      <Grid container>
        <Grid item xs={12}>
          <img src={pictures[actualPictureIndex]} className="infoImg" alt='Img info' />
        </Grid>
        <div className="imgInfo">
          <Grid item xs={12}>
            <TextField
              className="infoInput"
              required
              label="Identificador do produto"
              onBlur={updateID}
            />
          </Grid>
          <Grid item xs={12} className="valueContainer">
            <TextField
              className="infoInput"
              required
              label="Valor (R$)"
              onBlur={updateValue}
            />
          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default IncludingInformations
