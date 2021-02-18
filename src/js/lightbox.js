import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import refs from './refs';

const lightbox = () => {
  refs.body.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    const pic = event.target.src;
    const instance = basicLightbox.create(`<img src=${pic}>`);
    instance.show();
  });
};

export default lightbox;
