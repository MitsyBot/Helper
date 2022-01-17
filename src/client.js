const { Client, Intents } = require("discord.js")
const { readdirSync } = require("fs")
require("dotenv").config();
const APIWebSocket = require('./structures/MitsyWebsocket')

class Jeremias extends Client {
    constructor(options = { intents: Object.values(Intents.FLAGS) }) {
        super(options)
        this.apiWS = new APIWebSocket(this)
        
    }

    async loadEvents() {
        const files = readdirSync("./src/events")
        const filesName = files.map(file => file.replace(".js", ""))
        for(const fileName of filesName) {
            const event = require(`./events/${fileName}`)
            const data = new event()
            this.on(data.name, params => data.execute(params, this))
        }
    }

    async start() {
        process.on("unhandledRejection", (error) => console.log(error.stack))
        await this.loadEvents()
        await this.login(process.env.BOT_TOKEN)
        await this.user.setActivity({ name: `Yay | Ajudando ${this.users.cache.size} Usuarios` })
        this.apiWS.connect().catch(debugError);
    }
}

module.exports = Jeremias