import { Collection } from './Collection';
import { Selector } from './Collection/Types';
export declare type Func = (...args: any[]) => any;
declare function select(selector: Selector): Collection;
declare const framework: typeof select & {
    ready: typeof import("./Tools/Helpers").ready;
    imagesLoaded: typeof import("./Tools/Helpers").imagesLoaded;
    scrollTo: typeof import("./Tools/Helpers").scrollTo;
    parseHTML: typeof import("./Tools/Helpers").parseHTML;
} & {
    httpRequest: (parameters: import("./Tools/Network").httpRequest) => Promise<any>;
};
export { framework as $ };
