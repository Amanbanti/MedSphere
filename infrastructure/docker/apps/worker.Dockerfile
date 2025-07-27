# syntax=docker/dockerfile:1
# Production image for medsphere/worker
# Generated from nestjs.Dockerfile.template

ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache libc6-compat wget \
  && corepack enable \
  && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH"

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages packages
COPY apps apps
COPY services services
RUN pnpm install --frozen-lockfile --filter @medsphere/service-worker...

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages packages
COPY apps apps
COPY services services
RUN pnpm --filter @medsphere/service-worker build

FROM node:${NODE_VERSION}-alpine AS production
RUN apk add --no-cache wget \
  && addgroup -g 1001 medsphere \
  && adduser -u 1001 -G medsphere -D medsphere
WORKDIR /app
ENV NODE_ENV=production PORT=3028
COPY --from=build --chown=medsphere:medsphere /app/services/worker/dist ./dist
COPY --from=build --chown=medsphere:medsphere /app/services/worker/package.json ./package.json
COPY --from=deps --chown=medsphere:medsphere /app/node_modules ./node_modules
USER medsphere
EXPOSE 3028
HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3028/api/v1/health/live || exit 1
CMD ["node", "dist/main.js"]
