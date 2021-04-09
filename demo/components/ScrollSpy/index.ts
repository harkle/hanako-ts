import { $ } from '../../../src/Framework';
import { Collection } from '../../../src/Collection';
import { Elem } from '../../../src/Collection/Types';
import { Component } from '../../../src/Component';

export class ScrollSpy extends Component {
  private menuElementName: string;
  private sectionClass: string;
  private link: Collection;
  private sections: Collection;
  private headerHeight: number;

  constructor(menuElementName: string, sectionClass: string, headerHeight: number) {
    super('ScrollSpyComponent', false);

    this.menuElementName = menuElementName;
    this.sectionClass = sectionClass;
    this.headerHeight = headerHeight;
  }

  public async init(): Promise<void> {
    await super.init();
    
    this.link = $(this.menuElementName + ' a');
    this.sections = $(this.sectionClass);

    if (this.link.length == 0 || this.sections.length == 0) {
      this.warning('missing `link` or `sections`');
    } else {

      $(window).on('scroll', () => {
        this.spy();
      });

      this.spy();
      this.success();
    }

    this.link.on('click', (event: Event) => {
      event.preventDefault();

      var target: Collection = $($(event.target).attr('href'));
      var top: number = (target.get(0) === this.sections.get(0)) ? 0 : target.position().y - this.headerHeight + 1;

      $.scrollTo(top);
    });
  }

  public spy(): void {
    var currentID = '';

    this.sections.forEach((section: Elem) => {
      if (section.getBoundingClientRect().y <= this.headerHeight) currentID = $(section).attr('id');
    });

    if (currentID) {
      this.link.removeClass('active').search('[href="#' + currentID + '"]').addClass('active');
    }
  }
}
