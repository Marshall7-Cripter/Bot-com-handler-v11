const Discord = require("discord.js");
const client = new Discord.Client({});

module.exports = (client, prefix) => {
  try {
    console.log(`[HANDLERS / READY.JS] -> Bot Conectado e Ativo`);

    setTimeout(function() {
      client.channels.get("id do canal (não é obrigatorio caso não queira é só apagar.)").send(`[HANDLERS / READY.JS]: Guilds: ${client.guilds.size}, Usuários: ${client.users.size}, canais: ${client.channels.size}`)
      console.log(` **[HANDLERS / READY.JS] -> Servidores: ${client.guilds.size}\nUsuários: ${client.users.size}\nCanais: ${client.channels.size}** `);
    }, 1000);

    /*
    //  0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
   //   4 = Jogando
*/

    const status = [
      {
        name: ``,
        type: 3,
        url: ""
      },
      {
        name: `L`,
        type: 1,
        url: ""
      },
      {
        name: ``,
        type: 1,
        url: ""
      },
      {
        name: ``,
        type: 1,
        url: ""
      },
      {
        name: ``,
        type: 3,
        url: ""
      },
      {
        name: ``,
        type: 3,
        url: ""
      }
    ];

    function setStatus() {
      let randomStatus = status[Math.floor(Math.random() * status.length)];
      client.user.setPresence({ game: randomStatus });
    }

    setStatus();
    setInterval(() => setStatus(), 5500);
  } catch (err) {
    console.log(err);
  }
};
