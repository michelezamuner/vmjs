module.exports = read_binary_file => loadProgramImage => exec =>
    process.exit(exec(loadProgramImage(read_binary_file(process.argv.slice(2)[0]))));
