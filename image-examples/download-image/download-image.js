function downloadImage() {
  let hiddenDownloadElement = document.createElement('a');
  var canvas = document.getElementById('imageCanvas');
  hiddenDownloadElement.href = canvas.toDataURL("image/png");
  hiddenDownloadElement.download = 'house.png';
  hiddenDownloadElement.click();
}
