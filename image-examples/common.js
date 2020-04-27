function getImageDataFromUpload(uploadedFile, callback, errorCallback) {
  let canvas = document.createElement('canvas');
  let fileReader = new FileReader();

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
      callback(imageData);
    };
    image.onerror = () => {
      errorCallback('Something went wrong, are you sure you pasted an image?')
    }
  };

  fileReader.readAsDataURL(uploadedFile);
};
