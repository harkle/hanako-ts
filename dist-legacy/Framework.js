import { Collection } from './Collection';
import { addHelpers } from './Tools/Helpers';
import { addNetwork } from './Tools/Network';
function select(selector) {
    return new Collection(selector);
}
const framework = addNetwork(addHelpers(select));
export { framework as $ };
