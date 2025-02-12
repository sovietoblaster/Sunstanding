import * as fs from 'node:fs';

export function readSecrets(path) {
    try {
        return fs.readFileSync(path, 'utf8').trim();
    } catch (err) {
        throw new Error(`!File secrets.me reading error: <${err}>`);
    }
}
