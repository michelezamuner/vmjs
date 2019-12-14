const loadProgramImage = require('../../src/loadProgramImage');

describe('load program image', () => {
    it('loads the given image into memory', () => {
        const image = 'image';
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
        const encode_binary_string = s => s === image ? expected : null;
        
        const actual = loadProgramImage(createMemory)(encode_binary_string)(image);

        expect(actual).toBe(memory);
    });
});