FROM node:16
LABEL org.opencontainers.image.source="https://github.com/MitsyBot/Jeremias"


WORKDIR /home/mitsy/JeremiasNew

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

CMD [ "node", "." ]
