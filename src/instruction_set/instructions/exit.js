const write_register = require('../../image/write_register');
const set_flag = require('../../image/set_flag');
const registers = require('../../image/registers');

const write_exit_status = exit_status => image =>
    write_register(registers.bl)(exit_status)(image);

const set_exit_flag = image =>
    set_flag('exit')(true)(image);

module.exports = operands => image =>
    write_exit_status(operands.readUIntBE(2, 1))(set_exit_flag(image));
