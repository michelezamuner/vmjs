const opcodes = require('../../../../../src/instruction_set/opcodes');
const exec = require('../../../../../src/instruction/exec');
const load_implementation = require('../../../../../src/instruction_set/load_implementation');
const get_exit_status = require('../../../../../src/image/get_exit_status');
const should_exit = require('../../../../../src/image/should_exit');

describe('exit', () => {
    it('sets image to exit', () => {
        const expected = Math.floor(Math.random() * 0xFF);
        const instruction = { _data: [opcodes.exit, 0, 0, expected] };
        const image = { _registers: Buffer.from([
            0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, expected,
        ])};
        
        const result_image = exec(load_implementation)(instruction)(image);
        const exit = should_exit(result_image);
        const exit_status = get_exit_status(result_image);

        expect(exit).toBe(true);
        expect(exit_status).toBe(expected);
    });
});