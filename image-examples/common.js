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
}

function drawSomething(canvasId) {
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 350, 200);

  ctx.fillStyle = '#00DDDD';
  ctx.fillRect(0, 0, 350, 150);
  ctx.fillStyle = '#00DD00';
  ctx.fillRect(0, 150, 350, 50);

  var offset = 0;

  var startx = offset
  ctx.fillStyle = '#DDDDDD';
  ctx.fillRect((startx + 50), 50, 100, 100);
  ctx.fillStyle = '#00DDDD';
  ctx.fillRect((startx + 60), 60, 30, 30);
  ctx.fillRect((startx + 110), 60, 30, 30);
  ctx.fillStyle = '#700B09';
  ctx.fillRect((startx + 85), 100, 30, 50);
  ctx.fillRect((startx + 115), 20, 10, 30);
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.moveTo((startx + 50), 50);
  ctx.lineTo((startx + 150), 50);
  ctx.lineTo((startx + 100), 20);
  ctx.fill();

  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  ctx.arc(300, 20, 20, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  for (var i = 0; i < 15; i++) {
    var offsetx = Math.floor(Math.random() * 40);
    var offsety = Math.floor(Math.random() * 20);

    ctx.beginPath();
    ctx.arc((250 + offsetx), (20 + offsety), 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}
