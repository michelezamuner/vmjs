const run = get_exit_status => should_exit => exec => image =>
    should_exit(image) === true ? get_exit_status(image) : run(get_exit_status)(should_exit)(exec)(exec(image));

module.exports = run;