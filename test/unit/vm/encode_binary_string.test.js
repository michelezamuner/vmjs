const encode_binary_string = require('../../../src/vm/encode_binary_string');

describe('encode binary string', () => {
    it('converts a binary string into a bytes buffer', () => {
        const expected = Buffer.from([0x01, 0x02, 0x03, 0x04]);
        const binary_string = expected.toString('binary');

        const buffer = encode_binary_string(binary_string);

        expect(buffer).toStrictEqual(expected);
    });
});