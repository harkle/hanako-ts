var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Debug } from './Tools/Debug';
import { $ } from './Framework';
export class Component {
    constructor(typeName, isLoadedAfterImages = false) {
        this.isLoadedAfterImages = false;
        this.typeName = 'Component';
        this.typeName = typeName;
        this.isLoadedAfterImages = isLoadedAfterImages;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield $.ready();
            if (this.isLoadedAfterImages)
                return yield $.imagesLoaded();
        });
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
