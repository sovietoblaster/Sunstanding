import { InernetAgent } from './InternetAgent.mjs';
import { FileManager } from './FileManager.mjs';
import { Chapter } from './Chapter.mjs';
import { Decor } from './Decor.mjs';
import { ReadMeStruct } from './ReadMeStruct.mjs';

export class ContentManager {
    #authToken;
    #fileManager;

    #chapters;
    #decor;

    constructor(authToken, sourcePath, renderPath, readmeTempPath, renderAbsPath, homePath, codeRegExp, code2title, decor) {
        this.#authToken = authToken;
        this.#fileManager = new FileManager(codeRegExp, code2title, sourcePath, renderPath, readmeTempPath, renderAbsPath, homePath);

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

        this.#chapters.forEach((chapter, index) => {
            // if (chapter.exists == false) internetAgent.createPage(this.#authToken, chapter, this.#decor);

            // internetAgent.uploadPage(this.#authToken, chapter, this.#decor);
            setTimeout(internetAgent.uploadPage.bind(internetAgent), +index * +1501, this.#authToken, chapter, this.#decor);
        });
    }

    async setPdf() {
        this.#chapters.forEach((chapter) =>
            this.#fileManager.setPdf(chapter)
        );
    }

    async setReadMe() {
        let readmeStruct = this.#fileManager.getReadMe(this.#chapters);

        this.#fileManager.writeReadMe(readmeStruct.getText());
    }

}
