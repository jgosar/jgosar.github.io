function openFileUploadDialog() {
  return new Promise((resolve, reject) => {
    const hiddenUploadElement = document.createElement("input");
    hiddenUploadElement.type = "file";
    hiddenUploadElement.onchange = () => {
      const uploadedFile = hiddenUploadElement.files[0];
      resolve(uploadedFile);
    };

    hiddenUploadElement.click();
  });
}

async function getImageDataFromUpload(uploadedFile) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (progress) => {
      loadImageFromUrl(progress.target.result)
        .then((image) => {
          const context = createContext(image.width, image.height);
          context.drawImage(image, 0, 0);

          resolve(context.getImageData(0, 0, image.width, image.height));
        })
        .catch(reject);
    };

    fileReader.readAsDataURL(uploadedFile);
  });
}

function filterImageData(filter, ...layers) {
  return new Promise((resolve, reject) => {
    if (typeof filter === "string") {
      // filter is a built-in Canvas context filter function
      loadImageFromData(layers[0])
        .then((image) => {
          const context = createContext(image.width, image.height);
          context.filter = filter;
          context.drawImage(image, 0, 0);
          resolve(context.getImageData(0, 0, image.width, image.height));
        })
        .catch(reject);
    } else {
      // filter is a custom function that transforms single pixels
      const result = new ImageData(layers[0].width, layers[0].height);

      for (
        let pixelIndex = 0;
        pixelIndex < layers[0].data.length;
        pixelIndex += 4
      ) {
        const pixels = layers.map((layer) =>
          layer.data.slice(pixelIndex, pixelIndex + 4)
        );

        const newPixel = filter(...pixels);
        newPixel.forEach((subpixel, subpixelIndex) => {
          result.data[pixelIndex + subpixelIndex] = subpixel;
        });
      }

      resolve(result);
    }
  });
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    var image = new Image();

    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject("Something went wrong.");
    };
    image.src = url;
  });
}

function loadImageFromData(imageData) {
  return new Promise((resolve, reject) => {
    const context = createContext(imageData.width, imageData.height);
    context.putImageData(imageData, 0, 0);

    loadImageFromUrl(context.canvas.toDataURL()).then(resolve).catch(reject);
  });
}

function createContext(width, height, canvasElement = null) {
  const canvas = canvasElement || document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d");
}

function downloadImageFromCanvas(canvas, fileName) {
  const hiddenDownloadElement = document.createElement("a");
  hiddenDownloadElement.href = canvas.toDataURL("image/png");
  hiddenDownloadElement.download = `${fileName}-processed.png`;
  hiddenDownloadElement.click();
}

function drawImageDataOnCanvas(canvas, imageData) {
  const context = createContext(imageData.width, imageData.height, canvas);
  context.putImageData(imageData, 0, 0);
}

function clearCanvas(canvas) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
