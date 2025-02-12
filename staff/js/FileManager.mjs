import * as fs from 'node:fs';

import { Chapter } from './Chapter.mjs';

const nameRegExp = new RegExp('^[^.]*', 'ud'); // match name without extension

export class FileManager {
    #codeRegExp; // match chapter code without extension, postfix
    #code2title; // function converting chapter code to title
    #sourcePath;

    constructor(codeRegExp, code2title, sourcePath) {
        this.#codeRegExp = codeRegExp;
        this.#code2title = code2title;
        this.#sourcePath = sourcePath;

        fs.access(this.#sourcePath, (err) => { if (err !== null) throw err });
    }

    getChapterList() {

        let dirContent = fs.readdirSync(this.#sourcePath);

        return dirContent.map((fileName) => this.#createChapter(fileName));

        // console.log(dirContent[0].match(/^[^.]*/ud));
        // console.log(dirContent);
    }

    #createChapter(fileName) {
        let nameRes = fileName.match(nameRegExp);
        if (nameRes === null) throw new Error(`!incorrect file name: <${fileName}>`);

        let codeRes = nameRes[0].match(this.#codeRegExp);
        if (codeRes === null) throw new Error(`!incorrect code format in file: <${fileName}>`);

        return new Chapter(codeRes[0], nameRes[0], this.#code2title(nameRes[0]));
    }

}
