const Discord = require('discord.js');
const client = new Discord.Client();
const invites = {};
const wait = require('util').promisify(setTimeout);
var eco = require('discord-economy');

client.on('ready', () => {
	wait(1000);
	client.guilds.cache.forEach(g => {
		g.fetchInvites().then(guildInvites => {
			invites[g.id] = guildInvites;
		});
	});
	
});


client.on('ready', () =>{
    const guild = client.guilds.cache.get('735645868413288510')
    const channel = guild.channels.cache.get('735657389440892999')
    console.log('Bot je online')
    setInterval(function (){
        client.user.setActivity(`${guild.memberCount} membera`, {type: 'WATCHING'} );
        channel.setName(`Memberi: ${guild.memberCount}`)
    }, 3000)
});

client.on('guildMemberAdd', member =>{
    const member2 = member.user.username
    const guild = client.guilds.cache.get('735645868413288510')
    const role = guild.roles.cache.get('735649648727031908')
    const channel = guild.channels.cache.get('735649072991567922')
    member.guild.fetchInvites().then(guildInvites => {
		const ei = invites[member.guild.id];
		invites[member.guild.id] = guildInvites;
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		const inviter = client.users.cache.get(invite.inviter.id);
		const embed = new Discord.MessageEmbed()
            .setColor('#115aed')
            .setTitle('**Welcome to Coomunity Discord Server**')
            .setDescription(`Dobrodosli ${member2} na nas server.\nNadamo se da ce te uzivati.\n\nMi smo zajednica koja se trudi da ostvari komunikaciju izmedju ljudi, kao i da vam doprinese odlicnu zabavu.\nPre nego sto krenete molimo vas procitajte **PRAVILA**\n\nInvajtovan od strane **${inviter.tag}**\nInvite Link: https://discord.gg/invite/${invite.code}`)
            .setTimestamp(new Date())
        channel.send(embed);
        member.roles.add(role)
        member.user.send(embed)
    });
});
 

client.on('guildMemberRemove', member =>{
    const member2 = member.user.username
    const guild = client.guilds.cache.get('735645868413288510')
    const channel = guild.channels.cache.get('735649072991567922')
    const embed = new Discord.MessageEmbed()
        .setColor('#115aed')
        .setTitle('**Goodbye, thank you**')
        .setDescription(`Dovidjenja ${member2}, hvala ti sto si bio na nas server.`)
        .setTimestamp(new Date())
    channel.send(embed);
});

client.on('message', msg =>{
    const guild = client.guilds.cache.get('735645868413288510')
    const channel = guild.channels.cache.get('735651956629962824')
    if(msg.channel.id == '735651956629962824'){
        if (!msg.attachments.size > 0){
                msg.delete();
                return;
            }
    }
    
});

client.on('message', msg => {
    if(msg.content == '#help') {
        const embed = new Discord.MessageEmbed()
            .setColor('#115aed')
            .setAuthor(msg.author.username)
            .setTitle('**Community | Pomoc**')
            .setDescription('Trenutno dostupne komande na nasem serveru:\n\n**Staff Komande:**\n\n#check - Proverite korisnika\n#clear - Ocistite chat\n#say - Postavite obavestenje\n#dodaj - Dodajte novac igracu\n#oduzmi - Oduzmite novac igracu\n#reset - Resetiraj novac igracu\n#resetall - Resetirajte svima novac\n#giveall - Dodajte svima novac\n\n**Member Komande:**\n\n#invites - Proverite invajtove\n#av - Pogledajte avatar\n#novac - Proverite stanje na racunu\n#posao - Radite posao (samo u #radi-posao kanalu)\n#opljackaj - Opljackaj korisnika (1% Sanse)\n\n\nUskoro jos novih komandi za membere.')
        msg.delete();
        msg.channel.send(embed);

    }

});

client.on('message', msg => {
    if(msg.content.startsWith("#clear")) {
        if(msg.member.hasPermission('ADMINISTRATOR')){
            const number = msg.content.slice(6)
            if(!number){
                msg.channel.send('> Unesite broj poruka koje zelite izbrisati.')
            }
            else {
                msg.delete();
                msg.channel.bulkDelete(number);
            }
            
        }

    }

});

client.on('message', message => {
    if (message.content.startsWith("#invites")) {
        const user = message.mentions.users.first() || message.author;
        message.guild.fetchInvites().then(invites => {
            const userInvites = invites.array().filter(o => o.inviter.id == user.id)
            var userInvitesCount = 0
            for(var i=0; i < userInvites.length; i++){
                var invite = userInvites[i]
                if(!invite){
                    userInvitesCount == 0
                }
                else {
                    userInvitesCount += invite['uses'];
                }     
                


            }
            const embed = new Discord.MessageEmbed()
                .setColor(`#115aed`)
                .setTitle('**Invite System**')
                .setAuthor(`${user.username}'s Invites`)
                .setDescription(`${user.username} has **${userInvitesCount}** invites.`)
            message.channel.send(embed)

        })
    }
    
});

client.on('message', msg => {
    if(msg.content.startsWith("#say")) {
        if(msg.member.hasPermission('ADMINISTRATOR')){
            const number = msg.content.slice(4)
            const embed = new Discord.MessageEmbed()
                .setColor(`#115aed`)
                .setTitle('**OBAVESTENJE**')
                .setDescription(`${number}`)
                .setTimestamp(new Date())
                msg.channel.send(embed)
        }

    }

});

client.on('message', msg => {
    if(msg.content.startsWith("#check")) {
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(!msg.mentions.users.size){
                msg.channel.send("> Unesite ime korisnika")
            }
            else {
                const user = msg.mentions.users.first()
                    const embed = new Discord.MessageEmbed()
                    .setColor(`#115aed`)
                    .setTitle('**User Check**')
                    .setDescription(`Account: ${user.username}\nCreated at: ${user.createdAt}`)
                    .setTimestamp(new Date())
                    msg.channel.send(embed)
                    
                
            }
            
        }

    }

});


client.on('message', msg => {
    if(msg.content.startsWith("#av")) {
        const user = msg.mentions.users.first() || msg.author;
        let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
        const embed = new Discord.MessageEmbed()
            .setColor(`#115aed`)
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatar)
            msg.channel.send(embed);
            return;
        };
        
});

client.on('message', async msg => {
    const words = ['http', 'https', 'discord.gg', 'discord.com', 'youtube.com', 'invite.gg', 'youtu.be', 'yt.com']
    if(!msg.member) {
        
    }
    else {
        if(msg.member.hasPermission('ADMINISTRATOR')) return;
    }
    
    for (var i = 0; i < words.length; i++) {
        if(msg.content.includes(words[i])){
            const embed = new Discord.MessageEmbed()
                .setTitle('**Anti Advertise**')
                .setDescription(`${msg.member.user.username}, reklamiranje je zabranjeno ovde.`)
                .setColor('#115aed')
                msg.delete()
                msg.channel.send(embed)
        break;
    }
      }
    
});

client.on('ready', () => {
    console.log('Client is ready')
});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get('737009709223116895')
    const memberid = member.id;
    const profile = await eco.SetBalance(memberid, 100)
    const embed = new Discord.MessageEmbed()
        .setColor('#3268a8')
        .setTitle('**Community | Ekonomija**')
        .setDescription(`DobroDosao/la ${member.user.username} na na server\nUspesno si dobio **100**$ na svoj racun\nUkucaj **#novac** da proveris stanje racuna.`)
        .setTimestamp(new Date())
        .setFooter(`Community | Ekonomija [Official Bot] `)
        channel.send(embed)

});

client.on('message', async msg => {
    if(msg.content.startsWith('#novac')){
        if(!msg.mentions.users.size){
            const novac = await eco.FetchBalance(msg.author.id)
            const embed = new Discord.MessageEmbed()
            .setColor('#3268a8')
            .setTitle(`**Ekonomija | Stanje Racuna**`)
            .setDescription(`**Proveravate svoj racun**\n\nStanje na racunu: **${novac.balance}**$`)
            .setTimestamp(new Date())
            .setFooter('Community | Ekonomija')
            msg.channel.send(embed)
        }
        else {
            const novac = await eco.FetchBalance(msg.mentions.users.first().id)
            const embed = new Discord.MessageEmbed()
            .setColor('#3268a8')
            .setTitle(`**Ekonomija | Stanje Racuna**`)
            .setDescription(`**Proveravate racun od ${msg.mentions.users.first().username}**\n\nStanje na racunu: **${novac.balance}**$`)
            .setTimestamp(new Date())
            .setFooter('Community | Ekonomija')
            msg.channel.send(embed)
        }

    } 

});

client.on('message', async msg =>{
    if(msg.content.startsWith('#dodaj')){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(!msg.mentions.users.size){
                const args = msg.content.slice(6).trim().split(' ')
                const money = args[0]
                const profile = await eco.AddToBalance(msg.author.id, money)
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Uspesno ste dodali **${money}**$ na vas racun.`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
    
            }
            else {
                const args = msg.content.slice(6).trim().split(' ')
                const money = args[1]
                const profile = await eco.AddToBalance(msg.mentions.users.first().id, money)
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Uspesno ste dodali **${money}**$ na racun od **${msg.mentions.users.first().username}**.`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
    
            }
        }

    }
        
});

client.on('message', msg => {
    if(msg.member.hasPermission('ADMINISTRATOR')){
        if(msg.content.startsWith('#giveall')){
            const args = msg.content.slice(8).trim().split(' ')
            if(!args[0]){
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Unesite iznos koji zelite dodeliti igracima`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
            }
            else {
                msg.guild.members.cache.forEach(async member => {
                    const give = await eco.AddToBalance(member.user.id, args[0])
                    return;
                });
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Uspesno ste dodali **${args[0]}**$ svim igracima!`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)

            }
        }
    }

});

client.on('message', async msg =>{
    if(msg.content.startsWith('#oduzmi')){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(!msg.mentions.users.size){
                const args = msg.content.slice(7).trim().split(' ')
                const subtract = args[0]
                const profile = await eco.SubtractFromBalance(msg.author.id, subtract)
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Uspesno ste oduzeli **${subtract}**$ sa vaseg racuna.`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
    
            }
            else {
                const args = msg.content.slice(7).trim().split(' ')
                const subtract = args[1]
                const profile = await eco.SubtractFromBalance(msg.mentions.users.first().id, subtract)
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Uspesno ste oduzeli **${subtract}**$ sa **${msg.mentions.users.first().username}** racuna.`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
    
            }
        }
        }
        
});

client.on('message', async msg =>{
    if(msg.content == '#posao'){
        if(msg.channel.id == "737306495246532639"){
            const args = msg.content.slice(7).trim().split(' ')
            const subtract = args[0]
            var output = await eco.Work(msg.author.id)
            if (output.earned == 0) {
                const embed = new Discord.MessageEmbed()
                .setColor('#3268a8')
                .setTitle(`**Community | Ekonomija**`)
                .setDescription(`Nazalost, niste zaradili nista. Vise srece drugi put..`)
                .setFooter('Community | Ekonomija')
                msg.channel.send(embed)

            }
            else {
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Uspesno ste zaradili **${output.earned}**$\n\nPosao koji ste radili: **${output.job}**`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
            }
        

    }
    else {
        const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Community | Ekonomija**`)
                    .setDescription(`Posao mozete raditi samo u **#radi-posao** kanalu!`)
                    .setFooter('Community | Ekonomija')
                    msg.channel.send(embed)
    }

}
        

});-

client.on('message', async msg =>{
    if(msg.content == "#top3"){
        eco.Leaderboard({
            limit: 3, 
            filter: x => x.balance > 50 
          }).then(async users => { 
     
            if (users[0]) var firstplace = await client.users.fetch(users[0].userid)
            if (users[1]) var secondplace = await client.users.fetch(users[1].userid)
            if (users[2]) var thirdplace = await client.users.fetch(users[2].userid) 
        const embed = new Discord.MessageEmbed()
            .setColor('#3268a8')
            .setTitle(`**Community | Ekonomija**`)
            .setDescription(`**Top 3 - Korisnici\n\n**1. Mesto**\n${firstplace && firstplace.tag || 'Trenutno Nema'} **»** ${users[0] && users[0].balance || '0'}$\n\n**2. Mesto**\n${secondplace && secondplace.tag || 'Trenutno Nema'} **»** ${users[1] && users[1].balance || '0'}$\n\n**3. Mesto**\n${thirdplace && thirdplace.tag || 'Trenutno Nema'} **»** ${users[2] && users[2].balance || '0'}$`)
            .setFooter('Community | Ekonomija')
            msg.channel.send(embed)

        })
    }

});

client.on('message', async msg =>{
    if(msg.content.startsWith('#opljackaj')){
        if(!msg.mentions.users.size){
            const embed = new Discord.MessageEmbed()
                .setColor('#cccccc')
                .setTitle(`**Ekonomija | Greska**`)
                .setDescription(`Molimo vas tagajte korisnika (@korisnik) koga zelite opljackati.`)
                msg.channel.send(embed)
            
        }
        else {
            const user = msg.mentions.users.first()
            var chance = 0.1;
            if(Math.random() < chance){
                const money = await eco.FetchBalance(user.id)
                var subtract = await eco.SubtractFromBalance(user.id, money.balance).catch(console.log)
                var give = await eco.AddToBalance(msg.author.id, money.balance)
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Ekonomija | Pljacka**`)
                    .setDescription(`Uspesno ste opljackali **${user.username}** i dobili **${money.balance}**$`)
                    .setFooter(`Ekonomija | Community Bot`)
                    msg.channel.send(embed)
                }
            else {
                var subtract = eco.SubtractFromBalance(msg.author.id, 100)
                const embed = new Discord.MessageEmbed()
                    .setColor('#3268a8')
                    .setTitle(`**Ekonomija | Pljacka**`)
                    .setDescription(`Nazalost, niste uspeli opljackati **${user.username}**, izgubili ste **100**$`)
                    .setFooter(`Ekonomija | Community Bot`)
                    msg.channel.send(embed)
            }

        }

    }

});

client.on('message', async msg =>{
    if(msg.content.startsWith('#reset')){
        if(msg.member.hasPermission('ADMINISTRATOR'){
            const user = msg.mentions.users.first() || msg.author;
            var fetch = await eco.Delete(user.id)
            msg.channel.send(`> Uspesno ste resetovali racun od ${user.username}`)
        }
    }

});

client.on('message', async msg =>{
    if(msg.content.startsWith('#resetall')){
        if(msg.member.hasPermission('ADMINISTRATOR'){
            msg.members.forEach(member =>{
                 const fetch = await eco.Delete(member.user.id)
            });

        }
    }

});


client.login(process.env.BOT_TOKEN);
