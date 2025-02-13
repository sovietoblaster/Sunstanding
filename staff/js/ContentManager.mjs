import { InernetAgent } from './InternetAgent.mjs';
import { FileManager } from './FileManager.mjs';
import { Chapter } from './Chapter.mjs';
import { Decor } from './Decor.mjs';

export class ContentManager {
    #authToken;
    #fileManager;

    #chapters;
    #decor;

    constructor(authToken, sourcePath, renderPath, codeRegExp, code2title, decor) {
        this.#authToken = authToken;
        this.#fileManager = new FileManager(codeRegExp, code2title, sourcePath, renderPath);

        this.#chapters = this.#fileManager.getChapterList();
        this.#decor = decor;
    }

    async downloadTgphContentInfo() {
        let internetAgent = new InernetAgent();
        let pageArr = (await internetAgent.getPageArr(this.#authToken)).pages;

        this.#chapters.forEach((chapter) => { chapter.exists = false; });

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

    async upload() {
        let internetAgent = new InernetAgent();
        // console.log(this.#chapters);

        this.#chapters.forEach((chapter) => {
            if (chapter.exists == false) internetAgent.createPage(this.#authToken, chapter, this.#decor);
        });
    }


}
