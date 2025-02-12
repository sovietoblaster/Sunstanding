import { readSecrets } from './secrets.mjs';
import { ContentManager } from './ContentManager.mjs';
import process from 'node:process';

//! 1st command argument is the path to the home directory like './..'

async function main() {
    const pathHome = process.argv[2];

    let authToken = readSecrets(`${pathHome}/secrets.me`);

    let contentManager = new ContentManager(authToken);

    await contentManager.getPageList();
}

main();
