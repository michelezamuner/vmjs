const read_binary_file = require('../../../src/vm/read_binary_file');

describe('read binary file', () => {
    it('reads the given file path as binary', () => {
        const file = 'file';
        const expected = 'data';
        const read_file = (f, opt) => f === f && opt.encoding === 'binary' ? expected : null;

        const data = read_binary_file(read_file)(file);

        expect(data).toBe(expected);
    });
});