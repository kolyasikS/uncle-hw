FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci


FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./

COPY prisma.config.ts ./
COPY db ./db
COPY src ./src
COPY tsconfig*.json ./

RUN npx prisma generate
RUN npm run build


FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules

# Compiled application
COPY --from=builder /app/dist ./dist

# Prisma config + schema + migrations
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/db/prisma ./db/prisma

# Custom generated Prisma client
COPY --from=builder /app/db/generated ./db/generated

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]