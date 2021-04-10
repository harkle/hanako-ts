import { Collection } from '../Collection';
import { $ } from '../Framework';
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1)
        return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}
/**
 * Await for document to be ready
 */
export function ready() {
    return new Promise((resolve) => {
        if (document.readyState != 'loading') {
            resolve();
        }
        else {
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
export function imagesLoaded(images) {
    return new Promise((resolve) => {
        var images = (images) ? images : $('img');
        var imagesLoaded = 0;
        function countLoadedImage() {
            if (++imagesLoaded == images.length)
                resolve();
        }
        images.forEach((image) => {
            if (image.complete) {
                countLoadedImage();
            }
            else {
                $(image).on(['load', 'error'], countLoadedImage);
            }
        });
        if (images.length == 0)
            resolve();
    });
}
/**
 * Scroll the page to a specific position
 */
export function scrollTo(to, duration = 500) {
    var start = window.pageYOffset;
    var change = to - start;
    var currentTime = 0;
    var increment = 15;
    var animateScroll = function () {
        currentTime += increment;
        window.scrollTo(0, easeInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration)
            setTimeout(animateScroll, increment);
    };
    animateScroll();
}
/**
 *  Create a *Collection* from a string
 */
export function parseHTML(html) {
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
export function addHelpers(base) {
    return Object.assign(base, Helpers);
}
