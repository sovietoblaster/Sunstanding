import * as fs from 'node:fs';

export function readSecrets() {
    try {
        return fs.readFileSync('./secrets.me', 'utf8');
    } catch (err) {
        console.error('!File secrets.me reading error: <' + err + '>\n');
    }
}
