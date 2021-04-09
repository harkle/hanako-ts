import { Events } from './Collection/Events';
import { Selector } from './Collection/Types';

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
  constructor(selector?: Selector) {
    super(selector);
  }
}
