'use strict';

function upDate(previewPic) {
  console.log('upDate triggered');
  console.log('previewPic:', previewPic);

  if (!previewPic) {
    return;
  }

  console.log('alt:', previewPic.alt);
  console.log('src:', previewPic.src);

  const imageDiv = document.getElementById('image');
  if (!imageDiv) {
    console.warn('upDate: missing #image element');
    return;
  }

  imageDiv.textContent = previewPic.alt || '';
  imageDiv.style.backgroundImage = `url('${previewPic.src}')`;
}

function undo() {
  console.log('undo triggered');

  const imageDiv = document.getElementById('image');
  if (!imageDiv) {
    console.warn('undo: missing #image element');
    return;
  }

  imageDiv.style.backgroundImage = "url('')";
  imageDiv.textContent = 'Hover over an image below to display here.';
}
