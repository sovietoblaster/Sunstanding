import { InernetAgent } from './InternetAgent.mjs';
import { FileManager } from './FileManager.mjs';
import { Chapter } from './Chapter.mjs';

export class ContentManager {
    #authToken;
    #fileManager;

    #chapters;

    constructor(authToken, sourcePath, renderPath, codeRegExp, code2title) {
        this.#authToken = authToken;
        this.#fileManager = new FileManager(codeRegExp, code2title, sourcePath, renderPath);

        this.#chapters = this.#fileManager.getChapterList();
    }

    async downloadTgphContentInfo() {
        let internetAgent = new InernetAgent();
        let pageArr = (await internetAgent.getPageArr(this.#authToken)).pages;

        // console.log(pageArr);
        pageArr.forEach((page) => {
            let chapterI = this.#chapters.findIndex((chapter) => (page.title == chapter.title));
            if (chapterI == -1) {
                console.log(`unknown page was ignored: <${page.title}>`);
                return;
            }

            this.#chapters[chapterI].parsePage(page);
        }
        );

        // console.log(this.#chapters);
    }

    async downloadSources() {
        this.#chapters.forEach((chapter) =>
            this.#fileManager.downloadSource(chapter)
        );

    }


}
