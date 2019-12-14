module.exports = readProgramImage => loadProgramImage => exec =>
    process.exit(exec(loadProgramImage(readProgramImage(process.argv.slice(2)[0]))));
