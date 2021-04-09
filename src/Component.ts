import { Debug } from './Tools/Debug';
import { $ } from './Framework';

export abstract class Component {
  private isLoadedAfterImages: boolean = false;
  protected typeName: string = 'Component';

  constructor(typeName: string, isLoadedAfterImages: boolean = false) {
    this.typeName = typeName;
    this.isLoadedAfterImages = isLoadedAfterImages;
  }

  public async init(): Promise<void> {
    await $.ready();
    if (this.isLoadedAfterImages) return await $.imagesLoaded();
  };

  public toString () : string {
    return this.typeName;
  }

  public warning(message: string) {
    Debug.log('𐄂 %c' + this.typeName + ' (' + message + ')', Debug.WARNING);
  }

  public success() {
    Debug.log('✓ %c' + this.typeName, Debug.SUCCESS);
  }
}
