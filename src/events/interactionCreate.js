class event {
	constructor() {
		this.name = 'interactionCreate';
	}
	async execute(interaction, client) {
		if (!interaction.guild) return;
		if (interaction.isButton()) client.emit('button', interaction, client);
	}
}

module.exports = event;