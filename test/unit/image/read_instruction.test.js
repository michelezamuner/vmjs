const read_instruction = require('../../../src/image/read_instruction');

describe('read instruction', () => {
    it('read an instruction from the code segment starting at the given address', () => {
        const expected = [0x01, 0x02, 0x03, 0x04];
        const image = {
            _code: Buffer.from([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
                ...expected,
            ]),
        };
        const addr = 0x08;

        const instruction = read_instruction(addr)(image);

        expect(instruction).toStrictEqual(Buffer.from(expected));
    });
});