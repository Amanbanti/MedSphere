# syntax=docker/dockerfile:1
# Production image for medsphere/notification
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
RUN pnpm install --frozen-lockfile --filter @medsphere/service-notification...

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages packages
COPY apps apps
COPY services services
RUN pnpm --filter @medsphere/service-notification build

FROM node:${NODE_VERSION}-alpine AS production
RUN apk add --no-cache wget \
  && addgroup -g 1001 medsphere \
  && adduser -u 1001 -G medsphere -D medsphere
WORKDIR /app
ENV NODE_ENV=production PORT=3022
COPY --from=build --chown=medsphere:medsphere /app/services/notification/dist ./dist
COPY --from=build --chown=medsphere:medsphere /app/services/notification/package.json ./package.json
COPY --from=deps --chown=medsphere:medsphere /app/node_modules ./node_modules
USER medsphere
EXPOSE 3022
HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3022/api/v1/health/live || exit 1
CMD ["node", "dist/main.js"]
