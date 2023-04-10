const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, createAudioResource } = require("@discordjs/voice");
const { createAudioPlayer, NoSubscriberBehavior } = require("@discordjs/voice");

const { elevenLabsAI, voice_1 } = require("../config.json");

const axios = require("axios");
const fs = require("fs");

const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_1}`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tts")
    .setDescription("joins voice channel and speaks given text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("text to convert to speech")
        .setRequired(true)
    ),

  async execute(interaction) {
    const text = interaction.options.getString("text");
    interaction.deferReply();

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    connection.subscribe(player);

    await axios
      .post(
        url,
        {
          text,
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        },
        {
          headers: {
            accept: "audio/mpeg",
            "xi-api-key": `${elevenLabsAI}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        fs.writeFileSync("output.mp3", Buffer.from(response.data));
      })
      .catch((error) => {
        console.error(error);
      });

    player.on("stateChange", (oldState, newState) => {
      console.log(
        `Audio player transitioned from ${oldState.status} to ${newState.status}`
      );
    });

    const resource = createAudioResource(".\\output.mp3");
    player.play(resource);

    await interaction.editReply("speaking...");
  },
};
