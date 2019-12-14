module.exports = string =>
    Buffer.from(string.trim().split('').map(c => c.charCodeAt(0)));