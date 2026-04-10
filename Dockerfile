FROM node:24-alpine AS development

WORKDIR /app

COPY package.json yarn.lock vite.config.mts tsconfig.json /app/
COPY src /app/src

ENV NODE_ENV=production

RUN yarn install
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "preview", "--host" ]
