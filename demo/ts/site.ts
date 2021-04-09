import { Debug } from '../../src/Tools/Debug';
import { Filters } from '../components/Filters';
import { Menu } from '../components/Menu';
import { Test } from '../components/Test';
import { Carousel } from '../components/Carousel';
import { ScrollSpy } from '../components/ScrollSpy';
import { AudioPlayers } from '../components/AudioPlayers';

Debug.isEnabled = true;

(new Test()).init();
(new Menu('#buttonToggleSideMenu', '#sideMenu')).init();
(new Carousel()).init();
(new ScrollSpy('#menu', '.section', 55)).init();
(new Filters('.filters', '.list', false)).init();
(new AudioPlayers()).init();
