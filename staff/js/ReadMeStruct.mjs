import { Chapter } from "./Chapter.mjs";

export class ReadMeStruct {
    #raw;
    #filePath;
    #lineTemplateMatch;

    #text;

    constructor(raw, chapters, filePath) {
        this.#raw = raw;
        this.#filePath = filePath;

        this.#lineTemplateMatch = this.#raw.match(new RegExp(`${T_BEGIN}.*${T_END}`, 'ud'));
        if (this.#lineTemplateMatch === null) throw new Error(`!cannot find a line template in ReadMe template`);

        let contentList = chapters.map((chapter, index) => this.#createLine(chapter, index + 1)).reverse().join('\n');
        this.#text = raw.replace(this.#lineTemplateMatch[0], contentList);
    }

    #createLine(chapter, index) {
        return this.#lineTemplateMatch[0]
            .replace(new RegExp(T_BEGIN, 'ud'), ``)
            .replace(new RegExp(T_END, 'ud'), ``)
            .replace(new RegExp(T_1_NUM, 'ud'), index)
            .replace(new RegExp(T_2_TITLE, 'ud'), chapter.title)
            .replace(new RegExp(T_3_NAME, 'ud'), chapter.url)
            .replace(new RegExp(T_3_PATH, 'ud'), chapter.url)
            .replace(new RegExp(T_4_NAME, 'ud'), `${this.#filePath}/${chapter.title}.pdf`)
            .replace(new RegExp(T_4_PATH, 'ud'), `${this.#filePath}/${chapter.title}.pdf`)
            ;
    }

    getText() {
        return this.#text;
    }
}

const T_BEGIN = `\\$fBegin`;
const T_END = `\\$fEnd`;
const T_1_NUM = `\\$f1Num`;
const T_2_TITLE = `\\$f2Title`;
const T_3_NAME = `\\$f3Name`;
const T_3_PATH = `\\$f3Path`;
const T_4_NAME = `\\$f4Name`;
const T_4_PATH = `\\$f4Path`;
