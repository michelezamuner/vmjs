module.exports = createMemory => encode_binary_string => image =>
    createMemory(encode_binary_string(image));