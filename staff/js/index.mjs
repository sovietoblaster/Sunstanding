import { readSecrets } from './secrets.mjs';
import { ContentManager } from './ContentManager.mjs';
import process from 'node:process';

const pathHome = process.argv[2];   // 1st command argument is the path to the home directory like './..'
const pathSource = process.argv[3]; // 2nd command argument is the path to the source directory from home

const codeRegExp = new RegExp('^\\d_\\d\\d', 'ud'); // match chapter code without extension, postfix

async function main() {
    let contentManager;
    {
        const authToken = readSecrets(`${pathHome}/secrets.me`);

        contentManager = new ContentManager(
            authToken,
            `${pathHome}/${pathSource}/`,
            codeRegExp,
            (code) => {
                // let res = code.match(codeRegExp);
                // if (res === null) throw new Error(`!unknown code: <${code}>`);

                // console.log(res);
                let nums = code.split('_').map((num) => parseInt(num));
                if (nums.length != 2 || nums[0] != 1) throw new Error(`!unknown code: <${code}>`);

                return `Солнцестояние глава ${nums[1]}`;
            }
        );
    }


    await contentManager.downloadTgphContentInfo();
    await contentManager.downloadSources();
}

main();
