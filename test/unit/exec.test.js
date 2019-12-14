const exec = require('../../src/exec');

describe('exec', () => {
    it('executes the program contained in the image', () => {
        const expected = 128;
        const image = { _code: Buffer.from([0, 0, 0, 0, 0, 0, 0, expected]) };

        const exit_code = exec(image);

        expect(exit_code).toBe(expected);
    });
});