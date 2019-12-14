const parse = require('../../../src/image/parse');

describe('parse', () => {
    it('parse a new image instance from the given binary data', () => {
        const data = Buffer.from([0x00, 0x01, 0x02, 0x03]);

        const image = parse(data);

        expect(image._code).toStrictEqual(data);
    });
});