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
