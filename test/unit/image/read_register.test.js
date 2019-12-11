const read_register = require('../../../src/image/read_register');
const registers = require('../../../src/image/registers');

describe('read register', () => {
    it('reads the content of the given register', () => {
        Object.values(registers).forEach(register => {
            const expected = Math.floor(Math.random() * Math.pow(2, 8 * register._size));
            const image = { _registers: new Buffer(16) };
            image._registers.writeUIntBE(expected, register._addr, register._size);

            const value = read_register(register)(image);

            expect(value).toBe(expected);
        });
    });
});