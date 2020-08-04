require('http').createServer().listen(3000)

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./configs/config.json");


console.log("[INDEX.JS] -> Index sendo lida.");

const Enmap = require("enmap");
const fs = require("fs");

client.config = config;
client.commands = new Enmap();

//Eventos

fs.readdir("./handlers/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./handlers/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

console.log("[INDEX.JS] -> Handlers carregados")

//Comandos

fs.readdir("./comandos", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./comandos/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

  fs.readdir("./comandos/administracao", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./comandos/administracao/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
  });
  
  fs.readdir("./comandos/especiais", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./comandos/especiais/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
  });


  fs.readdir("./comandos/random", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./comandos/random/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
  });
  fs.readdir("./comandos/nsfw", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./comandos/nsfw/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
  });



console.log("[INDEX.JS] -> Comandos carregados");

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (
    message.content.startsWith(
      `<@${client.user.id}>` || `<@!${client.user.id}>`
    )
  ) {
    try {
      if (!message.guild.me.hasPermission("SEND_MESSAGES")) {
        console.log(`[INDEX.JS] -> Não tenho permissão para enviar mensagens`);
      }

      message.channel.send.embed1
    } catch (err) {
      console.log(err);
    }
  }

  let embed1 = new Discord.RichEmbed()
  .setColor("#00fcff")
  .setDescription(message.author.username)
  .addField(`Olá, ${message.author.username} precisa de ajuda? Use **/ajuda**. Caso encontre algum erro chame por <@532622097189437460>`)


});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.login(config.token);