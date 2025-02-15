export class Chapter {
    code;
    fileName;
    title;

    text;
    content;

    exists = false;
    path;
    url;


    constructor(code, fileName, title) {
        this.code = code;
        this.fileName = fileName;
        this.title = title;
    }

    // constructor(apiObject) {
    //     this.#path = apiObject.path;
    //     this.#url = apiObject.url;
    //     this.#title = apiObject.title;
    // }

    parsePage(page) {
        if (this.exists == true)
            throw new Error(`!cannot process two pages with the same name: <${this.title}>`);

        this.exists = true;
        this.path = page.path;
        this.url = page.url;
    }

}