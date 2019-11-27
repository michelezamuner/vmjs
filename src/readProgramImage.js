module.exports =
    readFileSync =>
        file => readFileSync(file, { encoding: 'binary' });