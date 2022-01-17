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
        const channel = await guild.channels.create(`ticket-${data.user.discriminator}-${entre('1', '100000')}`,{
            permissionOverwrites: [{ allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],  id: data.user.id }, { deny: ["SEND_MESSAGES", "VIEW_CHANNEL"], id: guild.id }],
            topic: data.user.id
        })
        await channel.setParent(process.env.TICKET_OPEN_CATEGORY)
        await channel.send({ content: `Prontinho! Eu criei um ticket para você, faça sua pergunta e aguarde até que um membro da equipe venha tirar sua dúvida\n\nFaça sua pergunta de uma forma simples e objetiva, se você precisar, anexe imagens. Para que a <@&${process.env.MITSY_SUPPORT_ROLE}>, <@&${process.env.MITSY_BODYGUARD_ROLE}> possam te ajudar com mais eficiência.\n\nE nós esperamos que você tambem tenha lido a pagina de [FAQ](https://mitsy.xyz/faq) no website`, components: [{
            type: 1,
            components: [{
                type: 2,
                style: 1,
                label: "Fechar o seu ticket",
                emoji: "📝",
                custom_id: "closeTicket"
            }]
        }]
    })
		socket.api.send(JSON.stringify({ id, res: 'Ticket aberto com sucesso' }));
		break;
	}
	}
};

module.exports = WebSocketController;