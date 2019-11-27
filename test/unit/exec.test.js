const exec = require('../../src/exec');

describe('exec', () => {
    it('executes the program loaded in memory', () => {
        const memory = {};
        const expected = 128;
        const data = [0, 0, 0, 0, 0, 0, 0, expected];
        const readMemory = m => m === memory ? data : null;

        const actual = exec(readMemory)(memory);

        expect(actual).toBe(expected);
    });
});