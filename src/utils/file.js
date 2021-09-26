// Utils
import _isEmpty from 'lodash/isEmpty'

const convertBase64IntoImg = (base64Data) => {
  if (_isEmpty(base64Data)) return base64Data
  const img = new Image()
  img.src = base64Data
  img.style = 'visibility: hidden;'
  document.body.appendChild(img)
  return img
}


const fileToDataURL = (file) => {
  var reader = new FileReader()
  return new Promise(function (resolve) {
    reader.onload = function (event) {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })
}

export { convertBase64IntoImg, fileToDataURL }
