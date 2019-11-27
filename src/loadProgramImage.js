module.exports =
    createMemory =>
        image => createMemory(image.split('').map(c => c.charCodeAt(0)));