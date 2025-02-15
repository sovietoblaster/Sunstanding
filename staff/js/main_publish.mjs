import { contentManager } from './setContentManager.mjs';


async function main() {

    await contentManager.setPdf();
    await contentManager.downloadTgphContentInfo();
    await contentManager.downloadSources();
    await contentManager.upload();
}

main();
