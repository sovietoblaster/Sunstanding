'use stict';

import { readSecrets } from './secrets.js';
import { ContentManager } from './ContentManager.js';

async function main() {
    let authToken = readSecrets();

    let contentManager = new ContentManager(authToken);

    await contentManager.getPageList();
}

main();
