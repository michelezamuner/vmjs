const loadProgramImage = require('../../src/loadProgramImage');

describe('load program image', () => {
    it('loads the given image into memory', () => {
        const value = 1234;
        const memory = {};
        const createMemory = v => v === value ? memory : null;
        const image = '1234';
        
        const actual = loadProgramImage(createMemory)(image);

        expect(actual).toBe(memory);
    });
});