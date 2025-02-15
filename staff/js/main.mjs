import { contentManager } from './setContentManager.mjs';


async function main() {

    try {
        await contentManager.downloadTgphContentInfo();
        await contentManager.downloadSources();
        await contentManager.upload();
    } finally {
        await contentManager.setPdf();
    }
}

main();
