const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Client is ready!');
    setInterval(function(){
        const memberCount = client.guilds.cache.get('731544230140444773').memberCount;
        client.user.setActivity(`${memberCount} members`, {type: 'WATCHING'});

    }, 5000);
    
})

client.on('guildMemberAdd', member =>{
    const guild = client.guilds.cache.get('731544230140444773');
    const channel = guild.channels.cache.get('732364489420177439');
    const name = member.user.username
    const embed = new Discord.MessageEmbed()
        .setColor('#9003fc')
        .setAuthor('Welcome | ' + member.user.username)
        .setDescription(`Welcome **${name}** to **Hiqeust Network**. Please read #about channel.`)
        .setFooter('Hiqeust Network | Season 02')
        .setTimestamp(new Date())
        channel.send(embed)

});

client.on('message', msg => {
    if(msg.content == "/help"){
        const embed = new Discord.MessageEmbed()
            .setColor('#9003fc')
            .setTitle('**Hiquest Network | Season 02**')
            .setDescription(`All available commands:\n /info - Show server info\n /youtubers - See all youtuber that record on our server.`)
            .setFooter('Hiqeust Network | Season 02')
            .setTimestamp(new Date())
            msg.channel.send(embed)

    }

});

client.on('message', msg => {
    if(msg.content == "/info"){
        const embed = new Discord.MessageEmbed()
            .setColor('#9003fc')
            .setTitle('**Hiquest Network | Server Info**')
            .setDescription(`Not available yet!`)
            .setFooter('Hiqeust Network | Season 02')
            .setTimestamp(new Date())
            msg.channel.send(embed)

    }

});

client.on('message', msg => {
    if(msg.content == "/youtubers"){
        const embed = new Discord.MessageEmbed()
            .setColor('#9003fc')
            .setTitle('**Hiquest Network | Youtubers**')
            .setDescription(`Not available yet!`)
            .setFooter('Hiqeust Network | Season 02')
            .setTimestamp(new Date())
            msg.channel.send(embed)

    }

});

client.on('message', async msg => {
    const words = ['http', 'https', 'discord.gg', 'discord.com', 'youtube.com', 'invite.gg', 'youtu.be', 'yt.com']
    for (var i = 0; i < words.length; i++) {
        if(msg.content.includes(words[i])){
            const embed = new Discord.MessageEmbed()
                .setTitle('**Anti Advertise**')
                .setDescription(`${msg.member.user.username}, please do not advertise.`)
                .setColor('#9003fc')
                msg.delete()
                msg.channel.send(embed)
        break;
    }
      }
    
});



client.on('message', msg => {
    if(msg.content == "/clear"){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            msg.channel.bulkDelete(100)
            msg.delete();
        } return;
            
    }
});

client.on('message', msg => {
    if(msg.content == "/lockdown set"){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            const guild = client.guilds.cache.get('731544230140444773');
            const role = guild.roles.cache.get('732375607308059035')
            guild.members.cache.forEach(member => {
                member.roles.add(role)
            });
        } return;
            
    }
});

client.on('message', msg => {
    if(msg.content == "/lockdown end"){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            const guild = client.guilds.cache.get('731544230140444773');
            const role = guild.roles.cache.get('732375607308059035')
            guild.members.cache.forEach(member => {
                member.roles.remove(role)
            });
        } return;
            
    }
});



client.login(process.env.BOT_TOKEN);
