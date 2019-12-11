const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const write = promisify(require('fs').writeFile);
const root = process.env['SC_VM_ROOT'];
const opcodes = require('../../../src/instruction_set/opcodes');

describe('execute program', () => {
    it('exits with program exit code', async () => {
        const expected = Math.floor(Math.random() * 255);
        const noops = Math.floor(Math.random() * 4) + 1;
        let program = '';
        for (let i = 0; i < noops; i++) {
            program += '0x00 0x00 0x00 0x00' + "\n";
        }
        program += `0x${opcodes.exit} 0x00 0x00 0x${expected.toString(16)}`;
        console.log(program);
        let output = null;
        let code = null;
        try {
            program = program.trim().split(/\s+/).map(c => parseInt(c));
            const binary = Buffer.from(program);
            const file = `/tmp/exits-with-program-exit-code.in`;
            await write(file, binary, 'binary');
            const res = await exec(`${root}/bin/vm ${file}`);
            output = res.stdout;
            code = 0;
        } catch (e) {
            output = e.stderr;
            code = e.code;
        }
        expect(output).toBe('');
        expect(code).toBe(expected);
    });
});