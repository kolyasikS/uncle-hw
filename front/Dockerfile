FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci


FROM node:22-alpine AS builder

WORKDIR /app

# 1. Accept secrets passed via --build-arg in GitHub Actions
ARG NEXT_PUBLIC_USER_SERVICE_API_URL
ARG NEXT_PUBLIC_VEHICLE_SERVICE_API_URL

# 2. Expose them to Node environment for Next.js build step
ENV NEXT_AUTH_COOKIE_NAME=$NEXT_AUTH_COOKIE_NAME
ENV NEXT_PUBLIC_USER_SERVICE_API_URL=$NEXT_PUBLIC_USER_SERVICE_API_URL
ENV NEXT_PUBLIC_VEHICLE_SERVICE_API_URL=$NEXT_PUBLIC_VEHICLE_SERVICE_API_URL

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy output files for Next.js standalone mode
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]