export class Chapter {
    #path;
    #url;
    #title;


    constructor(apiObject) {
        this.#path = apiObject.path;
        this.#url = apiObject.url;
        this.#title = apiObject.title;
    }

}