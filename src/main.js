module.exports = read_binary_file => encode_binary_string => parse_image => run => () =>
    process.exit(run(parse_image(encode_binary_string(read_binary_file(process.argv.slice(2)[0])))));
