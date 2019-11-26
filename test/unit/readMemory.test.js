const createMemory = require('../../src/createMemory');
const readMemory = require('../../src/readMemory');

describe('read memory', () => {
    it('reads a value from memory', () => {
        const expected = 1234;
        const memory = createMemory(expected);
        const value = readMemory(memory);

        expect(value).toBe(expected);
    });
});