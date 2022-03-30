/*
Gecikme için özür dilerim ancak işlerimden kaynaklı fazla ilgilenemiyorum botun main dosyası bu şekilde belki ben yapmadan denemeye çalışanlar olur diye koydum
Ayrıca eklenmesini istediğiniz şeyler için Niwren#1896 ekleyebilirsiniz veya discord.gg/ekipland && discord.gg/103 && discord.gg/serendia sunucularından bana ulaşabilirsiniz.
Hepinizi Kucaklıyore ❤️
*/

const { Client, Collection } = require("discord.js"),
      Server = require("./settings/server.json"),
      Mongoose = require('mongoose'),
      Bots = []


      
      for (const token of Server.Bots.Token) {
        
        const Bot = new Client({
            messageCacheLifetime: 60,
            fetchAllMembers: true,
            messageCacheMaxSize: 10,
            restTimeOffset: 0,
            restWsBridgetimeout: 100,
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: true,
            },
            partials: ["MESSAGE", "CHANNEL", "REACTION"],
            intents: 32767,
        });
        Moderation = Bot.user.id == Bots[0];
        İnvite = Bot.user.id == Bots[1];
        Stats = Bot.user.id == Bots[2];
        Audit = Bot.user.id == Bots[3];
/* 
Collectionı tek bir tane açıp içinde ayırabilirdim ancak anlaşılırlığı kolay olması adına böyle yaptım
*/
        Moderation.commands = new Collection(); 
        İnvite.commands = new Collection(); 
        Stats.commands = new Collection();
        Audit.commands = new Collection();

        Bot.on('ready', async() => {  
            console.log(`${Bot.user.username} (${Bot.user.id}) Grişi yaptı.`);Bots.push(client.user.id)
            Moderation.user.setUsername(Server.Bots.Name.Moderation).then(() => Moderation.user.setAvatar(Server.Bots.Avatar.Moderation))
            İnvite.user.setUsername(Server.Bots.Name.İnvite).then(() => İnvite.user.setAvatar(Server.Bots.Avatar.İnvite))
            Stats.user.setUsername(Server.Bots.Name.Stats).then(() => Stats.user.setAvatar(Server.Bots.Avatar.Stats))
            Audit.user.setUsername(Server.Bots.Name.Audit).then(() => Audit.user.setAvatar(Server.Bots.Avatar.Audit))
         });

         ["command_handler", "event_handler", "slash_handler", "app_handler"].forEach((handler) => {
            require(`./handlers/${handler}`)(Bot)
        });

        Bot.login(token).then(() => console.log('[+] Bot bağlantısı kuruldu.')).catch(() => console.log('[-] Bot bağlantısı kurulamadı.'));
        Mongoose.connect(Server.MongoURL).then(() => console.log('[+] Database bağlantısı kuruldu.')).catch(() => console.log('[+] Database bağlantısı kurulamadı.'));
    }
