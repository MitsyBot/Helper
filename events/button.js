class event {
    constructor() {
        this.name = "button"
    }
    async execute(button, client) {
        function entre(min, max) {  
            return Math.floor(
              Math.random() * (max - min) + min
            )
          }
        await button.deferUpdate()
        if(button.customId === "ticket") {
                const channel = await button.guild.channels.create(`duvida-${button.user.discriminator}-${entre('1', '100000')}`,{
                    permissionOverwrites: [{ allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],  id: button.user.id }, { deny: ["SEND_MESSAGES", "VIEW_CHANNEL"], id: button.guild.id }],
                    topic: button.user.id
                })
                await channel.setParent(process.env.TICKET_OPEN_CATEGORY)
                await button.followUp({ content: `Seu ticket foi criado! Por favor mande a sua pergunta no ticket: ${channel.toString()}`, ephemeral: true })
                await channel.send({ content: `Prontinho! Eu criei um ticket para você, faça sua pergunta e aguarde até que um membro da equipe venha tirar sua dúvida\n\nFaça sua pergunta de uma forma simples e objetiva, se você precisar, anexe imagens. Para que a <@&${process.env.MITSY_SUPPORT_ROLE}>, <@&${process.env.MITSY_BODYGUARD_ROLE}> possam te ajudar com mais eficiência.\n\nE nós esperamos que você tambem tenha lido a pagina de FAQ no website`, components: [{
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
        }

        if(button.customId === "updatesrole") {
            const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.NOTIFY_ROLE);

            if (button.member.roles.cache.has(role.id)) {
                button.member.roles.remove(role);
                await button.followUp({ content: `Poxa que tristeza, você não quer mais receber minhas novidades. achei que fossemos amigos!`, ephemeral: true })
              } else {
                button.member.roles.add(role);
                await button.followUp({ content: `Prontinho, agora você ira ser notificado das novidades da mitsy`, ephemeral: true })
              }
    }

    if(button.customId === "incomingrole") {
        const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.INCOMING_ROLE);

        if (button.member.roles.cache.has(role.id)) {
            button.member.roles.remove(role);
            await button.followUp({ content: `Poxa que tristeza, você não quer mais receber minhas novidades que estão por vir. achei que fossemos amigos!`, ephemeral: true })
          } else {
            button.member.roles.add(role);
            await button.followUp({ content: `Prontinho, agora você ira ser notificado das novidades que estão por vir da mitsy`, ephemeral: true })
          }
}

if(button.customId === "statusrole") {
    const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.STATUS_ROLE);

    if (button.member.roles.cache.has(role.id)) {
        button.member.roles.remove(role);
        await button.followUp({ content: `Poxa que tristeza, você não quer mais saber quando eu estou online. achei que fossemos amigos!`, ephemeral: true })
      } else {
        button.member.roles.add(role);
        await button.followUp({ content: `Prontinho, agora você ira ser notificado do status do discord e da mitsy`, ephemeral: true })
      }
}

if(button.customId === "tweetrole") {
    const role = client.guilds.cache.get(process.env.COMMUNITY_GUILD).roles.cache.get(process.env.TWEET_ROLE);

    if (button.member.roles.cache.has(role.id)) {
        button.member.roles.remove(role);
        await button.followUp({ content: `Poxa que tristeza, você não quer mais receber meus tweets. achei que fossemos amigos!`, ephemeral: true })
      } else {
        button.member.roles.add(role);
        await button.followUp({ content: `Prontinho, agora você ira ser notificado dos tweets da mitsy`, ephemeral: true })
      }
}
        if(button.customId === "closeTicket") {
            await button.message.edit({ components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 1,
                    label: "Seu ticket foi fechado",
                    emoji: "✅",
                    custom_id: "closeTicket",
                    disabled: true
                }]
            }]
        })
         await button.channel.send({ content: `Ok. Ticket fechado, espero que sua duvida tenha sido resolvida, você ira perder acesso a esse ticket em 10 segundos`})
          setTimeout(() => {
            button.channel.setParent(process.env.TICKET_CLOSED_CATEGORY)
        }, 10000)
        }
    }
}

module.exports = event