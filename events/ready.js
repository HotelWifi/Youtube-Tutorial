const Discord = require('discord.js')

module.exports = bot => {
    console.log('Im ready!')
    bot.user.setActivity("!help for help", {type: PLAYING})
}