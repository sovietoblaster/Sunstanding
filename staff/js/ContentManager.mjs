import { InernetAgent } from './InternetAgent.mjs';
import { Chapter } from './Chapter.mjs';
import { FileManager } from './FileManager.mjs';

export class ContentManager {
    #authToken;
    #fileManager;

    #chapters;

    constructor(authToken, sourcePath) {
        this.#authToken = authToken;
        this.#fileManager = new FileManager(sourcePath);

        console.log(this.#fileManager.getChapterList());
    }

    async downloadTgphContentInfo() {
        let internetAgent = new InernetAgent();
        let pageArr = (await internetAgent.getPageArr(this.#authToken)).pages;
        // console.log(pageArr);

        this.#chapters = pageArr.map((page) => new Chapter(page));



    }


}
