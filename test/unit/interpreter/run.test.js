const run = require('../../../src/interpreter/run');

describe('interpreter', () => {
    it('exec instructions until condition is false and returns exit status', () => {
        const expected_exit_status = Math.floor(Math.random() * 0xFF);
        const image = {};
        let iterations = 0;
        const should_exit = img => img === image ? iterations++ >= 4 : false;
        const exec = img => img === image ? img : null;
        const get_exit_status = img => img === image && iterations === 5 ? expected_exit_status : null;

        const exit_status = run(get_exit_status)(should_exit)(exec)(image);

        expect(exit_status).toBe(expected_exit_status);
    });
});