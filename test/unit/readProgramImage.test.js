const readProgramImage = require('../../src/readProgramImage');

describe('read program image', () => {
    it('reads the program image from the object file', () => {
        const objectFile = 'object file';
        const expected = 'image';
        const readFileSync = (file, opt) =>
            file === objectFile && opt.encoding === 'utf-8' ? expected : null;
        
        const options = { encoding: 'utf-8'};
        const image = readProgramImage(readFileSync)(objectFile, options);

        expect(image).toBe(expected);
    });
});