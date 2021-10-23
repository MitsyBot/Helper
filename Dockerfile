FROM node:16

WORKDIR /home/mitsy/JeremiasNew

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

CMD [ "node", "." ]