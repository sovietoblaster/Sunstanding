import * as https from 'node:https';

export class InernetAgent {


    constructor() {
    }

    async getPageArr(authToken) {
        let data = await this.#getData('getPageList', authToken).then(
            (res) => JSON.parse(res)
        );
        if (data.ok !== true) throw new Error(`telegra.ph error: <${data.error}>`);
        // console.log(data);
        if (data.result.total_count !== data.result.pages.length) throw new Error('telegra.ph response error: array is incorrect');
        return data.result;
    }
    async #getData(method, authToken) {
        console.log(`token: ${authToken}`); //TODO!!! remove ONLY FOR TEST TOKEN

        return new Promise((resolve, reject) => {

            let request = https.get(
                {
                    hostname: 'api.telegra.ph',
                    path: '/' + method + '?access_token=' + authToken,
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
