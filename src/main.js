const readFileSync = require('fs').readFileSync;
const readProgramImage = require('./readProgramImage')(readFileSync);

module.exports = () => {
    const programFile = process.argv.slice(2)[0];
    const image = readProgramImage(programFile, { encoding: 'utf-8'});
    process.exit(parseInt(image));
};