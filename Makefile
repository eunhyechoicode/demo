# Makefile for Docker container management
# Variables
DOCKER_IMAGE_NAME=my-app-image
DOCKER_CONTAINER_NAME=my-app-container
DOCKERFILE_DIR=./dockers/app
DOCKER_PORT=5173
WORKDIR=/usr/src/app
DOCKER_DEV_VOLUME=$(WORKDIR)

# Makefile for Kind cluster management and app deployment
# Variables
# Extract cluster name dynamically from kind-config.yaml
KIND_CLUSTER_NAME=$(shell awk '/name:/ { print $$2; exit }' $(KIND_CONFIG_FILE))
KIND_CONFIG_FILE=kind-config.yaml
KUBECTL_NAMESPACE_FILE=namespace.yaml
# Extract namespace value dynamically from namespace.yaml
NAMESPACE=$(shell awk '/metadata:/ {found=1} found && /name:/ {print $$2; exit}' $(KUBECTL_NAMESPACE_FILE))
KUBECTL_DEPLOYMENT_FILE=deployment.yaml
KUBECTL_SERVICE_FILE=service.yaml

# Helm-related variables
HELM_CHARTS=$(shell find helm/ -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)
HELM_ENVIRONMENT?=local
# Default to local, can be overridden with local, qa, or prod

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

# Create Kind cluster using the configuration file
.PHONY: kind-create
kind-create:
	kind create cluster --config $(KIND_CONFIG_FILE)

# Create a namespace using the namespace.yaml file
.PHONY: namespace-create
namespace-create:
	kubectl apply -f $(KUBECTL_NAMESPACE_FILE)

# Set the current Kubernetes context to use the namespace
.PHONY: set-context
set-context:
	kubectl config set-context --current --namespace=$(NAMESPACE)

# Load Docker image into the Kind cluster
.PHONY: kind-load-image
kind-load-image:
	kind load docker-image $(DOCKER_IMAGE_NAME) --name $(KIND_CLUSTER_NAME)

# Deploy the application in the Kind cluster
.PHONY: kind-deploy
kind-deploy:
	kubectl apply -f $(KUBECTL_DEPLOYMENT_FILE)
	kubectl apply -f $(KUBECTL_SERVICE_FILE)

# Delete the Kind cluster
.PHONY: kind-delete
kind-delete:
	kind delete cluster --name $(KIND_CLUSTER_NAME)

# Shortcut: Run all steps to create the cluster, load the app, and deploy it
.PHONY: kind-run
kind-run: kind-create build verify-image verify-container namespace-create set-context kind-load-image kind-deploy

# Run Docker container in development mode and deploy to Kind cluster with hot-reloading
.PHONY: kind-dev-run
kind-dev-run: kind-create build verify-image namespace-create set-context kind-load-image kind-deploy
	# Explicitly wait for pod readiness
	kubectl wait --for=condition=containersReady pod -l app=my-app -n $(NAMESPACE) --timeout=120s
	# Check the status of the pod
	@echo "Confirming pod status:"
	kubectl get pods -n $(NAMESPACE)
	# Port-forward after confirming readiness
	kubectl port-forward svc/my-app-service $(DOCKER_PORT):80 &
	@echo "Kind Dev Run ready: http://localhost:$(DOCKER_PORT)"@echo "Kind Dev Run started. Hot-reloading should now be active at http://localhost:$(DOCKER_PORT)."@echo "Kind Dev Run started. Hot-reloading should now be active at http://localhost:$(DOCKER_PORT)."

# Validate Helm charts
.PHONY: helm-lint
helm-lint:
	@for chart in $(HELM_CHARTS); do \
		echo "Linting helm/$$chart chart..."; \
		echo "Base values file: helm/$$chart/values.yaml"; \
		echo "Environment values file: helm/$$chart/$(HELM_ENVIRONMENT)/values.yaml"; \
		if [ ! -f helm/$$chart/values.yaml ]; then \
			echo "Error: Base values file does not exist: helm/$$chart/values.yaml"; \
			exit 1; \
		fi; \
		if [ ! -f helm/$$chart/$(HELM_ENVIRONMENT)/values.yaml ]; then \
			echo "Error: Environment values file does not exist: helm/$$chart/$(HELM_ENVIRONMENT)/values.yaml"; \
			exit 1; \
		fi; \
		helm lint helm/$$chart \
			-f helm/$$chart/values.yaml \
			-f helm/$$chart/$(HELM_ENVIRONMENT)/values.yaml; \
	done


# Helm template command to preview the rendered manifests
.PHONY: helm-template
helm-template:
	@for chart in $(HELM_CHARTS); do \
		echo "Templating helm/$$chart chart..."; \
		helm template helm/$$chart \
			--values helm/$$chart/values.yaml \
			--values helm/$$chart/$(HELM_ENVIRONMENT)/values.yaml; \
	done

# Install/upgrade Helm release
.PHONY: helm-install
helm-install:
	@for chart in $(HELM_CHARTS); do \
		echo "Installing/upgrading helm/$$chart chart..."; \
		helm upgrade --install $$chart helm/$$chart \
			--values helm/$$chart/values.yaml \
			--values helm/$$chart/$(HELM_ENVIRONMENT)/values.yaml \
			--namespace $(NAMESPACE) \
			--create-namespace; \
	done

# Uninstall Helm release
.PHONY: helm-uninstall
helm-uninstall:
	@for chart in $(HELM_CHARTS); do \
		echo "Uninstalling $$chart release..."; \
		helm uninstall $$chart --namespace $(NAMESPACE); \
	done

# Show Helm release status
.PHONY: helm-status
helm-status:
	@for chart in $(HELM_CHARTS); do \
		echo "Status for $$chart release:"; \
		helm status $$chart --namespace $(NAMESPACE); \
	done

# List all Helm releases
.PHONY: helm-list
helm-list:
	helm list --all-namespaces

# Shortcut: Create cluster and deploy with Helm
.PHONY: kind-helm-run
kind-helm-run: kind-create build verify-image namespace-create set-context kind-load-image helm-install
