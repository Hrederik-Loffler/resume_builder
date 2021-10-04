#!/usr/bin/make

include .env

#----------- Make Environment ----------------------
.DEFAULT_GOAL := help
SHELL= /bin/sh
docker_bin= docker
docker_compose_bin= docker-compose
IMAGES_PREFIX= $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))
COMPOSE_CONFIG=--env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.$(ENVIRONMENT).yml
COMPOSE_NODE_CONFIG=--env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.node.yml

---------------: ## ------[ Docker essential commands ]---------
check: ## Check your configuration
	$(docker_compose_bin) $(COMPOSE_CONFIG) config
up: ## Start all containers (in background)
#	$(docker_bin) network create www2
#	$(docker_bin) network create internal2
	$(docker_compose_bin) $(COMPOSE_CONFIG) up --no-recreate -d
down: ## Stop all started containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
list: ## List all containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) ps
restart: ## Restart all started containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart
install: ## Install dependencies
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec -T --user="$(CURRENT_USER_ID)" php_fpm_resume composer install
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec -T --user="$(CURRENT_USER_ID)" php_fpm_resume php artisan config:clear
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec -T --user="$(CURRENT_USER_ID)" php_fpm_resume php artisan storage:link
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec -T --user="$(CURRENT_USER_ID)" php_fpm_resume php artisan migrate:fresh
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec -T --user="$(CURRENT_USER_ID)" php_fpm_resume php artisan migrate --force
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" node npm i

---------------: ## ------[ PHP commands ]---------
sh-php: ## Connect shell to container php
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec --user="$(CURRENT_USER_ID)" php_fpm_resume bash
	
---------------: ## ------[ Nginx commands ]---------
sh-nginx: ## Connect shell to container nginx
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec --user="$(CURRENT_USER_ID)" nginx_resume sh
	
---------------: ## ------[ Node commands ]---------
sh-node: ## Connect shell to container php
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" node bash
build-dev: ## Build packages
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm node npm i
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm node npm run $(ENVIRONMENT)
npm-watch: ## Run watcher
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm node npm run watch
npm-build: ## Build project
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm node npm i
	$(docker_compose_bin) $(COMPOSE_NODE_CONFIG) run --rm node npm run dev
	
---------------: ## ------[ Misc commands ]---------
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)