const set_flag = require('../../../src/image/set_flag');

describe('set flag', () => {
    it('sets an image flag', () => {
        const flag_value = 'value';
        const image = {
            _flags: {},
            _other: 'something',
        };
        const expected = {
            _flags: { flag: flag_value },
            _other: 'something',
        };
        const result_image = set_flag('flag')(flag_value)(image);

        expect(result_image).toEqual(expected);
    });

    it('is pure', () => {
        const image = { _flags: {} };

        set_flag('flag')('value')(image);

        expect(image._flags).toStrictEqual({});
    });
});