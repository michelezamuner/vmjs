const readProgramImage = require('../../src/readProgramImage');

describe('read program image', () => {
    it('reads the program image from the object file', () => {
        const objectFile = 'object file';
        const expected = 'image';
        const readFileSync = (file, opt) =>
            file === objectFile && opt.encoding === 'binary' ? expected : null;
        
        const image = readProgramImage(readFileSync)(objectFile);

        expect(image).toBe(expected);
    });
});