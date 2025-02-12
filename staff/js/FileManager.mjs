import * as fs from 'node:fs';

export class FileManager {
    #sourcePath;

    constructor(sourcePath) {
        this.#sourcePath = sourcePath;

        fs.access(this.#sourcePath, (err) => { if (err !== null) throw err });
    }

    getChapterList() {
        const nameRegExp = new RegExp('^[^.]*', 'ud'); // match name without extension

        let dirContent = fs.readdirSync(this.#sourcePath);

        return dirContent.map(function (file, index, arr) {
            file = file.match(nameRegExp)
            if (file === null) throw new Error(`!incorrect file name: <${arr[index]}>`);
            return file[0];
        });

        // console.log(dirContent[0].match(/^[^.]*/ud));
        // console.log(dirContent);

    }

}
