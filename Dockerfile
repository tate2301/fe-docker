from node:13.12.0-alpine3.11 as base
WORKDIR /app
EXPOSE 5000

FROM base AS build
WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM base AS final
WORKDIR /app
RUN npm i -g serve
COPY --from=build /src/ ./
ENTRYPOINT ["npm", "run", "start"]