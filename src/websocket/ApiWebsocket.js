const WebSocketController = async (socket, rawRequest) => {
	const { type, data, id } = JSON.parse(rawRequest.toString());

    function entre(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }

	switch (type) {
	case 'ticket': {
        const guild = socket.client.guilds.cache.get(process.env.COMMUNITY_GUILD);
        if(guild.member(data.user.id)){
        const channel = await guild.channels.create(`ticket-${data.user.name}-${entre('1', '100000')}`,{
            permissionOverwrites: [{ allow: ["VIEW_CHANNEL"],  id: data.user.id }, { deny: ["SEND_MESSAGES", "VIEW_CHANNEL"], id: guild.id }],
            topic: `<@${data.user.id}>`
        })
        await channel.setParent(process.env.TICKET_OPEN_CATEGORY)
        await channel.send({ content: `Prontinho! Eu criei um ticket para você, Antes de começar precisamos saber por que exatamente você esta aqui. escolha no botão abaixo`, components: [{
            type: 1,
            components: [{
                type: 2,
                style: 1,
                label: "Fazer uma denuncia",
                emoji: "<:mitsy_ban:894277577731084308>",
                custom_id: "reportTicket"
            },
            {
                type: 2,
                style: 1,
                label: "Duvida sobre a mitsy",
                emoji: "<:mitsy_think:834129966299217950>",
                custom_id: "faqTicket"
            }]
        }]
    })
		socket.api.send(JSON.stringify({ id, res: 'Ticket aberto com sucesso' }));
		break;
	} else {
        socket.api.send(JSON.stringify({ id, res: 'User not joined the guild' }))
    }
}
	}
};

module.exports = WebSocketController;