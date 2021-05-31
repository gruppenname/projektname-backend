FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["./prisma", "./prisma"]
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm ci
COPY ["./tsconfig.json", "./"]
COPY ["./src", "./src"]
CMD ["npm", "run", "deploy"]