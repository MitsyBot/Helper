FROM node:16-alpine as builder

RUN mkdir -p /usr/src/jeremias
WORKDIR /usr/src/jeremias


RUN apk update && apk add tzdata
ENV TZ="America/Sao_Paulo"

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/jeremias/
RUN npm install

FROM node:16-alpine as runner
WORKDIR /usr/src/jeremias
COPY --from=builder /usr/src/jeremias /usr/src/jeremias

CMD ["npm", "run", "start"]
