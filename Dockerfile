FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile=false

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile=false
RUN pnpm run build

FROM base AS builder
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY nginx/ .

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* && rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/ssl && chmod 700 /etc/nginx/ssl
COPY --from=builder /app/dist/ .
COPY --from=builder /app/nginx.conf /etc/nginx
COPY --from=builder /app/load_config.sh /app/load_config.sh

ENTRYPOINT ["nginx", "-g", "daemon off;"]