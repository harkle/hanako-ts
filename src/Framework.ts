import { Collection } from './Collection';
import { Selector } from './Collection/Types';
import { addHelpers } from './Tools/Helpers';
import { addNetwork } from './Tools/Network';

export type Func = (...args: any[]) => any;

function select(selector: Selector): Collection {
  return new Collection(selector);
}

const framework = addNetwork(addHelpers(select));
export { framework as $ };

