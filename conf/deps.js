module.exports = {
    main: ['vm/read_binary_file', 'loadProgramImage', 'exec'],
    'vm/read_binary_file': [require('fs').readFileSync],
    loadProgramImage: ['createMemory', 'vm/encode_binary_string'],
    exec: ['readMemory'],
};