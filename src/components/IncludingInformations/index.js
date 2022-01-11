// Libs
import React, { useEffect, useState } from 'react'

// Components
import Button from '@mui/material/Button'
import CurrencyInput from 'components/form/CurrencyInput'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LabelIcon from '@mui/icons-material/Label'

// Styles
import './index.css'

function IncludingInformations({ croppedPictures, picturesInfo, setPicturesInfo }) {
  const [actualImgIndex, setActualImgIndex] = useState(0)
  const [idValue, setIdValue] = useState(picturesInfo[actualImgIndex].id)
  const [amountValue, setAmountValue] = useState(picturesInfo[actualImgIndex].value)
  const isFirstPicture = actualImgIndex <= 0
  const isLastPicture = actualImgIndex >= croppedPictures?.length - 1
  
  const resetValues = (indexTarget) => {
    setIdValue(picturesInfo[indexTarget].id)
    setAmountValue(picturesInfo[indexTarget].value)
  }

  const backImg = () => {
    if (isFirstPicture) return false
    const indexTarget = actualImgIndex - 1
    setActualImgIndex(indexTarget)
    resetValues(actualImgIndex - 1)
  }

  const nextImg = () => {
    if (isLastPicture) return false
    const indexTarget = actualImgIndex + 1
    setActualImgIndex(indexTarget)
    resetValues(indexTarget)
  }

  const updatePicturesInfo = () => {
    let picturesInfoMapped = picturesInfo
    picturesInfoMapped[actualImgIndex].id = idValue
    picturesInfoMapped[actualImgIndex].value = amountValue
    setPicturesInfo(picturesInfoMapped)
  }

  useEffect(() => {
    updatePicturesInfo()
  }, [idValue, amountValue])

  return (
    <div className="includingInfoContainer">
      <div className="infoContainer">
        <Grid container>
          <Grid item xs={12}>
            <img src={croppedPictures[actualImgIndex]} className="infoImg" alt='Img info' />
          </Grid>
          <div className="actionsContainer">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  disabled={isFirstPicture}
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  color="error"
                  onClick={backImg}
                >
                  Anterior
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  disabled={isLastPicture}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  color="secondary"
                  onClick={nextImg}
                >
                  Próxima
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className="imgInfo">
            <Grid item xs={12}>
              <TextField
                className="infoInput"
                required
                label="Identificador do produto"
                onChange={(e) => setIdValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <LabelIcon color="primary" />
                    </InputAdornment>
                  )
                }}
                placeholder="Identificador do produto"
                value={idValue}
              />
            </Grid>
            <Grid item xs={12} className="valueContainer">
              <TextField
                className="infoInput"
                required
                label="Valor do produto(R$)"
                onChange={(e) => setAmountValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <AttachMoneyIcon className="moneyIcon" />
                    </InputAdornment>
                  ),
                  inputComponent: CurrencyInput,
                }}
                placeholder="Valor do produto(R$)"
                value={amountValue}
              />
            </Grid>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default IncludingInformations
