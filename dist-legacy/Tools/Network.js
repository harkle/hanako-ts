var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $ } from '../Framework';
const Network = {
    httpRequest: function (parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataType = parameters.dataType || 'text';
            var requestInit = {
                method: parameters.type || 'GET'
            };
            if (!(parameters.body instanceof URLSearchParams) && typeof parameters.body !== 'undefined') {
                const requestBody = new URLSearchParams();
                for (let [key, value] of Object.entries(parameters.body)) {
                    requestBody.append(key, value);
                }
                requestInit.body = requestBody;
            }
            else if (typeof parameters.body !== 'undefined') {
                requestInit.body = parameters.body;
            }
            requestInit.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
            const response = yield fetch(parameters.url, requestInit);
            const text = yield response.text();
            if (dataType === 'text')
                return text;
            if (dataType === 'json')
                return JSON.parse(text);
            if (dataType === 'html')
                return $.parseHTML(text);
        });
    }
};
export function addNetwork(base) {
    return Object.assign(base, Network);
}
