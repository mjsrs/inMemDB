ARG VARIANT=16
FROM "mcr.microsoft.com/vscode/devcontainers/javascript-node":${VARIANT}

LABEL description="Monorepo development environment"
LABEL maintaner=""

USER 1000:1000

RUN npm install standard --global
