const resolve = require('../../../../src/common/di/resolve');

describe('resolve', () => {
    it('resolves configured dependencies producing an instance of the requested function', () => {
        const prefix = 'prefix';
        const f1 = f => g => () => 'f1-' + f() + '-' + g();
        const f2 = f => () => 'f2-' + f();
        const f3 = () => 'f3';
        const f4 = () => 'f4';
        const load = f => {
            switch(f) {
                case prefix + 'f1': return f1;
                case prefix + 'f2': return f2;
                case prefix + 'f3': return f3;
            }
        };
        const deps = {
            f1: ['f2', 'f3'],
            f2: [f4],
        };

        const _resolve = resolve(load)(deps)(prefix);
        const result = _resolve('f1')();

        expect(result).toBe('f1-f2-f4-f3');
    });
});