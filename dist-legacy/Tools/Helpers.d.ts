import { Collection } from '../Collection';
import { Func } from '../Framework';
/**
 * Await for document to be ready
 */
export declare function ready(): Promise<void>;
/**
 * Await for a set of images to be loaded.
 * If parameter *images* is omitted, the function takes all document image.
 */
export declare function imagesLoaded(images?: Collection): Promise<void>;
/**
 * Scroll the page to a specific position
 */
export declare function scrollTo(to: number, duration?: number): void;
/**
 *  Create a *Collection* from a string
 */
export declare function parseHTML(html: string): Collection;
/**
* @ignore
*/
export declare function addHelpers<B extends Func>(base: B): B & {
    ready: typeof ready;
    imagesLoaded: typeof imagesLoaded;
    scrollTo: typeof scrollTo;
    parseHTML: typeof parseHTML;
};
