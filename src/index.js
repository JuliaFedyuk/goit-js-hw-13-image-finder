import './styles.css';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import imageService from './js/apiService';
import updateImagesMarkup from './js/updateImagesMarkup';
import lightbox from './js/lightbox';
import { notice, error, info } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

refs.searchInput.addEventListener(
  'input',
  debounce(() => {
    imageService.query = refs.searchInput.value;
    clearImagesContainer();

    imageService.resetPage();

    if (refs.searchInput.value === '') {
      refs.loadButton.classList.add('is-hidden');
      info({
        text: 'Please enter a valid searchkey!',
        delay: 2000,
        hide: true,
      });
      return;
    }
    fetchImages();
  }, 500),
);

refs.loadButton.addEventListener('click', fetchImages);

function fetchImages() {
  refs.loadButton.classList.add('is-hidden');
  refs.spinner.classList.add('spinner-border');
  imageService
    .fetchImages()
    .then(images => {
      if (!images.length) {
        refs.loadButton.classList.add('is-hidden');
        error({
          text: 'Sorry! Can`t find any matches! Please try again!',
          delay: 2000,
          hide: true,
        });
        return;
      }
      updateImagesMarkup(images);

      refs.loadButton.classList.remove('is-hidden');
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .finally(() => {
      refs.spinner.classList.remove('spinner-border');
    });
}

function clearImagesContainer() {
  refs.galleryList.innerHTML = '';
}

lightbox();
