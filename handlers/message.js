const config = require("../configs/config.json");
const Discord = require("discord.js");

var cmdCol = new Set();
var dbCol = new Set();

module.exports = async (client, message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
      message.channel
        .send({
          embed: {
            title: `Você não pode **Executar Comandos** em minha DM`,
            color: 0xcc00ff
          }
        })
        .then(msg => {
          msg.delete(5000);
        });
    }
    if (message.content.includes("https://discord.gg/") || message.content.includes("discord.gg/")) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel
          .send({
            embed: {
              title: `:warning:  WARNING`,
              description: `${message.author}, **você nao pode divulgar aqui** `,
              color: 0xff0000
            }
          })
          .then(gg => {
            message.delete().catch(o => {
              console.log(`[MESSAGE.JS] -> Deletar Mensagem Anti-Invite: ${o}`);
            });
          });
      } else {
      }
    } else {
    }

    var prefixo;
    prefixo = config.prefix;

    if (message.content.indexOf(prefixo) !== 0) return;
    if (
      message.guild.me.hasPermission([
        "SEND_MESSAGES",
        "ADD_REACTIONS",
        "VIEW_CHANNEL"
      ])
    ) {
      const args = message.content.slice(prefixo.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd = client.commands.get(command);

      if (cmd) {
        cmd.run(client, message, args, prefixo);

        console.log(
          `[MESSAGE.JS] - > ${message.author.tag} executou o comando ${command}`
        );
        
        const embed = new Discord.RichEmbed()
  
        .addField("Servidor", `${message.guild.name}`)
        .addField("Usuario", `${message.author.username}`)
        .addField("Comando Requisitado", `${command}`)
        .setThumbnail(message.author.avatarURL)
          .setColor('#ff0101') 

        client.channels.get("id do canal para a log").send(embed)

        cooldownCMD();
      } else if (!cmd) {
        console.log(
          `[MESSAGE.JS] -> ${message.author.tag} Tentou usar um comando inexistente no server: ${message.guild.name}`
        );
      }
    } else {
      console.log(
        `[MESSAGE.JS] -> Sem permissão para Enviar/Reagir/Falar no server: ${message.guild.name}`
      );
    }

    if (!dbCol.has(message.author.id)) {
      dbCol.add(message.author.id);
      setTimeout(function() {
        dbCol.delete(message.author.id);
      }, 60 * 1000);
    }

    async function cooldownCMD() {
      cmdCol.add(message.author.id);
      setTimeout(function() {
        cmdCol.delete(message.author.id);
      }, 3000);
    }
  } catch (err) {
    console.log(`[MESSAGE.JS] -> Message Event:\n${err}`);
  }
};
