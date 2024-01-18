require('dotenv').config()
const qrcode = require("qrcode-terminal");
const {
    Client,
    LocalAuth,
    MessageMedia
} = require("whatsapp-web.js");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox'],
	}
});



client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, {
        small: true
    });
});

client.on("authenticated", () => {
    console.log("AUTHENTICATED");
});

client.on("ready", () => {
    console.log("Client is ready!");
});




const GoogleSearchAPI= async (API_KEY,query,message) => {
    let URL = "https://www.googleapis.com/customsearch/v1";
    const params = {
        key: API_KEY,
        cx: process.env.CX,
        gl: "IN",
        q: query,
    };
    URL += "?" + new URLSearchParams(params).toString();
    let results = await fetch(URL)
    results = await results.json()
        
        if (results.error) {
                response =
                    `_WhatSearch_: Thank You  
                for using me. I 've *reached my limit* for today. Let me sleep and restore my powers. \n\nIf you need to know more
                about me, reply * /about*`;
                message.reply(response);
        }

        else {
            item_list = results.items;
            let str = "";
            for (i = 0; i < 5; i++) {
                let response =i +1 +"." +" " +"*" +item_list[i].title +"*" +"\n" +"_" +item_list[i].snippet +"_" +"\n" +item_list[i].link +"\n\n";
                             str = str + response;
                        }
                        
                        await message.reply(str);
                    }
                }
                


client.on("message_create", async (message) => {
    
        let msg = message.body;
        let msgArray = msg.split(" ");
        if (msgArray[0] == "/search") {
            query = msg.replace("/search", "");
            GoogleSearchAPI(process.env.API_KEY,msg,message);
        } else if (msgArray[0] == "/about") {
            let str =
                `Hello World ! 😀\nI am WhatsSearch v1.0.0, a WhatsApp bot powered by Google🤖\nI am brought to this world by my father, *Debaditya Banerji*. I hope you will use me well and like me. 🙇🙇🙇\nThe Following are my functionalities: \n1. _/ search < SOMETHING >_ -- *Google search top 5 results*\n2. _/ img_ < SOMETHING > -- *Image search* 
            `;
            message.reply(str);
        }
});