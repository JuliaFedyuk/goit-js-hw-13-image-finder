import refs from './refs';
import galleryTmpl from '../templates/galleryTmpl.hbs';
import { notice, error, success } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

function updateImagesMarkup(images) {
  const markup = galleryTmpl(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
  success({
    text: 'Click on picture to make it bigger) ',
    delay: 3000,
    hide: true,
  });
}

export default updateImagesMarkup;
