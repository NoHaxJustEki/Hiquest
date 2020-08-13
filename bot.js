const Discord = require('discord.js');
const client = new Discord.Client();
const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('message', async msg => {
    if(msg.content == '#verifyset'){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            const embed = new Discord.MessageEmbed()
                .setColor('#115aed')
                .setTitle('**Verifikacija**')
                .setDescription('\nUkoliko vas bot ne verifikuje, ukucajte **#verify** da bi se verifikovali.')
                .setFooter('Verifikacija | Community Bot')
                msg.channel.send(embed)  
        }
    }
});

client.on('message', msg => {
    if(msg.channel.id == "736019810777038898"){
        if(!msg.author.id == "427430166319595531" || !msg.author.bot){
            if(msg.content == "#verify"){
                const role = msg.guild.roles.cache.get('735649648727031908')
                msg.member.roles.add(role)
                msg.delete();
            } else {
                msg.delete()
            }
                
            }
        }
      
});

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


client.on('guildMemberAdd', async member =>{
    const member2 = member.user.username
    const guild = client.guilds.cache.get('735645868413288510');
    const pravila = guild.channels.cache.get('735650593867169852');
    
    const channel = guild.channels.cache.get('735649072991567922')
    member.guild.fetchInvites().then(async guildInvites => {
		const ei = invites[member.guild.id];
		invites[member.guild.id] = guildInvites;
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		const inviter = client.users.cache.get(invite.inviter.id);
		const embed = new Discord.MessageEmbed()
            .setColor('#115aed')
            .setTitle('**Welcome to Coomunity Discord Server**')
            .setDescription(`Dobrodosli ${member.user.toString()} na nas server.\nNadamo se da ce te uzivati.\n\nMi smo zajednica koja se trudi da ostvari komunikaciju izmedju ljudi, kao i da vam doprinese odlicnu zabavu.\nPre nego sto krenete molimo vas procitajte ${pravila}\n\nInvajtovan od strane **${inviter.toString()}**\nInvite Link: https://discord.gg/invite/${invite.code}`)
            .setTimestamp(new Date())
        const send = await channel.send(embed);
        const send3 = await member.user.send(embed);
    
    });
    
});

client.on('guildMemberAdd', (member) => {
    const guild = client.guilds.cache.get('735645868413288510');
    const role = guild.roles.cache.get('735649648727031908');
    member.roles.add(role)
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
            .setDescription('Trenutno dostupne komande na nasem serveru:\n\n**Staff Komande:**\n\n#check - Proverite korisnika\n#clear - Ocistite chat\n#say - Postavite obavestenje\n\n**Member Komande:**\n\n!invites - Proverite invajtove\n#av - Pogledajte avatar\n\n\nUskoro jos novih komandi za membere.')
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



client.login(process.env.BOT_TOKEN);
