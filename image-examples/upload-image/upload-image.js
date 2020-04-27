let fileName = '';

function openUploadDialog() {
  document.getElementById('fileUpload').click();
}

function fileUploaded() {
  let uploadedFile = document.getElementById('fileUpload').files[0];
  fileName = uploadedFile.name;

  getImageDataFromUpload(uploadedFile, gotImageData, displayStatus);
}

function gotImageData(imageData) {
  displayStatus('Succesfully loaded image. The image size is ' + imageData.width + 'x' + imageData.height + ' pixels. The uploaded file\'s name is "' + fileName + '".');
}

function displayStatus(status) {
  document.getElementById('statusMessage').innerText = status;
}
