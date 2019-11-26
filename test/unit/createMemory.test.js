const createMemory = require('../../src/createMemory');

describe('create memory', () => {
    it('creates a new memory object', () => {
        const expected = 1234;
        const memory = createMemory(expected);

        expect(memory._value).toBe(expected);
    });
});