const read_register = require('./read_register');
const registers = require('./registers');

module.exports = image =>
    read_register(registers.bl)(image);
