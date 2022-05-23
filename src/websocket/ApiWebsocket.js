const { MessageAttachment } = require('discord.js');
const WebSocketController = async (socket, rawRequest) => {
	const { type, data, id } = JSON.parse(rawRequest.toString());

	function entre(min, max) {
		return Math.floor(
			Math.random() * (max - min) + min,
		);
	}

	switch (type) {
	case 'ticket': {

		const guild = socket.client.guilds.cache.get("775328200044838922");
                console.log(data)
		const guildmember = await guild.member.fetch(data.user.id)
		if (guildmember.id !== data.user.id) {
			socket.api.send(JSON.stringify({ id, res: { err: true, msg: 'Você não está no servidor' } }));
			return;
		}

		const channel = await guild.channels.create(`ticket-${data.user.name}-${entre('1', '100000')}`, {
			permissionOverwrites: [{ allow: ['VIEW_CHANNEL'], id: data.user.id }, { deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'], id: guild.id }],
			topic: `<@${data.user.id}>`,
		});
		await channel.setParent(process.env.TICKET_OPEN_CATEGORY);
		await channel.send({ content: 'Prontinho! Eu criei um ticket para você, Antes de começar precisamos saber por que exatamente você esta aqui. escolha no botão abaixo', components: [{
			type: 1,
			components: [{
				type: 2,
				style: 1,
				label: 'Fazer uma denuncia',
				emoji: '<:mitsy_ban:894277577731084308>',
				custom_id: 'reportTicket',
			},
			{
				type: 2,
				style: 1,
				label: 'Duvida sobre a mitsy',
				emoji: '<:mitsy_think:834129966299217950>',
				custom_id: 'faqTicket',
			}],
		}],
		});
		socket.api.send(JSON.stringify({ id, res: { msg: 'Ticket criado', channel: `https://discord.com/channels/${process.env.COMMUNITY_GUILD}/${channel.id}` } }));
		break;
	}
	case 'background': {
		const file = new MessageAttachment(data.file.url);
		const guild = socket.client.guilds.cache.get(process.env.COMMUNITY_GUILD);
		const channel = guild.channels.cache.get(process.env.BACKGROUNDS_CHANNEL);
		await channel.send({ content: `Sugerido por: <@${data.user.id}>\nNome: ${data.background.name}\nColeção: ${data.background.collection}\nRaridade: ${data.background.rarity}\nDireitos: ${data.background.copyright}\n`, components: [{
			type: 1,
			components: [{
				type: 2,
				style: 3,
				label: 'Aprovado!',
				emoji: '<:mitsy_yes:853638770107482163>',
				custom_id: 'aprove_background',
			},
			{
				type: 2,
				style: 4,
				label: 'Melhor não!',
				emoji: '<:mitsy_no:853638580139720714>',
				custom_id: 'not_aprove',
			}],
		}],
		files: [file],
		});
		socket.api.send(JSON.stringify({ id, res: { msg: 'Mensagem criada' } }));
		break;
	}

	case 'fanart': {
		const file = new MessageAttachment(data.file.url);
		const guild = socket.client.guilds.cache.get(process.env.COMMUNITY_GUILD);
		const channel = guild.channels.cache.get(process.env.FANARTS_CHANNEL);
		await channel.send({ content: `Artista: <@${data.user.id}>\nTitulo: ${data.art.title}\nDescrição: ${data.art.description}\n\nDeseja aprovar a arte?`, components: [{
			type: 1,
			components: [{
				type: 2,
				style: 3,
				label: 'Aprovado!',
				emoji: '<:mitsy_yes:853638770107482163>',
				custom_id: 'aprove_fanart',
			},
			{
				type: 2,
				style: 4,
				label: 'Melhor não!',
				emoji: '<:mitsy_no:853638580139720714>',
				custom_id: 'not_aprove',
			}],
		}],
		files: [file],
		});
		socket.api.send(JSON.stringify({ id, res: { msg: 'Mensagem criada' } }));
	}

	}
};

module.exports = WebSocketController;
