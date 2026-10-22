# Node.js Demo App — CI/CD Pipeline with GitHub Actions and Docker

![GitHub Actions CI/CD](https://github.com/RahulSharma2109/nodejs-demo-app/actions/workflows/main.yml/badge.svg)

A simple Node.js web application demonstrating an automated **Continuous Integration and Continuous Deployment (CI/CD) pipeline** using GitHub Actions and Docker Hub.

Whenever code is pushed to the `main` branch, GitHub Actions automatically installs dependencies, runs automated tests, checks the application build, builds a Docker image, and pushes the image to Docker Hub.

## Project Overview

This project demonstrates how to automate application testing, containerization, and image publishing using modern DevOps tools.

### Key Features

- Node.js HTTP server with a health-check endpoint.
- Automated tests using Node.js's built-in test runner.
- Application build validation.
- Docker containerization using a lightweight Node.js Alpine image.
- GitHub Actions workflow triggered by pushes to `main`.
- Automated Docker image publishing to Docker Hub.
- Commit-specific Docker image tags for version identification.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Application runtime |
| JavaScript | Application and test code |
| Node.js Test Runner | Automated testing |
| npm | Package management |
| Docker | Application containerization |
| Git and GitHub | Source code management |
| GitHub Actions | CI/CD automation |
| Docker Hub | Docker image registry |

## Project Structure

```text
nodejs-demo-app/
├── .github/
│   └── workflows/
│       └── main.yml
├── app.js
├── app.test.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
└── README.md
```

### File Descriptions

- `app.js` — Implements the Node.js HTTP server and application routes.
- `app.test.js` — Contains automated tests for the application endpoints.
- `package.json` — Defines project metadata and npm scripts.
- `package-lock.json` — Locks dependency versions for reproducible installations.
- `Dockerfile` — Defines how to build the application image.
- `.dockerignore` — Excludes unnecessary and sensitive files from the Docker build context.
- `.github/workflows/main.yml` — Defines the automated CI/CD pipeline.
- `README.md` — Documents the project and its usage.

## Application Endpoints

| Endpoint | Description | Expected Result |
|---|---|---|
| `/` | Application home endpoint | Welcome response in JSON |
| `/health` | Health-check endpoint | `status: healthy` |
| Any undefined route | Handles unknown routes | HTTP 404 response |

## Run the Application Locally

### Prerequisites

Install the following tools:

- Node.js 22 or a compatible supported version.
- npm.
- Git.
- Docker Desktop, if you want to run the container.

### 1. Clone the repository

```bash
git clone https://github.com/RahulSharma2109/nodejs-demo-app.git
cd nodejs-demo-app
```

### 2. Install dependencies

```bash
npm ci
```

The command uses `package-lock.json` to install the locked dependency versions.

### 3. Run automated tests

```bash
npm test
```

The tests validate the application routes, including the home endpoint, health endpoint, and handling of undefined routes.

### 4. Validate the application build

```bash
npm run build
```

This command checks the application JavaScript syntax.

### 5. Start the application

```bash
npm start
```

Open these URLs in your browser:

- Home: http://localhost:3000/
- Health check: http://localhost:3000/health

Keep the terminal running while testing the endpoints.

## Docker Instructions

### 1. Build the Docker image

From the project root, run:

```bash
docker build -t nodejs-demo-app:local .
```

### 2. Run the container

```bash
docker run --rm -d --name nodejs-demo-test -p 3000:3000 nodejs-demo-app:local
```

### 3. Verify the health endpoint

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "healthy",
  "application": "nodejs-demo-app"
}
```

### 4. Stop the container

```bash
docker stop nodejs-demo-test
```

Because the container was started with `--rm`, Docker removes it after it stops.

## CI/CD Pipeline

The workflow is defined in `.github/workflows/main.yml`.

### Pipeline Trigger

The pipeline runs automatically when changes are pushed to the `main` branch. It can also be started manually through the GitHub Actions interface.

### Pipeline Stages

**Stage 1 — Checkout Source Code**

GitHub Actions checks out the latest repository contents.

**Stage 2 — Set Up Node.js**

The workflow configures Node.js 22 on the GitHub-hosted runner.

**Stage 3 — Install Dependencies**

The workflow runs `npm ci` to install dependencies from the lock file.

**Stage 4 — Automated Testing**

The workflow runs `npm test` to validate the application endpoints.

**Stage 5 — Build Validation**

The workflow runs `npm run build` to check JavaScript syntax.

**Stage 6 — Build and Publish Docker Image**

After the test job succeeds, the Docker job builds the application image and pushes it to Docker Hub.

### Pipeline Flow

```text
Developer Pushes Code
         |
         v
  GitHub Repository
         |
         v
   GitHub Actions
         |
         v
  Install Dependencies
         |
         v
    Run Tests
         |
         v
  Build Validation
         |
         v
   Tests Successful?
         |
         v
  Build Docker Image
         |
         v
   Push to Docker Hub
         |
         v
  Published Docker Image
```

The Docker job depends on the test job, so it runs only after the test job succeeds.

## Docker Hub Repository

The application image is published to:

**Repository:** [`sharmaxrahul/nodejs-demo-app`](https://hub.docker.com/repository/docker/sharmaxrahul/nodejs-demo-app)

Published image tags:

- `latest` — Identifies the latest successfully published image.
- `sha-<commit-sha>` — Identifies an image associated with a specific Git commit.

### Pull the Published Image

```bash
docker pull sharmaxrahul/nodejs-demo-app:latest
```

### Run the Published Image

```bash
docker run --rm -d --name nodejs-demo-verify -p 3001:3000 sharmaxrahul/nodejs-demo-app:latest
```

### Verify the Published Container

```bash
curl http://localhost:3001/health
```

Expected response:

```json
{
  "status": "healthy",
  "application": "nodejs-demo-app"
}
```

Stop the container when verification is complete:

```bash
docker stop nodejs-demo-verify
```

## GitHub Repository Secrets

The workflow uses GitHub Actions secrets to authenticate with Docker Hub.

Configure these secrets under:

**GitHub Repository → Settings → Secrets and variables → Actions**

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | A Docker Hub access token with permission to push images |

Never hard-code credentials or access tokens in the source code or workflow file.

## Verification and Results

The project was verified through the following checks:

- Automated GitHub Actions workflow completed successfully.
- Node.js testing and build-validation stages completed.
- Docker image was published to Docker Hub with `latest` and commit-specific tags.
- The published image was pulled successfully to the local machine.
- A container created from the published image returned a healthy status from `/health`.

These results demonstrate the complete workflow from source code changes to a published and runnable Docker image.

## Learning Outcomes

This project provides practical experience with:

- CI/CD concepts and automated workflows.
- GitHub Actions runners, jobs, steps, and workflow triggers.
- Node.js testing and build validation.
- Docker images, containers, ports, and image tags.
- Secure use of repository secrets.
- Automated publishing to a container registry.
- Troubleshooting workflow configuration and dependency issues.

## Author

**Rahul Sharma**

MCA — Cloud Computing and DevOps

GitHub: [RahulSharma2109](https://github.com/RahulSharma2109)

---

*Developed as part of a DevOps internship task to demonstrate CI/CD automation using GitHub Actions and Docker.*
