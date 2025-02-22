import { readSecrets } from './secrets.mjs';
import { ContentManager } from './ContentManager.mjs';
import { Decor } from './Decor.mjs';

import * as path from './commandArgs.mjs'

const codeRegExp = new RegExp('^\\d_\\d\\d', 'ud'); // match chapter code without extension, postfix


export let contentManager;

const authToken = readSecrets(`${path.home}/secrets.me`);

contentManager = new ContentManager(
    authToken,
    `${path.home}/${path.source}`,
    `${path.home}/${path.render}`,
    `${path.home}/${path.readmeTemp}`,
    `${path.render}`,
    codeRegExp,
    (code) => {
        // let res = code.match(codeRegExp);
        // if (res === null) throw new Error(`!unknown code: <${code}>`);

        // console.log(res);
        let nums = code.split('_').map((num) => parseInt(num));
        if (nums.length != 2 || nums[0] != 1) throw new Error(`!unknown code: <${code}>`);

        return `Солнцестояние глава ${nums[1]}`;
    },
    new Decor('Сёма', 'https://t.me/+XZZWLNSYpU03YWMy'),
);
