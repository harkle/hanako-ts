import { Collection } from '../Collection';
import { Func, $ } from '../Framework';
import { Elem } from '../Collection/Types';


function easeInOutQuad(t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

/**
 * Await for document to be ready
 */
export function ready(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState != 'loading') {
      resolve();
    } else {
      $(document).on('DOMContentLoaded', function () {
        resolve();
      });
    }
  });
}

/**
 * Await for a set of images to be loaded.
 * If parameter *images* is omitted, the function takes all document image.
 */
export function imagesLoaded(images?: Collection): Promise<void> {
  return new Promise((resolve) => {
    var images: Collection = (images) ? images : $('img');
    var imagesLoaded: number = 0;

    function countLoadedImage(): void {
      if (++imagesLoaded == images.length) resolve();
    }

    images.forEach((image: Elem) => {
      if (image.complete) {
        countLoadedImage();
      } else {
        $(image).on(['load', 'error'], countLoadedImage);
      }
    });

    if (images.length == 0) resolve();
  });
}

/**
 * Scroll the page to a specific position
 */
export function scrollTo(to: number, duration: number = 500): void {
  var start: number = window.pageYOffset;
  var change: number = to - start;
  var currentTime: number = 0;
  var increment: number = 15;

  var animateScroll = function () {
    currentTime += increment;

    window.scrollTo(0, easeInOutQuad(currentTime, start, change, duration));
    if (currentTime < duration) setTimeout(animateScroll, increment);
  };

  animateScroll();
}

/**
 *  Create a *Collection* from a string
 */
export function parseHTML(html: string): Collection {
  var tempDocument = document.implementation.createHTMLDocument();
  tempDocument.body.innerHTML = html;

  return new Collection(tempDocument.body.children);
}

const Helpers = {
  ready: ready,
  imagesLoaded: imagesLoaded,
  scrollTo: scrollTo,
  parseHTML: parseHTML
};

/**
* @ignore
*/
export function addHelpers<B extends Func>(base: B) {
  return Object.assign(base, Helpers);
}
