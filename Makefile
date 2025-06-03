# Makefile for managing Docker PhPaladin in dev or deploy mode
# Variables
DOCKER_COMPOSE_FILE_DEV = docker-compose-dev.yaml
DOCKER_COMPOSE_FILE_DEPLOY = docker-compose.yaml
MODE ?= dev

# Default target
.PHONY: all
all: help

# Help target
.PHONY: help
help:
	@echo "Makefile for managing Docker PhPaladin"
	@echo "Usage:"
	@echo "  make mode=<dev|deploy> run  - Launch Docker in specified mode"
	@echo "  make ssh                   - Access the container via SSH"

# Run Docker in specified mode
.PHONY: run
run:
	@if [ "$(MODE)" = "dev" ]; then \
		echo "Launching Docker in development mode..."; \
		docker-compose -f $(DOCKER_COMPOSE_FILE_DEV) up --remove-orphans -d; \
	elif [ "$(MODE)" = "deploy" ]; then \
		echo "Launching Docker in deployment mode..."; \
		docker-compose -f $(DOCKER_COMPOSE_FILE_DEPLOY) up --remove-orphans -d; \
	else \
		echo "Invalid mode. Use 'dev' or 'deploy'."; \
		exit 1; \
	fi

# SSH into the container
.PHONY: ssh
ssh:
	@echo "Accessing the container via SSH..."
	@if [ "$(MODE)" = "dev" ]; then \
		docker exec -it phpaladin-probot-dev /bin/sh; \
	elif [ "$(MODE)" = "deploy" ]; then \
		echo "Invalid mode.'deploy have no sh it\'s distroless."; \
	else \
		echo "Invalid mode. Use 'dev' or 'deploy'."; \
		exit 1; \
	fi
