import { InernetAgent } from './InternetAgent.js';

export class ContentManager {
    #authToken;

    constructor(authToken) {
        this.#authToken = authToken;
    }

    async getPageList() {
        let internetAgent = new InernetAgent();

        let pageArr = (await internetAgent.getPageArr(this.#authToken)).pages;
        console.log(pageArr);
        console.log(pageArr[0]);


    }

}
