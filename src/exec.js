module.exports =
    readMemory =>
        memory =>
            Buffer.from(readMemory(memory)).readInt32BE(4);
