const { WebhookClient } = require('discord.js')

async function sendServerStart(client) {
    const webhookClient = new WebhookClient({ id: '842477480396324874', token: 'K4G3lRxKuaeVmtmsTkgD7QhgjltG1jiX9f2DoR1OFypjHYQqxXwqmTTOANW38HFt-O1P' });
    await webhookClient.send({
        content: 'Bem vindo a **Casa da mitsy**\n\nEu sou uma simples bot para discord com muitas funcionalidades <:mitsy_happy:891887238076571759>\n\nQuer saber mais sobre minhas funcionalidades? Vá para a [Pagina de comandos](https://mitsy.xyz/comandos)'
    });
    await webhookClient.send({
        content: '**Regras**\n\n🔹 Não spame/floode os canais com mensagens repetitivas ou mensagens em um curto período de tempo\n\n🔸 Não Marque um usuário da staff para resolver seu problema, marque o <@&775338641370513418> para analisarem sua duvida\n🔹 Não divulgue nada no servidor, não é permitido fazer divulgação sem com que a equipe permita\n🔸 Respeite todos os usuários\n🔹 Não compartilhe conteúdos NSFW no servidor\n🔸 Não Provoque/Irrite Usuários no nosso servidor \n🔹 Evite usar Caps Lock para não poluir os canais\n🔸 Quando for entrar em uma call lembre-se de verificar se o seu microfone não atrapalhara os outros\n🔹 Não faça perguntas sobre a mitsy no privado das pessoas, abra um ticket no [Faq](https://mitsy.xyz/faq) para que pessoas da equipe analizem e te ajudem com seu problema\n🔸 Não ofenda a mitsy ou a equipe dela\n🔸 É proibido comercializar coisas com valores reais por cometinhas ou comercializar cometinhas por dinheiro real'
    });
    await webhookClient.send({
        content: '\n\nVocê devera seguir estas regras em qualquer outro servidor ByPoluxTrail ou em que a mitsy está.\nNão iremos passar a mão na cabeça de quem esta quebrando as regras\nQuando for pedir por ajuda certifique-se de anexar o maximo de coisas o possivel'
    });
    await webhookClient.send({
        content: '**Links**\n\n🔗[Me adicione](https://mitsy.xyz)\n🔗[Link para entrar neste servidor](https://mitsy.xyz/invite)\n[Compre premium](https://mitsy.xyz/premium)'
    });
}

module.exports = { sendServerStart }