const clone = require('../common/clone');

const write = value => register => buffer =>
    buffer.writeUIntBE(value, register._addr, register._size) ? buffer : buffer;

const write_register = register => value => image =>
    (image._registers = write(value)(register)(Buffer.from(image._registers))) ? image : image;

module.exports = register => value => image =>
    write_register(register)(value)(clone(image));
