import * as fs from 'node:fs';

export function readSecrets(path) {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (err) {
        console.error('!File secrets.me reading error: <' + err + '>\n');
    }
}
