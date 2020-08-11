const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Client is ready')
});

client.on('guildMemberAdd', async member => {
    const member = member.user.toString
    const channel = member.guild.channels.cache.get('737009709223116895')
    const memberid = member.id;
    const profile = await eco.SetBalance(memberid, 100)

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

