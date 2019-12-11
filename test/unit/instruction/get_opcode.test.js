const get_opcode = require('../../../src/instruction/get_opcode');

describe('get opcode', () => {
    it('provides the opcode of the instruction', () => {
        const expected = Math.floor(Math.random() * 0xFF);
        const instruction = Buffer.from([expected, 0, 0, 0]);

        const opcode = get_opcode(instruction);

        expect(opcode).toBe(expected);
    });
});