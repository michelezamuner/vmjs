const clone = require('../common/clone');

// Only clone the data structure we're going to change
const clone_flags = image =>
    (image._flags = clone(image._flags)) ? image : image;

const clone_image = image =>
    clone_flags(clone(image));

const set_flag = flag_name => flag_value => image =>
    (image._flags[flag_name] = flag_value) ? image : image;

module.exports = flag_name => flag_value => image =>
    set_flag(flag_name)(flag_value)(clone_image(image));
