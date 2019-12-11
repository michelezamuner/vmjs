module.exports = addr => image =>
    image._code.slice(addr, addr + 4);