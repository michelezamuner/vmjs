const exec = require('../../src/exec');

describe('exec', () => {
    it('executes the program loaded in memory', () => {
        const memory = {};
        const expected = 1234;
        const readMemory = m => m === memory ? expected : null;

        const actual = exec(readMemory)(memory);

        expect(actual).toBe(expected);
    });
});