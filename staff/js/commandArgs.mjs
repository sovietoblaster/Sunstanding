import process from 'node:process';

export const home = process.argv[2];   // 1st command argument is the path to the home directory like './..'
export const source = process.argv[3]; // 2nd command argument is the path to the source directory from home
export const render = process.argv[4]; // 3nd command argument is the path to the directory with rendered files from home
export const readmeTemp = process.argv[5]; // 4nd command argument is the path to the template of a ReadMe file from home
