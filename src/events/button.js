const axios = require('axios');
const FormData = require('form-data');
const { MessageEmbed } = require('discord.js');

class event {
	constructor() {
		this.name = 'button';
	}
	async execute(button, client) {
		await button.deferUpdate();

		if (button.customId === 'not_aprove') {
			button.message.delete();
		}
		if (button.customId === 'aprove_background') {
			const name = button.message.content.match(/((?<=\nNome: )(.*)(?=\n))/)[0],
				collection = button.message.content.match(/((?<=\nColeção: )(.*)(?=\n))/)[0],
				rarity = button.message.content.match(/((?<=\nRaridade: )(.*)(?=\n))/)[0];

			const message_attach = JSON.parse(JSON.stringify(Array.from(button.message.attachments.values())[0]));
			const image = await axios.get(message_attach.attachment, {
				responseType: 'arraybuffer',
			});
			const anysize = 8;
			const charset = 'abcdefghijklmnopqrstuvwxyz1234567890';
			let id = '';
			for (let i = 0; i < anysize; i++) {id += charset[Math.floor(Math.random() * charset.length)];}
			const imageBuffer = Buffer.from(image.data, 'binary');
			const buffered = new FormData();
			buffered.append('file', imageBuffer, { filename: `${id}.png`, contentType: 'image/png', knownLength: imageBuffer.toString().length });
			await axios.post('https://cdn.poluxtrail.fun/background/', buffered, {
				headers: {
					...buffered.getHeaders(),
					'Authorization': 'dsaioqwjdqjidqwspodkmqwiodsqh',
				},
				maxBodyLength: 20971520,
				maxContentLength: 20971520,
			});
			const from = button.message.mentions.members.first();
			const body = {
				id, name, collection, rarity, from: from.user.id,
			};
			await axios.post('https://api.mitsy.xyz/shop/background/create', body, {
				headers: {
					'Authorization': 'DJQWDIQWIDJOQKMXNQWIXWJQOXKJQHIO-SKXNJHQBGWQIOXPQLWKXQ.XQWXQ.XW8QIODKJQWIC09QKOSXNZBVQW-0QIWEYTQ87S9',
				},
			});

			const webhook = await client.fetchWebhook(
				process.env.BACKGROUNDS_WEBHOOK_ID,
				process.env.BACKGROUNDS_WEBHOOK_TOKEN,
			);

			const embed = new MessageEmbed()
				.setColor('#8DF04D')
				.setTitle('Um novo background foi aprovado')
				.setDescription(button.message.content + `\nValor: ${Number(rarity) * 7000}`)
				.setImage(message_attach.attachment)
				.setFooter({ text: `Background aprovado por ${button.user.username}`, iconURL:	`https://cdn.discordapp.com/avatars/${button.user.id}/${button.user.avatar}` });


			webhook.send({ embeds: [embed] });

			await button.message.edit({ components: [{
				type: 1,
				components: [{
					type: 2,
					style: 3,
					label: 'Aprovado!',
					emoji: '<:mitsy_yes:853638770107482163>',
					custom_id: 'aprove_background',
					disabled: true,
				},
				{
					type: 2,
					style: 4,
					label: 'Melhor não!',
					emoji: '<:mitsy_no:853638580139720714>',
					custom_id: 'not_aprove',
					disabled: true,
				}],
			}],
			});
		}

		if (button.customId === 'updatesrole') {
			const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.NOTIFY_ROLE);

			if (button.member.roles.cache.has(role.id)) {
				button.member.roles.remove(role);
				await button.followUp({ content: 'Poxa que tristeza, você não quer mais receber minhas novidades. achei que fossemos amigos!', ephemeral: true });
			}
			else {
				button.member.roles.add(role);
				await button.followUp({ content: 'Prontinho, agora você ira ser notificado das novidades da mitsy', ephemeral: true });
			}
		}

		if (button.customId === 'incomingrole') {
			const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.INCOMING_ROLE);

			if (button.member.roles.cache.has(role.id)) {
				button.member.roles.remove(role);
				await button.followUp({ content: 'Poxa que tristeza, você não quer mais receber minhas novidades que estão por vir. achei que fossemos amigos!', ephemeral: true });
			}
			else {
				button.member.roles.add(role);
				await button.followUp({ content: 'Prontinho, agora você ira ser notificado das novidades que estão por vir da mitsy', ephemeral: true });
			}
		}

		if (button.customId === 'statusrole') {
			const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.STATUS_ROLE);

			if (button.member.roles.cache.has(role.id)) {
				button.member.roles.remove(role);
				await button.followUp({ content: 'Poxa que tristeza, você não quer mais saber quando eu estou online. achei que fossemos amigos!', ephemeral: true });
			}
			else {
				button.member.roles.add(role);
				await button.followUp({ content: 'Prontinho, agora você ira ser notificado do status do discord e da mitsy', ephemeral: true });
			}
		}

		if (button.customId === 'tweetrole') {
			const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.TWEET_ROLE);

			if (button.member.roles.cache.has(role.id)) {
				button.member.roles.remove(role);
				await button.followUp({ content: 'Poxa que tristeza, você não quer mais receber meus tweets. achei que fossemos amigos!', ephemeral: true });
			}
			else {
				button.member.roles.add(role);
				await button.followUp({ content: 'Prontinho, agora você ira ser notificado dos tweets da mitsy', ephemeral: true });
			}
		}

		if (button.customId === 'faqTicket') {

			const name = button.channel.name;
			const newName = name.replace('ticket', 'duvida');
			await button.channel.setName(newName);

			button.message.delete();
			button.channel.permissionOverwrites.edit(button.user.id, {
				SEND_MESSAGES: true,
			});
			await button.followUp({ content: `Ok, aguarde por um usuario da <@&${process.env.MITSY_BODYGUARD_ROLE}> ou do <@&${process.env.MITSY_SUPPORT_ROLE}> te responder, Enquanto isso você pode falar para nós qual sua duvida.\nE alias espero que você tenha lido o [FAQ](https://mitsy.xyz/faq) antes de abrir este ticket`, components: [{
				type: 1,
				components: [{
					type: 2,
					style: 1,
					label: 'Fechar o ticket',
					emoji: '<:mitsy_coffee:894277577701728347>',
					custom_id: 'closeTicket',
				}],
			}],
			});
		}

		if (button.customId === 'reportTicket') {

			const name = button.channel.name;
			const newName = name.replace('ticket', 'denuncia');
			await button.channel.setName(newName);

			button.message.delete();
			button.channel.permissionOverwrites.edit(button.user.id, {
				SEND_MESSAGES: true,
			});

			await button.followUp({ content: `Opa aparentemente você veio denunciar um meliante, aguarde um dos usuario da <@&${process.env.MITSY_BODYGUARD_ROLE}> te responder,\nEnquanto isso diga o motivo do report e anexe o maximo de informações possivel`, components: [{
				type: 1,
				components: [{
					type: 2,
					style: 1,
					label: 'Fechar o ticket',
					emoji: '<:mitsy_coffee:894277577701728347>',
					custom_id: 'closeTicket',
				}],
			}],
			});
		}
		if (button.customId === 'closeTicket') {
			await button.message.edit({ components: [{
				type: 1,
				components: [{
					type: 2,
					style: 1,
					label: 'Seu ticket foi fechado',
					emoji: '✅',
					custom_id: 'closeTicket',
					disabled: true,
				}],
			}],
			});
			await button.channel.send({ content: 'Ok. Ticket fechado, espero que sua duvida tenha sido resolvida, você ira perder acesso a esse ticket em 10 segundos' });
			setTimeout(() => {
				button.channel.setParent(process.env.TICKET_CLOSED_CATEGORY);
			}, 10000);
		}
	}
}

module.exports = event;