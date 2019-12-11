const get_ip = require('../../../src/image/get_ip');

describe('get instruction pointer', () => {
    it('gets the current instruction pointer from the given image', () => {
        const expected = Math.floor(Math.random() * 0xFF);
        const image = {
            _special_registers: { ip: expected },
        };

        const ip = get_ip(image);

        expect(ip).toBe(expected);
    });
});