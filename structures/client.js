const { Client, Intents } = require("discord.js")
const { readdirSync } = require("fs")
require("dotenv").config();
const path = require('path')

class Jeremias extends Client {
    constructor(options = { intents: Object.values(Intents.FLAGS) }) {
        super(options)

    }

    async loadEvents() {
        const files = readdirSync("./events")
        const filesName = files.map(file => file.replace(".js", ""))
        for(const fileName of filesName) {
            const event = require(`../events/${fileName}`)
            const data = new event()
            this.on(data.name, params => data.execute(params, this))
        }
    }

    async start() {
        process.on("unhandledRejection", (error) => console.log(error.stack))
        await this.loadEvents()
        await this.login(process.env.BOT_TOKEN)
        await this.user.setActivity({ name: `${this.guilds.cache.size} guilds` })
    }
}

module.exports = Jeremias