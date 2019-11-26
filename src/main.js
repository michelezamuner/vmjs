const program = process.argv.slice(2)[0];
const status = require('fs').readFileSync(program, { encoding: 'utf-8' });
process.exit(parseInt(status));

module.exports = () => {
    const program = process.argv.slice(2)[0];
    const status = require('fs').readFileSync(program, { encoding: 'utf-8' });
    process.exit(parseInt(status));
};