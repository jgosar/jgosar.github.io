function copyImage() {
  //We need the image to be drawn on a canvas in order to copy it to the clipboard, luckily in our example it already is on a canvas
  //But if you wanted to do this with an <img> element, you would first have to render the image onto a canvas. You can see how that is done in common.js after document.createElement('canvas');
  const canvas = document.getElementById('imageCanvas');

  //The Canvas.toBlob function gets image file data from the canvas. If no parameters are supplied, you get a PNG image, but if you wish, can also get a JPG with a specified compression level
  //See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
  canvas.toBlob((blob) => {
    // Now that we got the image file data, we can just write it to the clipboard. Unfortunately, not all browsers support this feature
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });
}

function switchDisplay() {
  const beforeDrawing = document.getElementById('beforeDrawing');
  beforeDrawing.style.display = 'none';
  const afterDrawing = document.getElementById('afterDrawing');
  afterDrawing.style.display = 'block';
}
