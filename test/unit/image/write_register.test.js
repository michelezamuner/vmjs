const write_register = require('../../../src/image/write_register');
const registers = require('../../../src/image/registers');

describe('write register', () => {
    it('writes the given value in the given register', () => {
        Object.values(registers).forEach(register => {
            const value = Math.floor(Math.random() * Math.pow(2, 8 * register._size));
            const image = {
                _registers: new Buffer(16),
                _other: 'something'
            };

            const result_image = write_register(register)(value)(image);
            const written = result_image._registers.readUIntBE(register._addr, register._size);

            expect(written).toBe(value);
            expect(result_image._other).toBe('something');
        });
    });

    it('is pure', () => {
        const image = { _registers: new Buffer(16) };

        write_register(registers.eax)(0x02)(image);

        expect(image._registers).toStrictEqual(new Buffer(16));
    });
});