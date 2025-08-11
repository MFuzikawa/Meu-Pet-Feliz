
FROM node:18-alpine


WORKDIR /usr/src/app


COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "yarn", "start" ]
