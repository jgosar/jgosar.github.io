function downloadImage() {
  //To download a file with a custom name, we need to use an element like this <a href="file_url" download="file_name">Download</a>
  //In our case, we don't have a file URL, but we can use a data URL, which behaves in the same way. So let's create this virtual <a> element and click on it:
  const hiddenDownloadElement = document.createElement('a');
  const imageCanvas = document.getElementById('imageCanvas');
  hiddenDownloadElement.href = imageCanvas.toDataURL("image/png");
  hiddenDownloadElement.download = 'house.png';
  hiddenDownloadElement.click();
}

function switchDisplay() {
  const beforeDrawing = document.getElementById('beforeDrawing');
  beforeDrawing.style.display = 'none';
  const afterDrawing = document.getElementById('afterDrawing');
  afterDrawing.style.display = 'block';
}
