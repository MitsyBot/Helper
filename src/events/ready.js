const { MessageEmbed } = require('discord.js');
class event {
    constructor() {
        this.name = "ready"
    }

    execute(client) {  

        if(process.env.SEND_NOTIFYPANNEL === 'true') {

            const simpleEmbed = new MessageEmbed()
	        .setTitle('Cargos de notificações')
	        .setDescription('<:mitsy_ping:825404965568774174> **Novidades da mitsy:** Querendo ficar por dentro de todas as novidades sobre a mitsy? então é exatamente disso que você precisa!\n\n<:mitsy_boo:901160723399458879> **Incoming da mitsy:** Quer saber o que esta por vir nas proximas atualizações? então é disso que você precisa!\n\n<:mitsy_coffee:894277577701728347> **Status:** Quer saber se o discord caiu? se eu cai? se algum serviço esta instavel? então é disso que você esta precisando!\n\n<:mitsy_pray:901160723684683856> **Tweets:** Quer receber notificações das peripecias que a mitsy tweeta? então é exatamente este cargo que você precisa.')
            .setColor(`#${process.env.MITSY_COLOR}`)
            const channel = client.channels.cache.get(process.env.ROLES_CHANNEL)
            channel.send({
               embeds: [simpleEmbed],
               components: [{
                   type: 1,
                   components: [{
                       type: 2,
                       style: 1,
                       label: "Novidades da mitsy",
                       emoji: "<:mitsy_ping:825404965568774174>",
                       custom_id: "updatesrole"
                   },
                   {
                    type: 2,
                    style: 1,
                    label: "Incoming da mitsy",
                    emoji: "<:mitsy_boo:901160723399458879>",
                    custom_id: "incomingrole"
                },
                {
                    type: 2,
                    style: 1,
                    label: "Status",
                    emoji: "<:mitsy_coffee:894277577701728347>",
                    custom_id: "statusrole"
                },
                {
                    type: 2,
                    style: 1,
                    label: "Tweets da mitsy",
                    emoji: "<:mitsy_pray:901160723684683856>",
                    custom_id: "tweetrole"
                }]
               }]
           })
           }
    }
}

module.exports = event