<div align="center">
<img style="margin-bottom: 20px" src="https://i.ibb.co/WWt4dSx/65803543-p1.png" alt="sad" width="250" height="250"/>
   
# _**LuiiBot**_

> LuiiBot is a multipurpose WhatsApp bot using open-wa wa-automate nodejs library!
>
>

<p align="center">
  <a href="https://www.npmjs.com/package/@open-wa/wa-automate"><img src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green" /></a>
  <img src="https://img.shields.io/node/v/@open-wa/wa-automate" />
  <img src="https://img.shields.io/badge/maintained%3F-yes-green.svg?style=flat" />
  <img src="https://img.shields.io/github/repo-size/IniGisah/WhatsApp-Bot" /> <br>
</p>
</div>


**Jump to :**

- [Guide](#guide)
- [Features](#features)
- [Troubleshoting](#troubleshoting)
- [Contributors](#contributors)
- [References](#references)

---

**WhatsApp-Bot** **(LuiiBot)** - This section will explain to you and guide you what you must do before using this _nodejs_ bot on your local computer, show you all bot features, troubleshooting, etc.

**Make an issue when you have a problem or found a bug when using this bot**

---

## Guide

**_Requirements :_**

- Node.Js >= 12.18.3
- [ffmpeg](https://ffmpeg.org/)
- Google Chrome

Step by step to start the bot :

1. Clone this repositry

   `git clone https://github.com/IniGisah/WhatsApp-Bot`

2. Enter the directory

   `cd WhatsApp-Bot`

3. Open directory with your favorit code editor, then Change the [settings.js](https://github.com/IniGisah/WhatsApp-Bot/blob/master/settings.js) code

   - [prefix](https://github.com/IniGisah/WhatsApp-Bot/blob/master/settings.js#L2) - prefix bot commands _(default : !)_
   - [owner](https://github.com/IniGisah/WhatsApp-Bot/blob/master/settings.js#L3) - owner bot number
   - [support](https://github.com/IniGisah/WhatsApp-Bot/blob/master/settings.js#L4) - bot group support

   ```javascript
   const downloadOptions = {
     ffmpegPath: '/usr/bin/ffmpeg', // change this to your ffmpeg bin path
     // ...code here
   };
   ```
   
5. Install all packages

   `npm install`

6. After all configuration finished, now start the bot

   `npm start`

7. Scan QR code with you phone. done!

**Summary :**

```bash
$ git clone https://github.com/IniGisah/WhatsApp-Bot
$ cd WhatsApp-Bot
$ npm install
$ npm start
```

## Features

All features/Bot Commands

_Default prefix :_ #

**Bot Owner Commands :**

|  Commands   | Status |                 Description                 |
| :---------: | :----: | :-----------------------------------------: |
|  !unblock   |   OK   |             Unblockir bot user              |
|  !leaveall  |   OK   |            Leave all bot groups             |
|  !clearall  |   OK   |              Clear all message              |
|     !bc     |   OK   | Broadcast to all bot contact include groups |
|    !ban     |   OK   |          Ban someone                        |
|    !getses     |   OK   |   Get session from Whatsapp bot client   |

**Group Owner Commands :**

| Commands | Status |         Description         |
| :------: | :----: | :-------------------------: |
| !kickall |   OK   | Kick all members on a group |

**Group Admin Commands :**

|  Commands  | Status |       Description        |
| :--------: | :----: | :----------------------: |
|    !add    |   OK   |    add a member group    |
|   !kick    |   OK   |   kick a member group    |
|  !promote  |   OK   |  promote a member group  |
|  !demote   |   OK   |  demote an admin group   |
|  !revoke   |   OK   | revoke group invite link |
|   !link    |   OK   |  get group invite link   |
| !vote |   OK   | Start a vote |

**Group Member Commands :**

|  Commands   | Status |              Description               |
| :---------: | :----: | :------------------------------------: |
|    !spam    |   OK   |    Tag all members on related group    |
|  !gjodoh    |   OK   |       Match random member to you       |
| !groupstats |   OK   |            Get Group stats             |
|   !kickme   |   OK   |   Kick someone who use this command    |
|  !mystats   |   OK   | Get someone stats who use this command |
|    !pick    |   OK   |    Pick random guy on related group    |

**General Commands (Personal/Group Message) :**

|    Muslim Commands    |   Status    |                Description         |
| :------------: | :---------: | :---------------------------------------: |
|   !quranayat   |     OK      |            Get Qur'an digital             |
|  !quransurah   |     OK      |          Get All Ayah in a Surah          |
|   !murottal    |     OK      |           Get Qur'an Ayah Audio           |
|    !tafsir     |     OK      |             Get Qur'an Tafsir             |
|    !jadwalsholat     |     OK      |             Get Jadwal sholat       |

|    Fun Commands    |   Status    |                Description            |
| :------------: | :---------: | :---------------------------------------: |
|  !voice        |  OK         |              Text to speech               |
|   !makequote   |     OK      |            Make a image quote             |
|     !mirip     |     OK      |                     -                     |
|      !gay      |     OK      |            Get g\*y percentage            |
|      !cat      |     OK      |            Random cat pictures            |
|      !dog      |     OK      |            Random dog pictures            |
|     !meme      |     OK      |                Random meme                |
|  !imagequote   |     OK      |            Random image quote             |
|     !roll      |     OK      |                 Roll dice                 |
|     !santet    |     OK      |                 Santet someone            |
|     !bucin     |     OK      |              Get SIMP quote               |
|     !jodoh     |     OK      |            Get Love percentage            |

|    Education Commands    |   Status    |                Description      |
| :------------: | :---------: | :---------------------------------------: |
|     !wiki      |     OK      |                 Wiki info                 |
|    !brainly    |     OK      |          Get answer from brainly          |
|    !translate  |     OK      |          Translate text                   |

|    Sticker Commands    |   Status    |                Description        |
| :------------: | :---------: | :---------------------------------------: |
|    !sticker    |     OK      |         Convert image to sticker          |
|  !gifsticker   |     OK      |      Convert video.mp4 to Gif Stiker      |
| !giphysticker  |     OK      |          Convert giphy to Stiker          |
| !stickertotext |     OK      |          Convert text to sticker          |

|    General Commands    |   Status    |                Description        |
| :------------: | :---------: | :---------------------------------------: |
|  !menu         |     OK      |                 Show menu                 |
| !fb            |     OK      | download video from fb link               |
|    !lyrics     |     OK      |          Finding for song lyrics          |
|     !short     |     OK      |               URL shortener               |
|     !covid     |     OK      |               Covid-19 Info               |
|     !join      |     OK      | Automatically bot will join to your group |
|    !weather    |     OK      |             Get weather info              |
|     !movie     |     OK      |             Get a movie info              |
|     !contact   |     OK      |             Send owner contact            |
|     !resi      |     OK      |             Get a your package info       |
|     !reminder  |     OK      |             Send a reminder for you       |
|     !music     |     OK      |             Get music from given title or youtube link via Voice from Youtube              | 
|     !ytmp4     |     OK      |     Get video from youtube               |
|     !infohoax  |     OK      |     Get newest infohoax page             |
|     !ping      |     OK      |     Check bot ping                       |
|     !profil    |     OK      |     See your profile                     |

|  Code Commands   | Status |              Description                    |
| :---------:   | :----:      | :------------------------------------:    |
|!run languages |     OK      |     See what code languages support       |
|     !run      |     OK      |     Run your code                         |

|  Homework Commands   | Status |              Description            |
| :---------: | :----: | :------------------------------------:       |
|     !tambahtugas     |     OK      |     Add your homework to list  |
|     !listtugas       |     OK      |     Show your homework         |
|     !hapustugas      |     OK      |     Delete your tugas from list|


|  Weebs Commands   | Status |              Description                              |
| :---------: | :----: | :------------------------------------:                      |
| !anime        |     OK      |     Get an anime details                             |
| !neko         |     OK      |     Get a neko image                                 |
| !animewall    |     OK      |     Get a anime wallpaper                            |
| !kusonime     |     OK      |     Get anime details from kusonime                  |
| !traceanime   |     OK      |     Get an anime title from given screenshot image   |
| !sauce        |     OK      |     Get an source link from given artwork image      |
| !waifu (help) |     OK      |     Get waifu random image or list waifu command     |
| !animesticker |     OK      |     Get anime sticker                                |

[Read all commands here!](https://github.com/IniGisah/WhatsApp-Bot/blob/master/lib/text/text_id.js)

## Troubleshoting

You can read all troubleshoting here, [Puppeteer Troubleshooting](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)


## References

- [@open-wa](https://open-wa.github.io/wa-automate-nodejs/)
- [Bocchi-bot](https://github.com/SlavyanDesu/BocchiBot.git)
- this forked repo
