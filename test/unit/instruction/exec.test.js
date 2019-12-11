const exec = require('../../../src/instruction/exec');

describe('exec', () => {
    it('executes the given instruction with the given implementation', () => {
        const opcode = 123;
        const operands = [0, 0, 0];
        const instruction = Buffer.from([opcode, ...operands]);
        const image = {};
        const expected = 4321;
        const implementation = ops => img =>
            ops.compare(Buffer.from(operands)) === 0 && img === image ? expected : null;
        const load_implementation = opc =>
            opc === opcode ? implementation : null;

        const result = exec(load_implementation)(instruction)(image);

        expect(result).toBe(expected);
    });
});