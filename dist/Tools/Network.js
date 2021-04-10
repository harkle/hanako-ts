import { $ } from '../Framework';
const Network = {
    httpRequest: async function (parameters) {
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
        const response = await fetch(parameters.url, requestInit);
        const text = await response.text();
        if (dataType === 'text')
            return text;
        if (dataType === 'json')
            return JSON.parse(text);
        if (dataType === 'html')
            return $.parseHTML(text);
    }
};
export function addNetwork(base) {
    return Object.assign(base, Network);
}
