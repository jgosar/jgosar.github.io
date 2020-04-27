function copyImage() {
  var canvas = document.getElementById('imageCanvas');
  canvas.toBlob(function (blob) {
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]);
  });
}
