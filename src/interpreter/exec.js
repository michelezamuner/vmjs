module.exports = read_instruction => increment_ip => get_ip => exec_instruction => image =>
    exec_instruction(read_instruction(get_ip(image))(image))(increment_ip(image));
