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

// Libs
import { useTranslation } from 'react-i18next';

// Styles
import './index.css'

function IncludingInformations({ croppedPictures, picturesInfo, setPicturesInfo }) {
  const { t } = useTranslation()
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
        <Grid container className="actionsContainer">
          <Grid item xs={12} container>
            <img src={croppedPictures[actualImgIndex]} className="pictureImgPreview" alt='Img info' />
          </Grid>
          <Grid container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} container>
                <Button
                  className="btnPreviewAction"
                  disabled={isFirstPicture}
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  color="error"
                  onClick={backImg}
                >
                  {t('general.previous')}
                </Button>
              </Grid>
              <Grid item xs={12} md={6} container>
                <Button
                  className="btnPreviewAction"
                  disabled={isLastPicture}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  color="primary"
                  onClick={nextImg}
                >
                  {t('general.nextImage')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <div className="imgInfo">
            <Grid item xs={12}>
              <TextField
                className="infoInput"
                required
                label={t('general.product.identifier')}
                onChange={(e) => setIdValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <LabelIcon color="primary" />
                    </InputAdornment>
                  )
                }}
                placeholder={t('general.product.identifier')}
                value={idValue}
              />
            </Grid>
            <Grid item xs={12} className="genericInfoContainer">
              <TextField
                className="infoInput"
                required
                label={`${t('general.product.value')}(${t('currency.brl.main_ticker')})`}
                onChange={(e) => setAmountValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <AttachMoneyIcon className="moneyIcon" />
                    </InputAdornment>
                  ),
                  inputComponent: CurrencyInput,
                }}
                placeholder={`${t('general.product.value')}(${t('currency.brl.main_ticker')})`}
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
