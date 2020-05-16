function getImageDataFromUpload(uploadedFile, callback, errorCallback) {
  // FileReader can read any kind of file, not just images, check out https://humanwhocodes.com/blog/2012/05/15/working-with-files-in-javascript-part-2/
  const fileReader = new FileReader();

  // Let's prepare a handler for when the file is read
  fileReader.onload = (progress) => {
    // We just finished reading the file as a data URL
    const imgUrl = progress.target.result;

    //Create a temporary image element
    const image = document.createElement('img');
    image.onload = () => {
      //When the image is loaded, create a temporary canvas element and draw the image in it
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      //Read the image's pixels from the canvas and return them in an ImageData object
      const imageData = context.getImageData(0, 0, image.width, image.height);
      callback(imageData);
    };
    image.onerror = () => {
      errorCallback('Something went wrong, are you sure you uploaded an image?')
    }

    //Set the image's source URL to the data URL of our image
    image.src = imgUrl;
  };

  //Read contents of the file as a data URL
  fileReader.readAsDataURL(uploadedFile);
}

//ˇDon't worry about this method below, it just draws a house using the Canvas APIˇ
function drawSomething(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 350, 200);

  ctx.fillStyle = '#00DDDD';
  ctx.fillRect(0, 0, 350, 150);
  ctx.fillStyle = '#00DD00';
  ctx.fillRect(0, 150, 350, 50);

  ctx.fillStyle = '#DDDDDD';
  ctx.fillRect(50, 50, 100, 100);
  ctx.fillStyle = '#00DDDD';
  ctx.fillRect(60, 60, 30, 30);
  ctx.fillRect(110, 60, 30, 30);
  ctx.fillStyle = '#700B09';
  ctx.fillRect(85, 100, 30, 50);
  ctx.fillRect(115, 20, 10, 30);
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(100, 20);
  ctx.fill();

  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.arc(300, 20, 20, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 15; i++) {
    const offsetx = Math.floor(Math.random() * 40);
    const offsety = Math.floor(Math.random() * 20);

    ctx.beginPath();
    ctx.arc((250 + offsetx), (20 + offsety), 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}
