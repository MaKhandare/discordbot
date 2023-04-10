const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unixtimestamp")
    .setDescription("returns unixtimestamp when given 'MM/DD/YYYY HH:MM:SS'")
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("MM/DD/YYYY HH:MM:SS")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    await wait(2000);

    const [dateComp, timeComp] = interaction.options
      .getString("date")
      .split(" ");
    const [month, day, year] = dateComp.split("/");
    const [hours, minutes, seconds] = timeComp.split(":");

    const date = new Date(year, month - 1, day, hours, minutes, seconds);

    const unixTimeStamp = Math.floor(date.getTime() / 1000);

    await interaction.editReply(
      `${unixTimeStamp.toString()}\n\`<t:${unixTimeStamp.toString()}:R>\`\nPreview: <t:${unixTimeStamp.toString()}:R>`
    );
  },
};
