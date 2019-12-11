const get_operands = require('../../../src/instruction/get_operands');

describe('get operands', () => {
    it('provides the operands of the instruction', () => {
        const expected = [0x01, 0x02, 0x03];
        const instruction = Buffer.from([0x00, ...expected]);
    
        const operands = get_operands(instruction);

        expect(operands).toStrictEqual(Buffer.from(expected));
    });
});