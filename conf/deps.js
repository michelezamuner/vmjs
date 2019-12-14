module.exports = {
    main: ['vm/read_binary_file', 'vm/encode_binary_string', 'image/parse', 'exec'],
    'vm/read_binary_file': [require('fs').readFileSync],
};