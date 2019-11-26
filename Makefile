root=$(shell pwd)
env=slc.vmjs

env.clean:
	@docker image ls | grep $(env) >/dev/null && docker image rm $(env)
env.build:
	@docker image ls | grep $(env) >/dev/null || docker build -t $(env) .
env.ssh: env.build
	@docker run -ti --rm -v $(root):/app:delegated $(env) bash
env.run:
	@docker run --rm $(env)
app.install:
	@yarn
app.ci:
	@yarn run ci