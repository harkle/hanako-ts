import { $, Func } from '../Framework';

export interface httpRequest {
  url: string,
  type?: 'GET' | 'POST',
  body?: object | URLSearchParams,
  dataType?: 'text' | 'json' | 'html',
  success?: (response: any, event: Event) => void,
  error?: (event: Event) => void
}

const Network = {
  httpRequest: async function (parameters: httpRequest) {

   const dataType = parameters.dataType || 'text';

    var requestInit: RequestInit = {
      method: parameters.type || 'GET'
    }

    if (!(parameters.body instanceof URLSearchParams) && typeof parameters.body !== 'undefined') {
      const requestBody = new URLSearchParams();

      for (let [key, value] of Object.entries(parameters.body)) {
        requestBody.append(key, value);
      }

      requestInit.body = requestBody;
    } else if (typeof parameters.body !== 'undefined') {
      requestInit.body = parameters.body;
    }

    requestInit.headers =  new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});

    const response = await fetch(parameters.url, requestInit);

    const text = await response.text();

    if (dataType === 'text') return text;
    if (dataType === 'json') return JSON.parse(text);
    if (dataType === 'html') return $.parseHTML(text);
  }
};

export function addNetwork<B extends Func>(base: B) {
  return Object.assign(base, Network);
}
