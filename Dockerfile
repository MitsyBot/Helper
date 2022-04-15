FROM node:16-alpine as builder

RUN mkdir -p /usr/src/jeremias
WORKDIR /usr/src/jeremias

RUN apk add --no-cache tzdata && cp -r -f /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/jeremias/
RUN npm install

FROM node:16-alpine as runner
WORKDIR /usr/src/jeremias
COPY --from=builder /usr/src/jeremias /usr/src/jeremias

CMD ["npm", "run", "start"]
