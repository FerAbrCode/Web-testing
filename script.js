'use strict';

function getPreviewImageFromTarget(target) {
  if (!target) {
    return null;
  }

  if (target.tagName && target.tagName.toUpperCase() === 'IMG') {
    return target;
  }

  if (typeof target.querySelector === 'function') {
    return target.querySelector('img');
  }

  return null;
}

function upDate(previewTarget) {
  console.log('upDate triggered');
  console.log('previewTarget:', previewTarget);

  const previewPic = getPreviewImageFromTarget(previewTarget);
  if (!previewPic) {
    console.warn('upDate: could not find an image to preview');
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
  imageDiv.style.color = '#ffffff';
  imageDiv.style.backgroundImage = `url('${previewPic.src}')`;
}

function unDo() {
  console.log('unDo triggered');

  const imageDiv = document.getElementById('image');
  if (!imageDiv) {
    console.warn('unDo: missing #image element');
    return;
  }

  imageDiv.style.backgroundImage = "url('')";
  imageDiv.style.color = '#0b3d91';
  imageDiv.textContent = 'Hover over or focus an image tile below to display it here.';
}

// Backwards compatibility for older markup that used undo()
function undo() {
  unDo();
}

function addTabIndexToFigures() {
  console.log('addTabIndexToFigures triggered');

  const figures = document.querySelectorAll('figure.grid-item, figure.flex-item');
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];

    const previewImage = getPreviewImageFromTarget(figure);
    const figcaption = figure.querySelector('figcaption');
    const labelText = (figcaption && figcaption.textContent && figcaption.textContent.trim()) || (previewImage && previewImage.alt) || 'Gallery item';

    // Make figure keyboard-focusable
    figure.setAttribute('tabindex', '0');

    // Give the focusable element an interactive role and an accessible label
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Preview: ${labelText}`);
  }
}

function logGalleryImages() {
  console.log('logGalleryImages triggered');

  const images = document.querySelectorAll('.grid-item img, .flex-item img');
  for (let i = 0; i < images.length; i++) {
    console.log(`Image ${i + 1}:`, images[i].alt, images[i].src);
  }
}

function addGalleryEventListeners() {
  console.log('addGalleryEventListeners triggered');

  const figures = document.querySelectorAll('figure.grid-item, figure.flex-item');
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];

    figure.addEventListener('mouseover', function () {
      console.log('mouseover triggered');
      upDate(figure);
    });

    figure.addEventListener('mouseleave', function () {
      console.log('mouseleave triggered');
      unDo();
    });

    figure.addEventListener('focus', function () {
      console.log('focus triggered');
      upDate(figure);
    });

    figure.addEventListener('blur', function () {
      console.log('blur triggered');
      unDo();
    });

    figure.addEventListener('click', function () {
      console.log('click triggered');
      upDate(figure);
    });

    figure.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        console.log('keydown (activate) triggered');
        event.preventDefault();
        upDate(figure);
      }
    });
  }
}

function initInteractiveGallery() {
  console.log('initInteractiveGallery (onload) triggered');

  const imageDiv = document.getElementById('image');
  if (!imageDiv) {
    console.log('initInteractiveGallery: no #image found; skipping');
    return;
  }

  // Ensure the preview area starts in a known state
  unDo();
  logGalleryImages();
  addTabIndexToFigures();
  addGalleryEventListeners();
}

window.addEventListener('load', initInteractiveGallery);
