### Stage 1: Base build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./

### Stage 2: Production build
FROM build AS production

ENV NODE_ENV="production"

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production

COPY . .  

RUN npm run build

RUN npm cache clean --force


RUN chown -R 1000:1000 /usr/src/app
EXPOSE 3000

CMD ["node", "lib/main.js"]


### Development image (optional)
FROM build AS development
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/app/.npm \
    npm set cache /app/.npm && \
    npm install

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon"]
