import { contentManager } from './setContentManager.mjs';


async function main() {

    (async () => { })()
        .finally(async () => {
            await contentManager.downloadTgphContentInfo();
            await contentManager.downloadSources();
            await contentManager.upload();
        })
        .finally(async () => {
            await contentManager.setPdf();
        });
}

main();
