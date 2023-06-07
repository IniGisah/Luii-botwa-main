const { Client, create, decryptMedia, ev } = require("@open-wa/wa-automate");
//const { Client } = require('pg');
const express = require( 'express' );
const bodyParser = require("body-parser")
const restartdata = require("./configFiles/restartdata.json");
const { default: PQueue } = require("p-queue");

const app = express();
const PORT = 3232

const queue = new PQueue({
  concurrency: 4,
  autoStart:false
   });

app.use(bodyParser.json())

let linux;
const win = {executablePath: "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"}
if (process.env.HEROKU){linux = {executablePath: "/app/.apt/usr/bin/google-chrome"}} 
else {linux = {executablePath: "/usr/bin/google-chrome"}}
const mac = {executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}

const configObject = {
  sessionId: "luiibot-client",
  authTimeout: 0,
  autoRefresh: true,
  //cacheEnabled: false,
  cachedPatch: true,
  multiDevice: true,
  useChrome: true,
  disableSpins: true,
  qrRefreshS: 20,
  qrTimeout: 0,
};

const ops = process.platform;
if (ops === "win32" || ops === "win64") {const assignObj = Object.assign(configObject, win)}
else if (ops === "linux") {const assignObj = Object.assign(configObject, linux)}
else if (ops === "darwin") {const assignObj = Object.assign(configObject, mac)};

const startBot = async () => {
  try {
    app.listen(PORT, () => console.log(`🚀 Express Server running on port ${PORT}`))
    const Handler = require("./handler");
    const Client = await create(configObject);
    
    app.post("/media", (req, res) => {
      let notif = `*Luii Media Update Notification*
      
`
    })

    app.post("/hook", (req, res) => {
      const varnotif = `*Luii Media Request Notification*
*Request ID* : ${req.body.requestId}
*Requested User* : ${req.body.requestedUser}
*Request Type* : ${req.body.type}
*Title* : ${req.body.title}

*Request Status* : ${req.body.requestStatus}`
      //console.log(req.body) // Call your action on the request here
      Client.sendText('6289638065793-1614662664@g.us', varnotif)
      res.status(200).end() // Responding is important
    })

    const proc = async message => {
      Handler.messageHandler(Client, message);
      return true;
    }

    const processMessage = message => queue.add(()=>proc(message));

    const unreadMessages = await Client.getAllUnreadMessages();
    unreadMessages.forEach(processMessage)

    await Client.onMessage(processMessage);

    queue.start();

    await Client.onStateChanged(async (state) => {
      if (state === "TIMEOUT" || state === "CONFLICT" || state === "UNLAUNCHED") await Client.forceRefocus();
      console.log("State Changed >", state);
    });

    //await Client.onMessage((message) => {
    //  Handler.messageHandler(Client, message);
    //});

    await Client.onButton(buttonResponse => {
      Handler.buttonHandler(Client, buttonResponse);
    });

    await Client.onGlobalParticipantsChanged((event) => {
      Handler.globalParticipantsChanged(Client, event);
    });

    await Client.onAddedToGroup((event) => {
      Handler.addedToGroup(Client, event);
    });

    await Client.onIncomingCall(async (call) => {
      const { peerJid } = call;
      //await Client.contactBlock(peerJid);
      await Client.sendText(peerJid, "_⚠️ Bot lagi sibuk, jangan Telpon oey!_");
    });
    if (restartdata.status){
      await Client.sendText(restartdata.from, "Bot restarted successfully!")
    }
    
  } catch (err) {
    console.log(err.stack)
  }
};
startBot();
