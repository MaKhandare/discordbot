# Discord Bot

A simple discord bot with [discord.js](https://discordjs.guide/#before-you-begin), which is able to

- ask ChatGPT-3.5 questions `/askgpt question` with the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction).
- join a voice channel, convert text to speech `/tts text` with the [ElevenLabsAI API](https://api.elevenlabs.io/docs).
- return the unixtimestamp with a discord preview `/unixtimestamp MM/DD/YYYY HH:MM:SS`

[Setting up bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

[Add bot to server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

## How to use

1. `git clone https://github.com/MaKhandare/discordbot.git` to clone the repo.

2. create `config.json` in root directory and enter the tokens and IDs.

```json
{
    "token": "YOUR_TOKEN",
    "clientId": "YOUR_CLIENT_ID",
    "guildId": "YOUR_GUILD_ID",
    "openAIToken": "YOUR_OPENAI_TOKEN",
    "elevenLabsAI": "YOUR_ELEVENLABS_TOKEN",
    "voice": "YOUR_ELEVENLABS_VOICE_ID"
}
```

`token, clientId` and `guildId` are discord related.

3. `npm install` to install dependencies

4. `node ./deploy-commands.js`

5. `node ./index.js`
