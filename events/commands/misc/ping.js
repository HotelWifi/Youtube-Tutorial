const Discord = require("discord.js");
const botconfig = require("../../botsettings.json")

module.exports.run = async (client, message, args) => {
    message.channel.send('Pong!')
}

module.exports.config = {
    name: "ping",
    description: "Pings the bot.",
    usage: "ping",
    accesability: "!ping",
    aliases: []
}