const get_opcode = require('./get_opcode');
const get_operands = require('./get_operands');

module.exports = load_implementation => instruction => image =>
    load_implementation(get_opcode(instruction))(get_operands(instruction))(image);
