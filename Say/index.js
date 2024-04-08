const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice')
const { createReadStream } = require('fs')
const { Client } = require('discord.js')
const speak = require('simple-tts')

const bot = new Client({ intents: 3276799 })

bot.on('ready', bot => console.log(`Bot running as ${bot.user.tag}`))

bot.on('messageCreate', async message => {
  if (!message.content.startsWith('>') || !message.member.voice.channel) return

  const player = createAudioPlayer()
  joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.channel.guildId,
    adapterCreator: message.guild.voiceAdapterCreator
  }).subscribe(player)

  speak(
    message.content.slice(1).trim().replaceAll(/[^a-zA-Z0-9 áÁàÀãÃéÉêÊíÍóÓôÔúÙçÇ]/g, ''), 
    { 
      format: 'mp3', filename: 'temp', lang: 'pt-br', 
      pitch: 0, speed: 120, wordgap: 1 
    }
  )
  await new Promise(resolve => setTimeout(resolve, 500))
  player.play(createAudioResource(createReadStream('temp.mp3')))
})

bot.login('TOKEN')
