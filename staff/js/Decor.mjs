import { HttpParameter } from "./HttpParameter.mjs";

export class Decor {
    authorName;
    authorUrl;

    constructor(authorName, authorUrl) {
        this.authorName = authorName;
        this.authorUrl = authorUrl;
    }

    getParams() {
        return [
            new HttpParameter('author_name', this.authorName),
            new HttpParameter('author_url', this.authorUrl)
        ];
    }
}
