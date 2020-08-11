const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const botsettings = require('./botsettings.json')

console.log('This bot is online :)!')


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const commandFolder = fs.readdirSync('./commands').filter(folder => folder);
for (const folder of commandFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.config.name, command);
        command.config.aliases.forEach(alias => {
            bot.aliases.set(alias, command.config.name)
        })
    }
} 

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.legnth === 0) {
        message.channel.send('Please enter a command!')
    }

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command)
        command.run(bot, message, args);
})

bot.login(botsettings.token)