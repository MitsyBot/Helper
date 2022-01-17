const WebSocket = require('ws');

const WebSocketController = require('../websocket/ApiWebsocket')

module.exports = class APIWebSocket {

constructor(client) {
    this.client = client;
}


connect() {
    try {
        this.api = new WebSocket('wss://api.mitsy.xyz');
        this.prepareListeners();
        console.log('Conectando ao servidor.');
    }
    catch (err) {
        if (err instanceof Error) console.error(`Ocorreu um erro ao se conectar ao servidor: ${err.message}`);
        this.api = null;

        this.isAlive = false;
    }
}

heartbeat(data) {
    this.ruuningError = false;
    if (typeof this.pingTimeout !== 'undefined') clearTimeout(this.pingTimeout);

    this.isAlive = true;
    if (data) this.api.pong(data);

    this.pingTimeout = setTimeout(
        (manager) => {
            if (manager && manager.readyState === manager.OPEN) manager.terminate();
        },
        20000,
        this.api,
    );
}

onError(err) {
    this.ruuningError = true;
    this.isAlive = false;
    if (this.retries >= 5) {
        console.log('Cliente não vai mais tentar se conectar ao servidor');
        if (this.api) this.api.removeAllListeners();
        return;
    }

    console.log(`Erro: ${err.message}`);
    if (this.pingTimeout) clearTimeout(this.pingTimeout);

    setTimeout(() => {
        this.retries += 1;
        this.connect();
    }, 15000);
}

onClose() {
    this.isAlive = false;
    console.log('A conexão com o servidor foi fechada');
    if (this.ruuningError) return;
    if (this.api) this.api.terminate();
    if (this.pingTimeout) clearTimeout(this.pingTimeout);

    setTimeout(() => {
        this.connect();
    }, 5000);
}

prepareListeners() {
    if (!this.api) return;

    this.api
        .on('open', () => {
            console.log('Conectado');

            this.api.send(JSON.stringify({ 'client_type':'helper' }));

            this.retries = 0;
            this.heartbeat();
        })

        .on('message', (rawRequest) => WebSocketController(this, rawRequest))
        .on('close', () => this.onClose())
        .on('error', (err) => this.onError(err))
        .on('ping', (data) => this.heartbeat(data));
}
}