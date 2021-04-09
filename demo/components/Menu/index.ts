import { $ } from '../../../src/Framework';
import { Collection } from '../../../src/Collection';
import { Component } from '../../../src/Component';

export class Menu extends Component {
  private triggerElementName: string;
  private menuElementName: string;
  private triggerElement: Collection;
  private menuElement: Collection;

  constructor(triggerElementName: string, menuElementName: string) {
    super('Menu', false);

    this.triggerElementName = triggerElementName;
    this.menuElementName = menuElementName;
  }

  public async init(): Promise<void> {
    await super.init();
    
    this.triggerElement = $(this.triggerElementName)
    this.menuElement = $(this.menuElementName);

    if (this.triggerElement.length == 0|| this.menuElement.length == 0) {
      this.warning('missing `triggerElement` or `menuElement`');
    } else {
      this.triggerElement.on('click', (event: Event) => {
        event.preventDefault();
  
        this.triggerElement.toggleClass('active');
        this.menuElement.toggleClass('active');
      });  

      this.success();
    }
  }
}
