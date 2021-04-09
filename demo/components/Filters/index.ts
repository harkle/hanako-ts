import { $ } from '../../../src/Framework';
import { Collection } from '../../../src/Collection';
import { Component } from "../../../src/Component";

export class Filters extends Component {
  private filtersElementName: string;
  private contentElementName: string;
  private filtersElements: Collection;
  private allowMultiSelection: boolean;
  private elements: Collection;
  private idsToFilter: Array<number> = [];

  constructor(filtersElementName: string, contentElementName: string, allowMultiSelection: boolean) {
    super('Filters', false);

    this.filtersElementName = filtersElementName;
    this.contentElementName = contentElementName;
    this.allowMultiSelection = allowMultiSelection;
  }

  public async init(): Promise<void> {
    await super.init();
  
    this.filtersElements = $(this.filtersElementName + ' a');
    this.elements = $(this.contentElementName + ' .element');

    if (this.filtersElements.length == 0 || this.elements.length == 0) {
      this.warning('missing `filtersElement` or `contentElement`');
    } else {
      this.filtersElements.on('click', (event: Event) => {
        event.preventDefault();

        this.filterClickHandler($(event.target));
      });

      this.success();
    }
  }

  private filterClickHandler(filterElement: Collection) {
    const elementID: number = +filterElement.data('id');

    /* all clicked =>  restore */
    if (elementID == 0) {
      this.idsToFilter = [];

      this.elements.addClass('active');

      return;
    }

    /* deactivate filter if active */
    if (filterElement.hasClass('active')) {
      filterElement.removeClass('active');

      const index = this.idsToFilter.indexOf(elementID, 0);
      if (index > -1) {
        this.idsToFilter.splice(index, 1);
      }

      if (this.idsToFilter.length == 0)  this.filtersElements.search('[data-id="0"]').addClass('active')
    } else {
      /* deactivate all filter */
      if (!this.allowMultiSelection) {
        this.idsToFilter = [];

        this.filtersElements.removeClass('active');
      }

      /* activate the clicked one */
      filterElement.addClass('active');

      this.idsToFilter.push(elementID);
    }

    this.filterElements();
  }

  private filterElements(): void {
    /* show all element */
    if (this.idsToFilter.length == 0) {
      this.elements.addClass('active');

      return;
    }

    /* hide all element */
    this.elements.removeClass('active');

    /* ID provided, filters elements */
    this.idsToFilter.forEach(id => {
      $(this.contentElementName + ' .element[data-id="' + id + '"]').addClass('active')
    });
  }
}
