const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json");
const moment = require("moment"); //baixar a lib
moment.locale("pt-BR");
var Jimp = require("jimp"); //baixar lib

client.on('guildMemberAdd', member => {
    var x = member.guild.channels.get("486690000759422977");
    if(!x) return;
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(member.user.avatarURL)
    .setTitle(`Seja bem-vindo(a)`)
    .setAuthor(member.user.tag, member.user.displayAvatarURL)
    .setDescription(`:heavy_minus_sign: Opa! ${member.user.username} entrou no nosso servidor :3!`)
    .addField("Opá, Tudo Bom ? Bem vindo ao nosso Servidor Divirta-se :dizzy:", "Invite Friends : https://discord.gg/???")
    .setTimestamp()
    .setFooter("Sistema de registro de membros do discord!", 'https://images-ext-2.discordapp.net/external/kZiLLW0vzLwQx_2m6kmtn_-FmH_GOwV1h3TFVObKgAs/https/media.giphy.com/media/YnLMGftwZ9pOU/giphy.gif')
    x.send(embed)  
});
client.on('guildMemberRemove', member => {
  var x = member.guild.channels.get("486690000759422977");
  if(!x) return;
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Volte Sempre!")
  .setThumbnail(member.user.avatarURL)
  .setDescription(`${member.user.username} Saiu do servidor `)
  .setTimestamp((Date))
  .setFooter("Sistema de registro de membros do discord!", 'https://images-ext-2.discordapp.net/external/kZiLLW0vzLwQx_2m6kmtn_-FmH_GOwV1h3TFVObKgAs/https/media.giphy.com/media/YnLMGftwZ9pOU/giphy.gif')
  x.send(embed)
})
client.on('guildMemberAdd', member => {
  member.send('Bem-vindo ao **' + member.guild.name + '** ' + member.user.username + '!');
});

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setActivity(`redset33#9052`);
// caso queira o bot trasmitindo use:
/*
   client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/ladonegro'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
      */
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  // coamdno ping
  if(comando === "ping") { 
        const m = await message.channel.send("Ping?");
        m.edit('🏓pong! Seu ping é de ``'+`${m.createdTimestamp - message.createdTimestamp}`+"`` ms. E a latencia da API ``" + `${Math.round(client.ping)}` + "`` ms")
    };
  //comando falar
  if(comando === "say") { 
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }

//comando limpar o chat.
  if(comando === "limpar") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }

    //comando de kick
    if(comando === `kick`){
  
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Não consegui achar esse usuario!");
      let kReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Você não tem permissão para **kickar membros**!" + message.author).then(m => m.delete(3000));
      if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Essa pessoa não pode ser kickada!");
  
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("KICK")
      .setColor("#RANDOM")
      .addField("Usuario kickado", `${kUser}`)
      .addField("Kickado por", `<@${message.author.id}>`)
      .addField("Motivo", kReason);
  
      let kickChannel = message.guild.channels.find(`name`, "kickeds");
      if(!kickChannel) return message.channel.send("Não consegui achar o canal de kickeds!");
  
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
  
      return;
    }
  
  //comando de como fazer EMBED EM JS.
  if(comando === "exemplo1") {
    const embed = new Discord.RichEmbed()
    .setColor(`#000000`)
    .setTitle("Como fazer um embed?")
    .addField("Primeiros passos","Criar uma constavel com um novo Discord RichEmbed como segue na imagem..")
    .addField("Segundo passo","Adcionar algo para seu bot")
    .addField("Verifique todos os comandos de adcionais para embed digitando:", "!adcionais")
    .addField("Terceiro e ultimo passo","Faça seu bot enviar uma mensagem,tanto na DM da pessoa quanto no canal,como mostrado na imagem..")
    .setImage("https://cdn.discordapp.com/attachments/423220315582365699/428607872117768192/unknown.png")
    .setThumbnail(`${client.user.avatarURL}`)
    .setFooter("Como fazer embed em JS", "https://images-ext-2.discordapp.net/external/0HvO3tEhXx3-sAJmU9edKDlEAX1pGkLE3DNSiSMMf7U/https/cdn.discordapp.com/attachments/470763193124519936/485237915761508352/terra.gif")
    message.channel.sendEmbed(embed)
};

  //comando de teste e EMBED
  if(comando === "teste") {
    let embed = new Discord.RichEmbed()
    .setAuthor("Olá eu sou o AUTHOR", message.author.displayAvatarURL)
    .setColor("#ccccff"/*ou qualquer cor que quiser*/)
    .setDescription("Olá eu sou o DESCRIPTION")
    .setFooter("Olá eu sou o FOOTER", message.author.displayAvatarURL)
    .setImage('https://img.ibxk.com.br//2018/02/07/07154957132162-t1200x480.jpg')
    .setThumbnail('https://cheapgameaccessories.com/wp-content/uploads/2018/04/discord.png')
    .setTimestamp(new Date())
    .setTitle("Olá eu sou o TITLE")
    .addField("Olá eu sou o FIELD(1)", "Olá eu sou o FIELD(2)", true/*ou false para não ficar um do lado do outro*/)
    message.channel.send(embed);
}

    //comando de votação.
    if(comando === "votação") {

      const sayMessage = args.join(" ");

      let servIcon = message.guild.iconURL;
      let esayEmbed = new Discord.RichEmbed()
      .setTitle('📢 VOLTZ - Votação:')
      .setDescription(sayMessage)
      .setFooter(`Enviado por: ${message.author.username}`)
      .setTimestamp(new Date())
      .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL);

      message.channel.send(esayEmbed).then(messageBot => {
          messageBot.react('👍')
          messageBot.react('👎')
          if(!message.member.hasPermission("ADMINISTRADOR")) return message.channel.send("Você não tem permissão para **!votação**!" + message.author).then(m => m.delete(3000));
      });

      message.delete().catch(O_o=>{});
  }

  //comando de sugestão.
  if(comando === "sugestão") {

    const sayMessage = args.join(" ");

    let servIcon = message.guild.iconURL;
    let esayEmbed = new Discord.RichEmbed()
    .setTitle('Sugestão')
    .setDescription(sayMessage)
    .setFooter(`Sugestão escrita por ${message.author.username}`)
    .setTimestamp(new Date())
    .setColor('#000000');

    message.channel.send(esayEmbed).then(messageBot => {
        messageBot.react('✅')
        if(!message.member.hasPermission("ADMINISTRADOR")) return message.channel.send("Você não tem permissão para **!votação**!" + message.author).then(m => m.delete(3000));
    });

    message.delete().catch(O_o=>{});
}  

  //comndo de chat off.
  if(comando === "chatoff") {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.channel.send(`Não consegue né?`);     
      }

  let roleToMute    = message.guild.roles.find('name', '@everyone');

  message.channel.overwritePermissions(roleToMute, { SEND_MESSAGES: false }, "Motivo");
  
  message.channel.overwritePermissions(roleToDesmute, { SEND_MESSAGES: true }, "Motivo");

  message.channel.send(`O canal ${message.channel} foi **desativado** para os ${roleMute.name}`);

}
  //comando de chat online.
  if(comando === "chaton") {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.channel.send(`Não consegue né ?`);     
      }

  let roleToDesmute = message.guild.roles.find('name', '@everyone');

  message.channel.overwritePermissions(roleToDesmute, { SEND_MESSAGES: true }, "Motivo");

  message.channel.send(`O canal ${message.channel} foi **ativado** para os ${roleToDesmute.name}`);

}

  //comando de avatar.
  if(comando === "avatar") {
let member = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
    let avatar = member.displayAvatarURL;
    if (avatar.endsWith(".gif")) {
        avatar = `${member.displayAvatarURL}?size=2048`
    }
    message.channel.send({
        embed: {
            title: `Exibindo avatar de ${member.username}`,
            description: `[Link Direto](${avatar})`,
            image: {
                url: avatar
            }
        }
    })
  }


  if(message.content.startsWith("servidores")){
    var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .addField('Servidores onde estou:', `${client.guilds.map(i => i.name + " " + i.memberCount + " membros").join('\n')}`)
    message.channel.send(embed)
}

  //comando de botlog.
    if(comando === "avisar") {

        const sayMessage = args.join(" ");

        if(sayMessage) {
                    let servIcon = message.guild.iconURL;
        let esayEmbed = new Discord.RichEmbed()

        .setTitle(':loudspeaker: VOLTZ:')
        .setDescription(sayMessage)
        .setFooter(`Enviado por: ${message.author.username}`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL);

        message.channel.send(esayEmbed).then(messageBot => {
            messageBot.react('😎');
    });
        } else {
            message.reply('o jeito certo é: !avisar <mensagem>');
        }
        };

    //comando de notificar.
    if(comando === "avisar") {

        const sayMessage = args.join(" ");

        if(sayMessage) {
                    let servIcon = message.guild.iconURL;
        let esayEmbed = new Discord.RichEmbed()

        .setTitle(':loudspeaker: VOLTZ:')
        .setDescription(sayMessage)
        .setFooter(`Enviado por: ${message.author.username}`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL);

        message.channel.send(esayEmbed).then(messageBot => {
            messageBot.react('😎');
    });
        } else {
            message.reply('o jeito certo é: !avisar <mensagem>');
        }
        };

    //status dos membros
    if(comando === "membros") {
        let MembrosTotal = message.guild.memberCount;
        let MembrosOnline = message.guild.members.filter(a => a.presence.status == "online").size;
        let MembrosOcupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
        let MembrosAusente = message.guild.members.filter(a => a.presence.status == "idle").size;
        let MembrosOffline = message.guild.members.filter(a => a.presence.status == "offline").size;
    
        let statusembed = new Discord.RichEmbed()
        .addField('Membros', `**Online:** ${MembrosOnline} | **Total:** ${MembrosTotal} | **Ausente:** ${MembrosAusente} | **Ocupado:** ${MembrosOcupado} | **Offline:** ${MembrosOffline} `)
        .setColor("RANDOM");

        message.channel.send(statusembed)
        message.delete();
    }

    //comando de informações do servidor.
    if(comando === "serverinfo") {
        let online = message.guild.members.filter(a => a.presence.status == "online").size;
        let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
        let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
        let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
        let bot = message.guild.members.filter(a => a.user.bot).size;
        let totalmembros = message.guild.memberCount;
        let canaistexto = message.guild.channels.filter(a => a.type === "text").size;
        let canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;
        let cargos = message.guild.roles.map(a => a).join(", ")
            const embed = new Discord.RichEmbed()
            .setTitle(`Informações do servidor **${message.guild.name}**`)
            .setColor("#FF0000")
            .addField('Dono', `<@${message.guild.owner.id}>`)
            .addField('Criado em:',  moment(message.guild.createdAt).locale('pt-BR').format('LLLL'))
            .addField("ID", message.guild.id)
            .addField(`Membros [${totalmembros}]`, `Online: ${online}\nAusente: ${ausente}\n Ocupado: ${ocupado}\n Offline: ${offline}\n Bots: ${bot}`)
            .addField(`Canais [${canaistexto+canaisvoz}]`, `Texto: ${canaistexto}\n Voz: ${canaisvoz}`)
            .addField(`Cargos [${message.guild.roles.size}]`, cargos)
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Sistema de informações do servidor!`, "https://discordemoji.com/assets/emoji/RingingBell.gif")
            message.channel.send(embed)
            message.delete();
    };

    //comando de addbot.
    if(comando === "addbot") {
    
      const id = args[0]
      if(!id) return message.reply("use assim: `!addbot <id do bot> <prefix>`!")
      if(isNaN(id) == true) return message.reply(`o ID é composto apenas por números, '\`${id}\`' não é um ID valido! :frowning:`)
      const prefix = args[1]
      if(!prefix) return message.reply("use assim: `!addbot <id do bot> <prefix>`!")
  
      const addbot = new Discord.RichEmbed()
          .setColor("#0092ca")
          .setTitle(`🤖 NOVO BOT:`)
  
          .setDescription(`${message.author} fez a aplicação para adicionar o seu bot!
          
          **ID**: \`${id}\`
          **Prefix**: \`${prefix}\`
          **Invite (gerado automaticamente)**: https://discordapp.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot`)
          .setTimestamp()
  
      message.guild.channels.get("487270202648690698").send(addbot)
      message.channel.send(`:white_check_mark: **|** ${message.author} seu bot está na lista de espera!`)
  
  }

    //comando de informações do bot.
    if(comando === "botinfo") {
  
        let bicon = client.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription(`Informações do Bot`)
        .setColor("RANDOM")
        .setThumbnail(bicon)
        .addField("Criador", "redset9052")
        .addField("Nome do bot", client.user.username)
        .addField("Criado em", moment(client.user.createdAt).locale('pt-BR').format('LLLL'));
    
        return message.channel.send(botembed);
        message.delete();
      }

  // comando ban
  if(comando === "ban") {
  
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Não conseguir achar o usuario!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Você não tem permissão para **banir membros**!" + message.author).then(m => m.delete(3000));
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Essa pessoa não pode ser banida!");

    let banEmbed = new Discord.RichEmbed()

    .setTitle("BAN")
    .setColor("RANDOM")
    .addField("Usuario banido", `${bUser}`)
    .addField("Banido por", `<@${message.author.id}>`)
    .addField("Motivo", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "banished");
    if(!incidentchannel) return message.channel.send("Não consegui achar o canal de banished!");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    message.delete();

    return;
  }
  
});

client.login(config.token);