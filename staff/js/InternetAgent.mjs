import * as https from 'node:https';

import { HttpParameter } from './HttpParameter.mjs';

import { Chapter } from './Chapter.mjs';
import { Decor } from './Decor.mjs';

export class InernetAgent {


    constructor() {
    }

    async getPageArr(authToken) {
        let data = await this.#getData('getPageList', authToken).then(
            (res) => JSON.parse(res)
        );
        if (data.ok !== true) throw new Error(`telegra.ph error: <${data.error}>`);
        console.log(JSON.stringify(data));
        if (data.result.total_count !== data.result.pages.length) throw new Error('telegra.ph response error: array is incorrect');
        return data.result;
    }

    async createPage(authToken, chapter, decor) {
        let data = await this.#getData(
            'createPage',
            authToken,
            decor.getParams().concat(new HttpParameter('title', chapter.title), new HttpParameter('content', chapter.content))
        ).then(
            (res) => JSON.parse(res)
        );
        console.log(JSON.stringify(data));
        if (data.ok !== true) throw new Error(`telegra.ph page creating error: <${data.error}>`);

    }

    async #getData(method, authToken, params = []) {
        params.unshift(new HttpParameter('access_token', authToken));
        let pathParams = params.map((param) => `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`).join('&');
        console.log(pathParams);

        return new Promise((resolve, reject) => {

            let request = https.get(
                {
                    hostname: 'api.telegra.ph',
                    path: `/${method}?${pathParams}`,
                },

                (res) => this.#processResponceData(res, resolve, reject)
            );
            request.end();

        });
    }
    #processResponceData(res, resolve, reject) {
        // console.log(`STATUS: ${res.statusCode}\n`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}\n`);
        let responseData = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            responseData += chunk;
        });
        res.on('end', () => {
            // console.log('No more data in response.');

            if (res.statusCode != 200) {
                reject(new Error('web request to telegra.ph error: <' + res.statusCode + '>'));
                return;
            }

            resolve(responseData);
        });
    }

}
