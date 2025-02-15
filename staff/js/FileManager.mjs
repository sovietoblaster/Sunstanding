import * as fs from 'node:fs';

import * as child_process from 'node:child_process';

import { DomHtmlParser } from './DomHtmlParser.mjs';

import { Chapter } from './Chapter.mjs';


export class FileManager {
    #codeRegExp; // match chapter code without extension, postfix
    #code2title; // function converting chapter code to title
    #sourcePath;
    #renderPath;

    constructor(codeRegExp, code2title, sourcePath, renderPath) {
        this.#codeRegExp = codeRegExp;
        this.#code2title = code2title;
        this.#sourcePath = sourcePath;
        this.#renderPath = renderPath;

        fs.access(this.#sourcePath, (err) => { if (err !== null) throw err });
        fs.access(this.#renderPath, (err) => { if (err !== null) throw err });
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

    downloadSource(chapter) {
        let data;
        try {
            data = fs.readFileSync(`${this.#renderPath}/${chapter.fileName}.html`, 'utf8');
        } catch (err) {
            throw new Error(`!Source html file <${chapter.fileName}> reading error: <${err}>`);
        }

        let textRes = data.match(textRegExp);
        if (textRes === null) throw new Error(`!Source html file <${chapter.fileName}> parsing error`);

        // chapter.text = textRes[0].slice(BEGINTAG.length, -ENDTAG.length).trim();
        // chapter.text = textRes[0]; // <main> tag is useful hint
        chapter.text = textRes[0].slice(BEGINTAG.length).trim(); // </main> tag is useful hint

        chapter.content = (new DomHtmlParser(chapter.text)).parse();
        // console.log(chapter.content);
    }

    setPdf(chapter) {
        try {
            child_process.execSync(`mv "${this.#renderPath}/${chapter.fileName}.pdf" "${this.#renderPath}/${chapter.fileName} ${chapter.title}.pdf"`);
        } catch (err) {
            console.log(`   pdf renaming error:`);
            console.log(err);
        }
    }

}

const nameRegExp = new RegExp('^[^.]*', 'ud'); // match name without extension

const BEGINTAG = '<main>';
const ENDTAG = '</main>';
const textRegExp = new RegExp(`${BEGINTAG}.*${ENDTAG}`, 'uds'); // text in html file
