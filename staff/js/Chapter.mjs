export class Chapter {
    #code;
    #fileName;
    #path;
    #url;
    #title;


    constructor(code, fileName, title) {
        this.#code = code;
        this.#fileName = fileName;
        this.#title = title;
    }

    // constructor(apiObject) {
    //     this.#path = apiObject.path;
    //     this.#url = apiObject.url;
    //     this.#title = apiObject.title;
    // }

}