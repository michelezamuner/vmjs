module.exports = read_file => file =>
    read_file(file, { encoding: 'binary' });