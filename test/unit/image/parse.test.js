const parse = require('../../../src/image/parse');

describe('parse', () => {
    it('parses a new image instance from the given binary data', () => {
        const data = Buffer.from([0x00, 0x01, 0x02, 0x03]);

        const image = parse(data);

        expect(image._registers).toStrictEqual(new Buffer(16));
        expect(image._special_registers.ip).toBe(0x00);
        expect(image._code).toStrictEqual(data);
        expect(image._flags.exit).toBe(false);
    });
});