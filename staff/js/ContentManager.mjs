import { InernetAgent } from './InternetAgent.mjs';
import { FileManager } from './FileManager.mjs';
import { Chapter } from './Chapter.mjs';

export class ContentManager {
    #authToken;
    #fileManager;

    #chapters;

    constructor(authToken, sourcePath, codeRegExp, code2title) {
        this.#authToken = authToken;
        this.#fileManager = new FileManager(codeRegExp, code2title, sourcePath);

        console.log(this.#fileManager.getChapterList());

        this.#chapters = this.#fileManager.getChapterList();
    }

    async downloadTgphContentInfo() {
        let internetAgent = new InernetAgent();
        let pageArr = (await internetAgent.getPageArr(this.#authToken)).pages;
        // console.log(pageArr);

        // this.#chapters = pageArr.map((page) => new Chapter(page));



    }


}
