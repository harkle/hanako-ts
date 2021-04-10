import { Debug } from './Tools/Debug';
import { $ } from './Framework';
export class Component {
    constructor(typeName, isLoadedAfterImages = false) {
        this.isLoadedAfterImages = false;
        this.typeName = 'Component';
        this.typeName = typeName;
        this.isLoadedAfterImages = isLoadedAfterImages;
    }
    async init() {
        await $.ready();
        if (this.isLoadedAfterImages)
            return await $.imagesLoaded();
    }
    ;
    toString() {
        return this.typeName;
    }
    warning(message) {
        Debug.log('𐄂 %c' + this.typeName + ' (' + message + ')', Debug.WARNING);
    }
    success() {
        Debug.log('✓ %c' + this.typeName, Debug.SUCCESS);
    }
}
