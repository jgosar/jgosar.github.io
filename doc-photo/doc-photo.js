const pageState = {
  imageData: null,
  fileName: null,
  threshold: 10,
  allowShades: false,
  processedImageData: null,
  statusMessage: null,
};

function updateThreshold() {
  pageState.threshold = parseInt(
    document.getElementById("thresholdInput").value
  );

  filterAndDrawImage();
}

function updateAllowShades() {
  pageState.allowShades = document.getElementById("allowShadesInput").checked;

  filterAndDrawImage();
}

async function processUploadedFile(uploadedFile) {
  pageState.imageData = await getImageDataFromUpload(uploadedFile);
  pageState.fileName = uploadedFile.name;

  pageState.statusMessage = `Succesfully loaded image. The image size is ${pageState.imageData.width}x${pageState.imageData.height} pixels. The uploaded file's name is "${pageState.fileName}".`;
  updateUI();
  filterAndDrawImage();
}

async function filterAndDrawImage() {
  pageState.processedImageData = null;
  updateUI();
  pageState.processedImageData = await docPhotoFilter(
    pageState.imageData,
    pageState.threshold,
    pageState.allowShades
  );
  updateUI();
}

function downloadProcessedImage() {
  const previewCanvas = document.getElementById("preview");
  downloadImageFromCanvas(previewCanvas, pageState.fileName);
}

async function docPhotoFilter(imageData, threshold, allowShades) {
  blurredImageData = await filterImageData("blur(100px)", imageData);
  return await filterImageData(
    markDarkerPixels(threshold, allowShades),
    imageData,
    blurredImageData
  );
}

function markDarkerPixels(threshold, allowShades) {
  return (imagePixel, blurredPixel) => {
    const brightness = getPixelBrightness(imagePixel);
    const blurredBrightness = getPixelBrightness(blurredPixel);
    let outputBrightness;
    if (brightness < blurredBrightness - threshold) {
      outputBrightness = allowShades
        ? Math.max(0, 150 + brightness - (blurredBrightness - threshold))
        : 0;
    } else {
      outputBrightness = 255;
    }
    return [outputBrightness, outputBrightness, outputBrightness, 255];
  };
}

function getPixelBrightness(pixel) {
  return (pixel[0] + pixel[1] + pixel[2]) / 3;
}

function updateUI() {
  document.getElementById("thresholdInput").value = pageState.threshold;
  document.getElementById("allowShadesInput").checked = pageState.allowShades;
  document.getElementById("statusMessage").innerText = pageState.statusMessage;

  const previewCanvas = document.getElementById("preview");
  if (pageState.processedImageData === null) {
    clearCanvas(previewCanvas);
  } else {
    drawImageDataOnCanvas(previewCanvas, pageState.processedImageData);
  }
}

window.onload = function () {
  updateUI();
};
