ARG PROJECT_DIR=/vue-app

FROM node:20-slim AS builder
ARG PROJECT_DIR
WORKDIR ${PROJECT_DIR}

RUN npm install -g pnpm

COPY . ./

RUN pnpm install

RUN pnpm run build

FROM nginx:alpine AS production
ARG PROJECT_DIR

COPY --from=builder $PROJECT_DIR/dist/ /usr/share/nginx/html
COPY --from=builder $PROJECT_DIR/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80