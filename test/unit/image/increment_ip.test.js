const increment_ip = require('../../../src/image/increment_ip');

describe('increment IP', () => {
    it('step to the next instruction in the IP', () => {
        const previous = Math.floor(Math.random() * 0xFF);
        const image = {
            _special_registers: { ip: previous, other: 'something' },
            _other: 'something',
        };
        const expected = {
            _special_registers: { ip: previous + 4, other: 'something' },
            _other: 'something',
        };

        const result_image = increment_ip(image);

        expect(result_image).toStrictEqual(expected);
    });

    it('is pure', () => {
        const previous = Math.floor(Math.random() * 0xFF)
        const image = {
            _special_registers: { ip: previous },
        };

        increment_ip(image);

        expect(image._special_registers.ip).toBe(previous);
    });
});