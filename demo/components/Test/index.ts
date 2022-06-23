import { $ } from '../../../src/Framework';
import { Elem } from '../../../src/Collection/Types';
import { Collection } from '../../../src/Collection';
import { Component } from '../../../src/Component';
import { traverse } from './Traverse';
import { AudioPlayer } from '../AudioPlayers';

export class Test extends Component {

  constructor() {
    super('Test', false);
  }

  public async init(): Promise<void> {
    await super.init();

    $('.jump-to a').on('click', (event: MouseEvent, link: Collection) => {
      event.preventDefault();

      $.scrollTo($(link.attr('href')).position().y - 55);
    });

    // Selector
    const selectorDemoElement: Collection = $('#selector-demo');
    console.groupCollapsed('Selector demo\t\t%c$(\'#selector-demo\')', 'color: #ff9900');
    console.log(selectorDemoElement);
    this.log('selector', '$(\'#selector-demo\');', '', '\t');
    this.log('selector', selectorDemoElement);
    console.groupEnd();

    // Manipulation
    const manipulationDemoElement: Collection = $('#manipulation-demo *');
    console.groupCollapsed('Manipulation demo\t%c$(\'#manipulation-demo *\')', 'color: #ff9900');

    console.log('%c.length', 'color: #ff9900');
    console.log(manipulationDemoElement.length);
    this.log('manipulation', '$(\'#manipulation-demo *\').length', '', '\t\t\t\t');
    this.log('manipulation', manipulationDemoElement.length, '', '<br>');

    console.log('%c.forEach((item: Elem) => { ... })', 'color: #ff9900');
    this.log('manipulation', '$(\'#manipulation-demo *\').forEach((item: Elem) => { ... })', '', '\t');
    manipulationDemoElement.forEach((item: Elem, index: number) => {
      console.log(item);

      let separator = (index < manipulationDemoElement.length - 1) ? ', ' : '<br>';
      this.log('manipulation', item, '', separator);
    });

    console.log('%c.each((item: Collection) => { ... })', 'color: #ff9900');
    this.log('manipulation', '$(\'#manipulation-demo *\').each((item: Elem) => { ... })', '', '\t\t');
    manipulationDemoElement.each((item: Collection, index: number) => {
      console.log(item);

      let separator = (index < manipulationDemoElement.length - 1) ? ', ' : '<br>';
      this.log('manipulation', item, '', separator);
    });

    console.log('%c.get(0)', 'color: #ff9900');
    this.log('manipulation', '$(\'#manipulation-demo *\').get(0)', '', '\t\t\t\t');
    console.log(manipulationDemoElement.get(0));
    this.log('manipulation', manipulationDemoElement.get(0), '', '<br>');

    console.log('%c.eq(0)', 'color: #ff9900');
    this.log('manipulation', '$(\'#manipulation-demo *\').eq(0)', '', '\t\t\t\t\t');
    console.log(manipulationDemoElement.eq(0));
    this.log('manipulation', manipulationDemoElement.eq(0), '', '<br>');

    console.log('%c.add($(\'#selector-demo\'))', 'color: #ff9900');
    this.log('manipulation', '$(\'#manipulation-demo *\').add($(\'#selector-demo\').get(0))', '', '\t');
    manipulationDemoElement.add($('#selector-demo').get(0));
    console.log(manipulationDemoElement);
    this.log('manipulation', manipulationDemoElement, '', '<br>');

    console.log('%c.search($(\'span\'))', 'color: #ff9900');
    this.log('manipulation', '$(\'#manipulation-demo *\').search(\'span\'))', '', '\t\t\t');
    console.log(manipulationDemoElement.search('span'));
    this.log('manipulation', manipulationDemoElement.search('span'));
    console.groupEnd();

    // Traversing
    const traversingnDemoElement: Collection = $('#traversing-demo .second');
    console.groupCollapsed('Traversing demo\t\t%c$(\'#Traversing-demo .second\')', 'color: #ff9900');

    console.log('%c.prev()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo .second\').prev()', '', '\t\t');
    console.log(traversingnDemoElement.prev());
    this.log('traversing', traversingnDemoElement.prev(), '', '<br>');

    console.log('%c.next()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo .second\').next()', '', '\t\t');
    console.log(traversingnDemoElement.next());
    this.log('traversing', traversingnDemoElement.next(), '', '<br>');

    console.log('%c.prevAll()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo .third\').prevAll()', '', '\t\t');
    console.log($('#traversing-demo .third').prevAll());
    this.log('traversing', $('#traversing-demo .third').prevAll(), '', '<br>');

    console.log('%c.nextAll()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo .first\').nextAll()', '', '\t\t');
    console.log($('#traversing-demo .first').nextAll());
    this.log('traversing', $('#traversing-demo .first').nextAll(), '', '<br>');

    console.log('%c.first()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo span\').first()', '', '\t\t');
    console.log($('#traversing-demo span').first());
    this.log('traversing', $('#traversing-demo span').first(), '', '<br>');

    console.log('%c.last()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo span\').last()', '', '\t\t');
    console.log($('#traversing-demo span').last());
    this.log('traversing', $('#traversing-demo span').last(), '', '<br>');

    console.log('%c.parent()', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo .second\').parent()', '', '\t\t');
    console.log(traversingnDemoElement.parent());
    this.log('traversing', traversingnDemoElement.parent(), '', '<br>');

    console.log('%c.parents(\'.col\')', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo .second\').parents(\'.row\')', '', '\t');
    console.log(traversingnDemoElement.parents('.row'));
    this.log('traversing', traversingnDemoElement.parents('.row'), '', '<br>');

    console.log('%c.find(\'em\')', 'color: #ff9900');
    this.log('traversing', '$(\'#traversing-demo span\').find(\'em\')', '', '\t\t');
    console.log($('#traversing-demo span').find('em'));
    this.log('traversing', $('#traversing-demo span').find('em'), '', '<br>');
    console.groupEnd();

    // HTML
    console.groupCollapsed('HTML demo');

    this.log('html', '$(\'#html-demo > *\').clone()', '', '\t\t\t\t');
    console.log($('#html-demo > *').clone());
    this.log('html', $('#html-demo > *').clone(), '', '<br>');

    this.log('html', '$(\'#html-demo .empty\').empty()', '', '\t\t\t\t');
    console.log($('#html-demo .empty').empty());
    this.log('html', $('#html-demo .empty').empty(), '', '<br>');

    this.log('html', '$(\'#html-demo .remove\').remove()', '', '\t\t\t');
    console.log($('#html-demo .remove[data-id="1"]').remove());
    this.log('html', $('#html-demo .remove[data-id="2"]').remove(), '', '<br>');

    this.log('html', '$(\'#html-demo .prepend\').prepend($(\'.to-prepend\'))', '', '\t');
    console.log($('#html-demo .prepend').prepend($('.to-prepend')));
    this.log('html', $('#html-demo .prepend'), '', '<br>');

    this.log('html', '$(\'#html-demo .append\').append($(\'.to-append\'))', '', '\t\t');
    console.log($('#html-demo .append').append($('.to-append')));
    this.log('html', $('#html-demo .append'), '', '<br>');

    this.log('html', '$(\'#html-demo .before\').before($(\'.to-before\'))', '', '\t\t');
    console.log($('#html-demo .before').before($('.to-before')));
    this.log('html', $('#html-demo .before'), '', '<br>');

    this.log('html', '$(\'#html-demo .after\').after($(\'.to-after\'))', '', '\t\t');
    console.log($('#html-demo .after').after($('.to-after')));
    this.log('html', $('#html-demo .after'), '', '<br>');

    this.log('html', '$(\'#html-demo .wrap\').wrap($(\'.wrapper\'))', '', '\t\t');
    console.log($('#html-demo .wrap').wrap($('.wrapper')));
    this.log('html', $('#html-demo .wrap'), '', '<br>');

    this.log('html', '$(\'#html-demo .html\').html()', '', '\t\t\t\t');
    console.log($('#html-demo .html').html());
    this.log('html', $('#html-demo .html').html(), '', '<br>');

    this.log('html', '$(\'#html-demo .html\').html(\'7: modified html\')', '', '\t\t');
    console.log($('#html-demo .html').html('7: modified html'));
    this.log('html', $('#html-demo .html').html('7: modified html'), '', '<br>');

    this.log('html', '$(\'#html-demo .text\').text()', '', '\t\t\t\t');
    console.log($('#html-demo .text').text());
    this.log('html', $('#html-demo .text').text(), '', '<br>');

    this.log('html', '$(\'#html-demo .text\').html(\'8: modified text\')', '', '\t\t');
    console.log($('#html-demo .text').text('8: modified text'));
    this.log('html', $('#html-demo .text').text('8: modified text'), '', '<br>');

    this.log('html', '$(\'#html-demo .atr\').attr(\'title\')', '', '\t\t\t');
    console.log($('#html-demo .atr').attr('title'));
    this.log('html', $('#html-demo .atr').attr('title'), '', '<br>');

    this.log('html', '$(\'#html-demo .atr\').attr(\'title\', \'new title\')', '', '\t\t');
    console.log($('#html-demo .atr').attr('title', 'new title'));
    this.log('html', $('#html-demo .atr').attr('title', 'new title'), '', '<br>');

    this.log('html', '$(\'#html-demo .atr\').removeAttr(\'alt\')', '', '\t\t\t');
    console.log($('#html-demo .atr').removeAttr('alt'));
    this.log('html', $('#html-demo .atr').removeAttr('alt'), '', '<br>');

    this.log('html', '$(\'#html-demo .data\').data(\'test\')', '', '\t\t\t');
    console.log($('#html-demo .data').data('test'));
    this.log('html', $('#html-demo .data').data('test'), '', '<br>');

    this.log('html', '$(\'#html-demo .data\').data(\'alt\', \'new dataset value\')', '', '\t');
    console.log($('#html-demo .data').data('test', 'new dataset value'));
    this.log('html', $('#html-demo .data').data('test', 'new dataset value'), '', '<br>');
    console.groupEnd();

    // CSS
    console.groupCollapsed('CSS demo');

    this.log('css', "$('.has-class-1').hasClass('text-warning')", '', '\t\t\t');
    console.log($('.has-class-1').hasClass('text-warning'));
    this.log('css', $('.has-class-1').hasClass('text-warning'), '', '<br>');

    this.log('css', "$('.has-class-2').hasClass('text-warning')", '', '\t\t\t');
    console.log($('.has-class-2').hasClass('text-warning'));
    this.log('css', $('.has-class-2').hasClass('text-warning'), '', '<br>');

    this.log('css', "$('.add-class').addClass('text-warning')", '', '\t\t\t');
    console.log($('.add-class').addClass('text-warning'));
    this.log('css', $('.add-class').addClass('text-warning'), '', '<br>');

    this.log('css', "$('.remove-class').removeClass('text-warning')", '', '\t\t\t');
    console.log($('.remove-class').removeClass('text-warning'));
    this.log('css', $('.remove-class').removeClass('text-warning'), '', '<br>');

    this.log('css', "$('.toggle-class').toggleClass('text-warning')", '', '\t\t\t');
    console.log($('.toggle-class').toggleClass('text-warning'));
    this.log('css', $('.toggle-class'), '', '<br>');

    this.log('css', "$('.css-get').css('color')", '', '\t\t\t\t\t');
    console.log($('.css-get').css('color'));
    this.log('css', $('.css-get').css('color'), '', '<br>');

    this.log('css', "$('.css-set').css('color', '#ff00ff')", '', '\t\t\t\t');
    console.log($('.css-set').css('color', '#ff00ff'));
    this.log('css', $('.css-set').css('color', '#ff00ff'), '', '<br>');

    this.log('css', "$('.css-set').css({'font-weight': 500, 'font-size': '.5rem'})", '', '\t');
    this.log('css', $('.css-set').css({ 'font-weight': 500, 'font-size': '.5rem' }), '', '<br>');

    console.groupEnd();

    // Dimensions
    console.groupCollapsed('Dimensions demo');
    this.log('dimension', "$('#dimensions-test').width()", '', '\t\t\t\t\t');
    console.log($('#dimensions-test').width());
    this.log('dimension', $('#dimensions-test').width(), '', '<br>');

    this.log('dimension', "$('#dimensions-test').width('calc(100% - 175px)')", '', '\t\t');
    console.log($('#dimensions-test').width('calc(100% - 175px)'));
    this.log('dimension', $('#dimensions-test').width('calc(100% - 175px)'), '', '<br>');

    this.log('dimension', "$('#dimensions-test').height()", '', '\t\t\t\t\t');
    console.log($('#dimensions-test').height());
    this.log('dimension', $('#dimensions-test').height(), '', '<br>');

    this.log('dimension', "$('#dimensions-test').height(350)", '', '\t\t\t\t');
    console.log($('#dimensions-test').height(350));
    this.log('dimension', $('#dimensions-test').height(350), '', '<br>');

    this.log('dimension', "$('#dimensions-test').position()", '', '\t\t\t\t');
    console.log($('#dimensions-test').position());
    this.log('dimension', $('#dimensions-test').position(), '', '<br>');

    this.log('dimension', "$('#dimensions-test').position('#dimensions-reference')", '', '\t\t');
    console.log($('#dimensions-test').position('#dimensions-reference'));
    this.log('dimension', $('#dimensions-test').position('#dimensions-reference'), '', '<br>');

    this.log('dimension', "$('#dimensions-test').viewportPosition()", '', '\t\t\t');
    console.log($('#dimensions-test').viewportPosition());
    this.log('dimension', $('#dimensions-test').viewportPosition(), '<span id="viewport-position-log">', '</span><br>');

    $(window).on('scroll', () => {
      $('#viewport-position-log').html(traverse($('#dimensions-test').viewportPosition()));
    });

    console.groupEnd();

    // Events
    $(window).on('resize', () => {
      $('#event-resize').html(traverse({ width: $(window).width(), height: $(window).height() }))
    });

    $('.button-click').on('click', (event: MouseEvent, item: Collection) => {
      $('#event-click').html((new Date()).getTime() + '&#9;' + traverse(event) + '&#9;' + traverse(item));
    });

    $('.button-click-once').on('click', (event: MouseEvent, item: Collection) => {
      $('#event-click-once').html((new Date()).getTime() + '&#9;' + traverse(event) + '&#9;' + traverse(item));
      $('.button-click-once').off('click');
    });

    $(document).on('click', '.button-delegate-click', (event: MouseEvent, item: Collection) => {
      $('#event-click-delegate').html((new Date()).getTime() + '&#9;' + traverse(event) + '&#9;' + traverse(item));
    });

    $('.button-trigger').on('click', (event: MouseEvent, item: Collection) => {
      $('.button-click').trigger('click');
      $('#event-trigger').html((new Date()).getTime() + '&#9;' + traverse(event) + '&#9;' + traverse(item));
    });

    // Network
    $('.button-load-text').on('click', async () => {
      let text: string = await $.httpRequest({
        url: 'ajax.txt',
        dataType: 'text',
      });

      console.log(text);
      $('#network-console').empty();
      this.log('network', text);
      $('#ajax-target').text(text);
    });

    $('.button-load-json').on('click', async () => {
      let json: object = await $.httpRequest({
        url: 'ajax.json',
        dataType: 'json',
      });

      console.log(json);
      $('#network-console').empty();
      this.log('network', json);
      $('#ajax-target').html('');
    });

    $('.button-load-html').on('click', async () => {
      let html: Collection = await $.httpRequest({
        url: 'ajax.html',
        dataType: 'html',
      });

      $('#network-console').empty();
      this.log('network', html);
      $('#ajax-target').empty().append(html);
    });

    // Helpers
    $('.button-scroll-top').on('click', () => {
      $.scrollTo(0);
    });

    let p: Collection = $.parseHTML('<p>This is a <strong>bold</strong> text.</p>');
    $('#parsehtml-target').append(p);
    this.log('parsehtml', p);

    // Audio player
    let audioPlayer: AudioPlayer = new AudioPlayer('http://ccmixter.org/content/speck/speck_-_Dupe_Dodging.mp3');

    $('#play-audio').on('click', () => {
      audioPlayer.play();
    });

    $('#pause-audio').on('click', () => {
      audioPlayer.pause();
    });

    this.success();
  }

  private log(target: string, message: any, before: string = '', after: string = '', showTime: boolean = false) {
    let time = '';

    if (showTime) {
      const date: Date = new Date();

      const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
      const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
      const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

      time = hours + ':' + minutes + ':' + seconds + '\t';
    }

    if (typeof message === 'object') message = traverse(message);
    if (typeof message === 'number') message = '<span class="attr">' + message + '</span>';

    $('#' + target + '-console').html(time + before + message + after, true);
  }
}

