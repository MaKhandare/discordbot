const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { openAIToken } = require("../config.json");

const configuration = new Configuration({
  apiKey: openAIToken,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("askgpt")
    .setDescription("ask gpt a question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("question to ask gpt")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prompt = interaction.options.getString("question");

    interaction.deferReply();
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 2048,
    });

    await interaction.editReply(
      "```" + completion.data.choices[0].text + "```"
    );
  },
};
