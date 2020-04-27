function test(event) {
  let pastedFile = event.clipboardData.items[0].getAsFile();

  if (pastedFile) {
    getImageDataFromUpload(pastedFile, gotImageData, displayStatus);
  } else {
    displayStatus('Something went wrong, are you sure you pasted an image?')
  }
}

function gotImageData(imageData) {
  displayStatus('Succesfully loaded image. The image size is ' + imageData.width + 'x' + imageData.height + ' pixels.');
}

function displayStatus(status) {
  document.getElementById('statusMessage').innerText = status;
}
