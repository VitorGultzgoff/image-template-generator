const fileToDataURL = (file) => {
  var reader = new FileReader()
  return new Promise(function (resolve) {
    reader.onload = function (event) {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })
}

export { fileToDataURL }
