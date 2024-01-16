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



//function to get search results from Google 
const GoogleSearchAPI= async (API_KEY,query,message) => {
    
                } 
                

//Listener for new messages with a callback function
client.on("message_create", async (message) => {
        let msg = message.body;
        let msgArray = msg.split(" ");
        if (msgArray[0] === "/search") {
            query = msg.replace("/search", "");
            //calling Google Search Function with the API key, the received user query and the message object
            GoogleSearchAPI(process.env.API_KEY,query,message)
        }
    
});