let fileName = '';

function openUploadDialog() {
  //In order to upload a file, we need an <input type="file" element. We could have hidden it in the DOM, but i preferred to create one in JS instead
  const hiddenUploadElement = document.createElement('input');
  hiddenUploadElement.type = 'file';
  hiddenUploadElement.onchange = () => {
    //A file got uploaded, let's see what's inside. We could get a list of files if the input element had the "multiple" attribute, but it doesn't, so we can be sure there is just one file at index [0]
    const uploadedFile = hiddenUploadElement.files[0];
    fileName = uploadedFile.name;

    //To read the image data from the file, we use this function that is defined in common.js
    getImageDataFromUpload(uploadedFile, gotImageData, displayStatus);
  };

  //Click on our simulated file input element, this opens up the browser's file upload dialog
  hiddenUploadElement.click();
}

function gotImageData(imageData) {
  displayStatus('Succesfully loaded image. The image size is ' + imageData.width + 'x' + imageData.height + ' pixels. The uploaded file\'s name is "' + fileName + '".');
}

function displayStatus(status) {
  document.getElementById('statusMessage').innerText = status;
}
