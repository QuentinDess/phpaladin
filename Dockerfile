### Stage 1: Base build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./

### Stage 2: Production build
FROM build AS production_build

ENV NODE_ENV="production"

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production

COPY . .  

RUN npm run build

RUN npm cache clean --force

FROM gcr.io/distroless/nodejs20 AS deploy

# Set working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=production_build /usr/src/app/lib ./lib
COPY --from=production_build /usr/src/app/node_modules ./node_modules
COPY --from=production_build /usr/src/app/package*.json ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["lib/main.js"]

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