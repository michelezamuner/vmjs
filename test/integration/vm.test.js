const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const write = promisify(require('fs').writeFile);
const root = process.env['SC_VM_ROOT'];

describe('vm', () => {
    it('exits with program exit code', async () => {
        const file = `/tmp/exits-with-program-exit-code.in`;
        const expectedCodes = [0, 128, 192];
        let output = null;
        let code = null;
        for (const expected of expectedCodes) {
            try {
                await write(file, expected, 'utf-8');
                const res = await exec(`${root}/bin/vm ${file}`);
                output = res.stdout;
                code = 0;
            } catch (e) {
                output = e.stderr;
                code = e.code;
            }
            expect(output).toBe('');
            expect(code).toBe(expected);
        }
    });
});