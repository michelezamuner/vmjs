const loadProgramImage = require('../../src/loadProgramImage');

describe('load program image', () => {
    it('loads the given image into memory', () => {
        const expected = [0x11, 0x12, 0x13, 0x14];
        const memory = {};
        const createMemory = data => {
            if (data.length !== expected.length) {
                return null;
            }
            for (const e of data) {
                if (expected.indexOf(e) === -1) {
                    return null;
                }
            }

            return memory;
        };
        const image = Buffer.from(expected).toString();
        
        const actual = loadProgramImage(createMemory)(image);

        expect(actual).toBe(memory);
    });
});