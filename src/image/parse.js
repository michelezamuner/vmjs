module.exports = binary =>
    ({ _code: binary, _registers: Buffer.alloc(16), _special_registers: { ip: 0x00 }, _flags: { exit: false }});
