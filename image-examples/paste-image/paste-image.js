function handlePaste(event) {
  //Get the image from the pasted clipboard data
  const pastedFile = event.clipboardData.items[0].getAsFile();

  if (pastedFile) {
    //We can now use the same function to read image data from the file as in the image upload example
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
