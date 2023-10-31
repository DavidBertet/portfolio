FROM node:lts-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./

## Production dependencies

FROM base AS prod-deps

RUN npm install --production

## Dev dependencies

FROM base AS build-deps

RUN npm install --production=false

## Build app

FROM build-deps AS build

COPY . .

ENV ASTRO_TELEMETRY_DISABLED=1 

RUN npm run build

## Runtime

# -- Static
# FROM nginx:alpine as runtime

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 8080

# -- SSR
FROM base as runtime

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
CMD npm run start