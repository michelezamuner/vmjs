// No need to deep clone, assuming all functions are cloning objects before
// making changes: https://mmhaskell.com/blog/2017/1/9/immutability-is-awesome
module.exports = obj =>
    Object.assign({}, obj);