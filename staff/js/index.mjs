import { readSecrets } from './secrets.mjs';
import { ContentManager } from './ContentManager.mjs';
import process from 'node:process';

// 1st command argument is the path to the home directory like './..'
// 2nd command argument is the path to the source directory from home

async function main() {
    let contentManager;
    {
        const pathHome = process.argv[2];
        const pathSource = process.argv[3];
        const authToken = readSecrets(`${pathHome}/secrets.me`);
        contentManager = new ContentManager(
            authToken,
            `${pathHome}/${pathSource}/`,
        );
    }


    await contentManager.downloadTgphContentInfo();
}

main();
