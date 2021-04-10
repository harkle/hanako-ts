import { Func } from '../Framework';
export interface httpRequest {
    url: string;
    type?: 'GET' | 'POST';
    body?: object | URLSearchParams;
    dataType?: 'text' | 'json' | 'html';
    success?: (response: any, event: Event) => void;
    error?: (event: Event) => void;
}
export declare function addNetwork<B extends Func>(base: B): B & {
    httpRequest: (parameters: httpRequest) => Promise<any>;
};
