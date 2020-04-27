function openUploadDialog() {
  document.getElementById('fileUpload').click();
}

function fileUploaded() {
  let uploadedFile = document.getElementById('fileUpload').files[0];

  getImageDataFromUpload(uploadedFile, gotImageData);
}

function gotImageData(imageData, fileName) {
  displayStatus('Succesfully loaded image. The image size is ' + imageData.width + 'x' + imageData.height + ' pixels. The uploaded file\'s name is "' + fileName + '".');
}

function displayStatus(status) {
  document.getElementById('statusMessage').innerText = status;
}

function getImageDataFromUpload(uploadedFile, callback) {
  let canvas = document.createElement('canvas');
  let fileReader = new FileReader();
  let fileName = uploadedFile.name;

  fileReader.onload = (progress) => {
    let imgUrl = progress.target.result;

    let image = document.createElement('img');
    image.src = imgUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      let imageData = context.getImageData(0, 0, image.width, image.height);
      callback(imageData, fileName);
    };
    image.onerror = () => {
      displayStatus('Something went wrong, are you sure "' + fileName + '" is an image?')
    }
  };

  fileReader.readAsDataURL(uploadedFile);
}