require('dotenv').config()
const qrcode = require("qrcode-terminal");

//importing required modules from WWebJS
const {
    Client,
    LocalAuth,
    MessageMedia
} = require("whatsapp-web.js");


//Client Settings
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox'],
	}
});



client.initialize();


//Local Authentication using QR code
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

                

//Listener for new messages with a callback function
client.on("message_create", async (message) => {
    
});