import { $ } from '../../../src/Framework';
import { Elem } from '../../../src/Collection/Types';
import { Component } from '../../../src/Component';
import BS_Carousel from 'bootstrap/js/dist/carousel';

export class Carousel extends Component {

  constructor() {
    super('Carousel', true);
  }

  public async init(): Promise<void> {
    await super.init();
    
    $('.carousel').forEach((carousel: Elem) => {
      new BS_Carousel(carousel);

      // here you can add events or whatever
    });

    this.success();
  }
}
