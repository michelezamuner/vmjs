const opcodes = require('./opcodes');
const _mnemonics = [];

const _get_mnemonic = opcode => {
    if (_mnemonics[opcode] === undefined) {
        _mnemonics[opcode] = Object.entries(opcodes).find(e => e[1] === opcode)[0];
    }
    
    return _mnemonics[opcode];
};

module.exports = opcode =>
    require(__dirname + '/instructions/' + _get_mnemonic(opcode));