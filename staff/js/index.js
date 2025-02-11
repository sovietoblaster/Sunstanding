'use stict';

import { readSecrets } from './staff/js/secrets.js';
import { ContentManager } from './staff/js/ContentManager.js';

async function main() {
    let authToken = readSecrets();

    let contentManager = new ContentManager(authToken);

    await contentManager.getPageList();
}

main();
