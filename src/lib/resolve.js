const get_deps = deps => target =>
    Object.keys(deps).includes(target) ? deps[target] : [];

const load_dep = load => prefix => dep =>
    typeof dep === 'function' ? dep : load(prefix + dep);

const resolve = load => deps => prefix => target =>
    get_deps(deps)(target).reduce((f, dep) => f(resolve(load)(deps)(prefix)(dep)), load_dep(load)(prefix)(target));

module.exports = load => deps => prefix => target =>
    resolve(load)(deps)(prefix)(target);