import { $ } from '../../../src/Framework';
import { Collection } from '../../../src/Collection';
import { Component } from '../../../src/Component';
import { Elem, Selector } from '../../../src/Collection/Types';

export class AudioPlayer extends Collection {
  private audioElement: Collection;
  private container: Collection;
  private buttonPlayPause: Collection;
  private buttonMute: Collection;
  private currentTimeIndicator: Collection;
  private durationIndicator: Collection;
  private seekSlider: Collection;
  private volumeSlider: Collection;
  private customSkin: boolean;
  private headLess: boolean;

  private audio: Elem;
  private volumeLevel: number = 1;

  constructor(selector?: Selector) {
    super();

    if (typeof selector == 'string' && this.elements.length == 0) {
      this.audioElement = $.parseHTML('<audio src="' + selector + '" preload="metadata"></audio>');
      this.headLess = true;
      this.customSkin = false;

      $('body').append(this.audioElement);
    } else {
      this.audioElement = $(selector);
      this.headLess = false;

      if (!this.audioElement.parent().hasClass('ab-audio-player-container')) {
        this.constructHTML();
        this.customSkin = false;
      } else {
        this.bindElements();
        this.customSkin = true;
      }

      this.setupEvents();
    }

    this.audio = this.audioElement.get(0);
    this.add(this.audio);
  }

  protected constructHTML() {
    this.audioElement.wrap($.parseHTML('<div class="ht-audio-player-container d-flex align-items-center">'));
    this.container = this.audioElement.parent();

    this.buttonPlayPause = $.parseHTML('<button class="btn btn-primary button-play-pause" data-status="paused"><i class="bi bi-play-circle"></i><i class="bi bi-pause-circle d-none"></i></button>');
    this.seekSlider = $.parseHTML('<input type="range" value="0" class="form-range flex-grow-1 slider-seek mx-1">');
    this.currentTimeIndicator = $.parseHTML('<span class="label-current-time">0:00</span>');
    this.durationIndicator = $.parseHTML('<span class="label-duration">0:00</span>');
    this.buttonMute = $.parseHTML('<button class="btn btn-outline-primary button-mute" data-status="unmuted"><i class="bi bi-volume-mute"></i><i class="bi bi-volume-mute-fill d-none"></i></button>');
    this.volumeSlider = $.parseHTML('<input type="range" value="100" min="0" max="100" class="form-range slider-volume mx-1" style="width: 100px">');

    const indicators = $.parseHTML('<div class="indicators mx-1" style="font-family: var(--bs-font-monospace)";></div>');
    const separator = $.parseHTML('<span>/</span>');
    indicators.append([this.currentTimeIndicator, separator, this.durationIndicator]);
    
    console
    this.container.append([this.buttonPlayPause, this.seekSlider, indicators, this.buttonMute, this.volumeSlider]);
  }

  private bindElements() {
    this.container = this.audioElement.parent();

    this.buttonPlayPause = this.container.find('.button-play-pause');
    this.buttonMute = this.container.find('.button-mute');
    this.currentTimeIndicator = this.container.find('.label-current-time');
    this.durationIndicator = this.container.find('.label-duration');
    this.seekSlider = this.container.find('.slider-seek');
    this.volumeSlider = this.container.find('.slider-volume');
  }

  private setupEvents() {
    this.audioElement.on('loadedmetadata', () => {
      const duration: number = this.audio.duration;

      this.seekSlider.attr('max', Math.floor(duration));
      this.durationIndicator.html(this.calculateTime(duration));
    }).on('timeupdate', () => {
      const currentTime: number = this.audio.currentTime;

      this.currentTimeIndicator.html(this.calculateTime(currentTime));
      this.seekSlider.val(Math.floor(currentTime));
    });;

    this.seekSlider.on('input', () => {
      this.audio.currentTime = parseInt(this.seekSlider.val());
    });

    this.buttonPlayPause.on('click', (event: MouseEvent, button: Collection) => {
      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    });

    this.buttonMute.on('click', (event: MouseEvent, button: Collection) => {
      let volume: number;

      if (button.data('status') == 'unmuted') {
        button.data('status', 'muted');
        this.container.find('.bi-volume-mute').addClass('d-none');
        this.container.find('.bi-volume-mute-fill').removeClass('d-none');

        volume = 0;
      } else {
        button.data('status', 'unmuted')
        this.container.find('.bi-volume-mute').removeClass('d-none');
        this.container.find('.bi-volume-mute-fill').addClass('d-none');

        volume = this.calculateVolume(this.volumeSlider.val());;
      }

      this.audio.volume = volume;
    });

    this.volumeSlider.on('input', () => {
      this.volumeLevel = this.calculateVolume(this.volumeSlider.val());
      this.audio.volume = this.volumeLevel;

      this.buttonMute.data('status', 'unmuted')
    });

    this.audioElement.on('ended', () => {
      this.seekSlider.val(0);
      this.buttonPlayPause.data('status', 'paused');
      this.managePlayPauseButton('paused');
    }); 
  }

  private managePlayPauseButton (status: string) {
    if (this.headLess) return;

    if (this.buttonPlayPause) this.buttonPlayPause.data('status', status);

    if (!this.customSkin) {
      if (status == 'paused') {
        this.container.find('.bi-play-circle').removeClass('d-none');
        this.container.find('.bi-pause-circle').addClass('d-none');
      } else {
        this.container.find('.bi-play-circle').addClass('d-none');
        this.container.find('.bi-pause-circle').removeClass('d-none');
      }
    }
  }

  

  private calculateTime(secs: number): string {
    const minutes: number = Math.floor(secs / 60);
    const seconds: number = Math.floor(secs % 60);
    const returnedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${returnedSeconds}`;
  }

  private calculateVolume(value: string): number {
    return parseInt(value) / 100;
  }

  public play() {
    this.managePlayPauseButton('playing');

    this.audio.play();
  }

  public pause() {
    this.managePlayPauseButton('paused');

    this.audio.pause();    
  }

  public seek() {
    
  }

  public volume(value?: number): number | void {
    if (!value) {
      return this.volumeLevel;
    } else {
      this.volumeLevel = value;
      this.audio.volume = this.volumeLevel;
      if (this.volumeSlider) this.volumeSlider.val(this.volumeLevel * 100);
    }
  }
}

export class AudioPlayers extends Component {
  constructor() {
    super('AudioPlayer', false);
  }

  public async init(): Promise<void> {
    await super.init();

    $('.ht-audio-player').each((item: Collection) => {
      new AudioPlayer(item);
    });

    this.success();
  }
}
