const get_exit_status = require('../../../src/image/get_exit_status');

describe('get exit status', () => {
    it('returns the current exit status', () => {
        const expected = Math.floor(Math.random() * 0xFF);
        const registers = Buffer.from([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, expected,
        ]);
        const image = { _registers: registers };

        const exit_status = get_exit_status(image);

        expect(exit_status).toBe(expected);
    });
});