const should_exit = require('../../../src/image/should_exit');

describe('should exit', () => {
    it('returns true if the image is set to exit the execution', () => {
        const image = { _flags: { exit: true }};
        const result = should_exit(image);

        expect(result).toBe(true);
    });

    it('returns false if the image is not set to exit the execution', () => {
        const image = { _flags: { exit: false }};
        const result = should_exit(image);

        expect(result).toBe(false);
    });
});