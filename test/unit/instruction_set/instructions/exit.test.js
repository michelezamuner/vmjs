const exit = require('../../../../src/instruction_set/instructions/exit');

describe('exit', () => {
    it('writes status code to register', () => {
        const expected = Math.floor(Math.random() * 0xFF);
        const operands = Buffer.from([0x00, 0x00, expected]);
        const image = {
            _registers: Buffer.from([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, 0x00,
            ]),
            _flags: { exit: false },
        };
        const expected_image = {
            _registers: Buffer.from([
                0x00, 0x00, 0x00, 0x00,
                0x00, 0x00, 0x00, expected,
            ]),
            _flags: { exit: true },
        };

        const result_image = exit(operands)(image);

        expect(result_image).toStrictEqual(expected_image);
    });
});