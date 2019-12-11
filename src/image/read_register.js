module.exports = register => image =>
    image._registers.readUIntBE(register._addr, register._size);