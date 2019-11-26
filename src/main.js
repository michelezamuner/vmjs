const readFileSync = require('fs').readFileSync;
const readProgramImage = require('./readProgramImage')(readFileSync);
const createMemory = require('./createMemory');
const loadProgramImage = require('./loadProgramImage')(createMemory);
const readMemory = require('./readMemory');
const exec = require('./exec')(readMemory);

module.exports = () => {
    const programFile = process.argv.slice(2)[0];
    const image = readProgramImage(programFile, { encoding: 'utf-8'});
    const memory = loadProgramImage(image);
    const exitStatus = exec(memory);
    process.exit(exitStatus);
};