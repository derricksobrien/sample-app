ACTION ?= ps
PROFILE ?=

stack:
	docker compose $(if $(PROFILE),--profile $(PROFILE),) $(ACTION)
