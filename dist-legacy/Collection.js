import { Events } from './Collection/Events';
/**
 * A collection of HTML elements with shortcut methodes to simplify manipulation
 */
export class Collection extends Events {
    /**
     * *selector* can be:
     * - a string containing a CSS query
     * - a single *Elem*
     * - an array of *Elem*
     */
    constructor(selector) {
        super(selector);
    }
}
