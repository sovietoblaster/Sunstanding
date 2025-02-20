export class DomHtmlParser {
    cursor;
    contentRoot;

    constructor(text) {
        this.cursor = new Cursor(text);

        this.contentRoot = new Node(ROOT_TAG)
        this.contentRoot.children = [];
    }

    parse() {
        this.#iterativeParse(this.contentRoot);

        return JSON.stringify(this.contentRoot.children);
    }

    #iterativeParse(parent) {
        // console.log(`come into <${parent}:${parent.tag}>`);
        let parentArr = parent.children;

        while (this.cursor.pos < this.cursor.text.length) {

            const curChar = this.cursor.text[this.cursor.pos];

            if (curChar.trim().length == 0) {
                this.cursor.pos++;
                continue;
            }

            if (curChar == '<') {
                if (this.cursor.text[this.cursor.pos + 1] == '!') {                    
                    let regRes = this.cursor.text.slice(this.cursor.pos).trim().match(new RegExp(`^<!--[^<>/]**-->`, 'ud'));
                    if (regRes === null) throw new Error(`!incorrect md comment tag in position <${this.cursor.pos}>`);
    
                    this.cursor.pos += regRes[0].length;

                    continue;
                }

                if (this.cursor.text[this.cursor.pos + 1] == '/') {
                    let regRes = this.cursor.text.slice(this.cursor.pos).trim().match(new RegExp(`^</${parent.tag}>`, 'ud'));
                    if (regRes === null) throw new Error(`!incorrect html closing tag in position <${this.cursor.pos}>: expected </${parent.tag}>`);

                    this.cursor.pos += regRes[0].length;
                    return;
                }


                let regRes = this.cursor.text.slice(this.cursor.pos).trim().match(new RegExp('^<[^<>/]*>', 'ud'));
                if (regRes === null) throw new Error(`!incorrect html tag in position <${this.cursor.pos}>`);

                this.cursor.pos += regRes[0].length;

                parentArr.push(new Node(regRes[0].slice(1, -1)));

                if (TAG_LIST.indexOf(parentArr.at(-1).tag) == -1) throw new Error(`!unknown html tag: <${parentArr.at(-1).tag}>`);

                if (!TWIN_LIST[TAG_LIST.indexOf(parentArr.at(-1).tag)]) continue;

                parentArr.at(-1).children = [];
                this.#iterativeParse(parentArr.at(-1));

                continue;


            } else {


                let regRes = this.cursor.text.slice(this.cursor.pos).trim().match(new RegExp('^[^<>]*<', 'ud'));
                if (regRes === null) throw new Error(`!incorrect html after position <${this.cursor.pos}>`);

                parentArr.push(regRes[0].slice(0, -1));
                this.cursor.pos += regRes[0].length - 1;

                continue;
            }

        }
    }
}

class Cursor {
    pos = 0;
    text;

    constructor(text) {
        this.text = text;
    }
}

class Node {
    tag;
    // children;

    constructor(tag) {
        this.tag = tag;
    }
}


const TAG_LIST = ['a', 'aside', 'b', 'blockquote', 'br', 'code', 'em', 'figcaption', 'figure', 'h3', 'h4', 'hr', 'i', 'iframe', 'img', 'li', 'ol', 'p', 'pre', 's', 'strong', 'u', 'ul', 'video'];
const TWIN_LIST = [true, true, true, true, /*     */false, true, true, true, /*       */true, true, true, false, true, true, /**/false, true, true, true, true, true, true,/**/ true, true, true];
if (TAG_LIST.length != TWIN_LIST.length) throw new SyntaxError('!TAG_LIST & TWIN_LIST mismatch');

const ROOT_TAG = 'main';
