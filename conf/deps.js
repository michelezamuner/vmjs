module.exports = {
    'main': ['vm/read_binary_file', 'vm/encode_binary_string', 'image/parse', 'interpreter/run'],
    'vm/read_binary_file': [require('fs').readFileSync],
    'interpreter/run': ['image/get_exit_status', 'image/should_exit', 'interpreter/exec'],
    'interpreter/exec': ['image/read_instruction', 'image/increment_ip', 'image/get_ip', 'instruction/exec'],
    'image/fetch_instruction': ['image/get_ip', 'image/read_instruction', 'image/store_instruction'],
    'instruction/exec': ['instruction_set/load_implementation'],
};