## Running the Project Locally (Non-Docker)

To run this project locally without Docker, ensure that you have `npm` installed (as the project relies on `package.json` scripts for package management) and follow these steps:

1. **Install the dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server with HMR**:
   ```bash
   npm run dev
   ```

3. **Build the project for production** (if needed):
   ```bash
   npm run build
   ```

4. **Preview the production build** (optional):
   ```bash
   npm run preview
   ```

### Available npm Scripts

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `npm run dev`      | Runs the app in development mode with HMR.   |
| `npm run build`    | Builds the application for production.       |
| `npm run preview`  | Previews the production build.               |
| `npm run lint`     | Lints the source files using ESLint.         |
| `npm run format`   | Formats the source files using Prettier.     |
| `npm run format:check` | Checks formatting with Prettier.         |

---

### Notes
- Make sure `Node.js` and `npm` are installed before running these commands.
- You can customize the project settings or scripts in `package.json` as per your needs.
---

## Running the Project with Docker (Using Makefile)

This project includes commands to manage Docker containers using the `Makefile`. Ensure you have Docker installed and configured properly. Below are the steps to run the project:

### Steps to Build and Run the Project

1. **Build the Docker image**:
   ```bash
   make build
   ```

2. **Start the Docker container**:
   ```bash
   make start
   ```

3. **Stop the Docker container** (if needed):
   ```bash
   make stop
   ```

4. **Clean up the Docker image and container**:
   ```bash
   make clean
   ```

5. **Rebuild the image and restart the container**:
   ```bash
   make rebuild
   ```

6. **Run the development server inside the Docker container with hot-loading**:
   ```bash
   make dev-mode
   ```

7. **Open a shell inside the running container**:
   ```bash
   make exec-shell
   ```

---

### Command Reference Table

| Command              | Description                                             |
|----------------------|---------------------------------------------------------|
| `make build`         | Builds the Docker image for the project.                |
| `make start`         | Starts a Docker container exposing the app on port 5173.|
| `make stop`          | Stops and removes the running Docker container.         |
| `make clean`         | Removes the Docker image and container.                 |
| `make rebuild`       | Cleans up, rebuilds the image, and starts the container.|
| `make dev-mode`      | Runs the app in development mode with hot-loading.      |
| `make exec-shell`    | Opens an interactive shell in the running container.    |

---

## Deploying with Kind Cluster

This project supports deployment to a local Kubernetes cluster using Kind (Kubernetes in Docker). Ensure you have Kind and kubectl installed before proceeding.

### Kind Cluster Management Commands

1. **Create a Kind cluster**:
   ```bash
   make kind-create
   ```

2. **Create namespace and set context**:
   ```bash
   make namespace-create
   make set-context
   ```

3. **Load and deploy the application**:
   ```bash
   make kind-load-image
   make kind-deploy
   ```

4. **Complete deployment in one command**:
   ```bash
   make kind-run
   ```

5. **Delete the Kind cluster**:
   ```bash
   make kind-delete
   ```

### Kind Command Reference Table

| Command              | Description                                             |
|----------------------|---------------------------------------------------------|
| `make kind-create`   | Creates a Kind cluster using configuration file         |
| `make namespace-create` | Creates a Kubernetes namespace                       |
| `make set-context`   | Sets Kubernetes context to use the specified namespace  |
| `make kind-load-image` | Loads Docker image into the Kind cluster             |
| `make kind-deploy`   | Deploys the application to the Kind cluster            |
| `make kind-run`      | Complete setup: creates cluster, builds and deploys app |
| `make kind-delete`   | Deletes the Kind cluster                               |
| `make kind-dev-run`  | Deploys to Kind with development mode and hot-reloading|

---

## Helm Deployment

The project includes Helm charts for managing Kubernetes deployments across different environments.

### Helm Configuration

- **Available Environments**: local, qa, prod
- **Default Environment**: local
- **Charts Location**: `helm/` directory

### Environment-Specific Deployment

To deploy using Helm with a specific environment configuration:

```bash
HELM_ENVIRONMENT=<environment> make helm-deploy
```

Replace `<environment>` with one of: local, qa, or prod

### Notes
- Ensure Helm is installed and properly configured
- Helm charts are organized in separate directories under `helm/`
- Environment-specific values can be configured in the respective value files
