# Makefile for Docker container management
# Variables
DOCKER_IMAGE_NAME=my-app-image
DOCKER_CONTAINER_NAME=my-app-container
DOCKERFILE_DIR=./dockers/app
DOCKER_PORT=5173
WORKDIR=/usr/src/app
DOCKER_DEV_VOLUME=$(WORKDIR)

# Helper tasks
.PHONY: verify-image
verify-image:
	@if ! docker images --format "{{.Repository}}" | grep -q "^$(DOCKER_IMAGE_NAME)$$"; then \
		echo "Error: Docker image '$(DOCKER_IMAGE_NAME)' not found. Please build the image."; \
		exit 1; \
	fi

.PHONY: verify-container
verify-container:
	@if docker ps -a --format "{{.Names}}" | grep -q "^$(DOCKER_CONTAINER_NAME)$$"; then \
		echo "Stopping and removing existing container: $(DOCKER_CONTAINER_NAME)"; \
		docker stop $(DOCKER_CONTAINER_NAME) && docker rm $(DOCKER_CONTAINER_NAME); \
	fi

# Build Docker image
.PHONY: build
build:
	docker build -t $(DOCKER_IMAGE_NAME) -f $(DOCKERFILE_DIR)/Dockerfile .

# Start the Docker container
.PHONY: start
start:
	docker run -d --name $(DOCKER_CONTAINER_NAME) -p $(DOCKER_PORT):$(DOCKER_PORT) $(DOCKER_IMAGE_NAME)

# Stop and remove the Docker container
.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER_NAME) || true
	docker rm $(DOCKER_CONTAINER_NAME) || true

# Full clean-up task
.PHONY: clean
clean: stop
	docker rmi $(DOCKER_IMAGE_NAME) || true

# Shortcut to build and run
.PHONY: run
run: build verify-image start

# Stop, clean, rebuild, and restart
.PHONY: rebuild
rebuild: clean run

# Open a shell in the running Docker container
.PHONY: exec-shell
exec-shell:
	docker exec -it $(DOCKER_CONTAINER_NAME) sh

# Run the Docker container in development mode with hot-loading
.PHONY: dev-mode
dev-mode: build verify-image verify-container
	docker run \
		--name $(DOCKER_CONTAINER_NAME) \
		-p $(DOCKER_PORT):$(DOCKER_PORT) \
		-v $(PWD):$(DOCKER_DEV_VOLUME) \
		-v $(WORKDIR)/node_modules \
		-w $(WORKDIR) \
		$(DOCKER_IMAGE_NAME) \
		npm run dev