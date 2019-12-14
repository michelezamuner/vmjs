module.exports = {
    main: ['readProgramImage', 'loadProgramImage', 'exec'],
    readProgramImage: [require('fs').readFileSync],
    loadProgramImage: ['createMemory'],
    exec: ['readMemory'],
};