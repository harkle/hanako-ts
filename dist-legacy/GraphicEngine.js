import { Collection } from './Collection';
const defaultOptions = {
    width: 320,
    height: 240,
    clear: true,
    pixelRatio: 'device',
    antialias: true,
    alpha: false
};
export class GraphicEngine extends Collection {
    constructor(selector, options) {
        super(selector);
        this.framecount = 0;
        this.requestAnimationFrame = () => {
            if (this.options.clear)
                this.clear();
            this.animate();
            this.draw();
            this.render();
            this.framecount++;
            window.requestAnimationFrame(this.requestAnimationFrame);
        };
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        if (this.options.pixelRatio == 'device')
            this.options.pixelRatio = window.devicePixelRatio;
        this.resize();
        window.requestAnimationFrame(this.requestAnimationFrame);
    }
    resize(dimensions) {
        if (dimensions) {
            this.options.width = dimensions.width;
            this.options.height = dimensions.height;
        }
        this.attr('width', this.options.width);
        this.attr('height', this.options.height);
        this.css({
            width: this.options.width,
            height: this.options.height
        });
    }
    setup() { }
    clear() { }
    animate() { }
    draw() { }
    render() { }
}
