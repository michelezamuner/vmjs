const clone = require('../common/clone');

const write = registers =>
    (registers.ip += 4) ? registers : registers;

const increment = image =>
    (image._special_registers = write(clone(image._special_registers))) ? image : image;

module.exports = image =>
    increment(clone(image));