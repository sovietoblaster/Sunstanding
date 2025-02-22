import { Chapter } from "./Chapter.mjs";

export class ReadMeStruct {
    #raw;
    #filePath;
    #lineTemplateMatch;

    constructor(raw, chapters, filePath) {
        this.#raw = raw;
        this.#filePath = filePath;

        this.#lineTemplateMatch = this.#raw.match(new RegExp(`\\$fBegin.*\\$fEnd`, 'ud'));
        if (this.#lineTemplateMatch === null) throw new Error(`!cannot find a line template in ReadMe template`);

        console.log(lineTemplateMatch);

        let contentList = chapters.map((chapter) => this.#createLine(chapter)).join('\n');
    }

    #createLine(chapter) {

    }
}
