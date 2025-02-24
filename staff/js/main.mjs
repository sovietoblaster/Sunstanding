import { contentManager } from './setContentManager.mjs';


async function main() {
    let error = undefined;

    try {
        await contentManager.downloadTgphContentInfo();
        await contentManager.downloadSources();
        await contentManager.upload();
    } catch (err) {
        console.log(err);
        error = err;
    }

    try {
        await contentManager.setPdf();
    } catch (err) {
        console.log(err);
        error = err;
    }

    try {
        await contentManager.setReadMe();
    } catch (err) {
        console.log(err);
        error = err;
    }

    if (error !== undefined) throw error;
}

main();
