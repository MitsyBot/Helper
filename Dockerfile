FROM node:16-alpine as builder
LABEL org.opencontainers.image.source="https://github.com/MitsyBot/Jeremias"

RUN mkdir -p /usr/src/jeremias
WORKDIR /usr/src/jeremias

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/jeremias/
RUN npm install

FROM node:16-alpine as runner
WORKDIR /usr/src/jeremias
COPY --from=builder /usr/src/jeremias /usr/src/jeremias

CMD ["npm", "run", "start"]