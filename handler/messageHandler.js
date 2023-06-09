const { decryptMedia } = require('@open-wa/wa-automate');
const moment = require('moment');
const set = require('../settings');
const fs = require('fs-extra')
const axios = require("axios").default;
const Nekos = require('nekos.life');
const neko = new Nekos();
const sagiri = require('sagiri');
const config = require('../config.json')
const parseMilliseconds = require('parse-ms')
const toMs = require('ms')
const { spawn } = require('child_process')
//var http = require('http');
//const path = require('path')
const momentt = require('moment-timezone')
momentt.tz.setDefault('Asia/Jakarta').locale('id')
const tanggal = momentt.tz('Asia/Jakarta').format('DD-MM-YYYY')
const uaOverride = config.uaOverride
const saus = sagiri(config.nao, { results: 5 });
const { closestMatch } = require("closest-match");
//const ffmpeg = require('fluent-ffmpeg');
//const MP3Cutter = require('mp3-cutter');
const google = require('googlethis');
const genshindb = require('genshin-db');
const { getChart } = require('billboard-top-100');
const { exec } = require("child_process");

const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'

// Library
const _function = require('../lib/function');
const _txt = require('../lib/text');
const color = require('../util/colors');
const { uploadImages, saveFile } = require('../util/fetcher');
const { prefix } = require('../settings');
const tugas = JSON.parse(fs.readFileSync('./database/tugas.json'));
const _reminder = JSON.parse(fs.readFileSync('./database/reminder.json'))
const _ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const _artdots = require('../database/artdots')
const judullist = [];
const daftarlist = [];
//let gptwait = false;


var disablecommand = true;

const handler = require ('../handler');
//const { query } = require('express');
//const { count } = require('console');

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}
/*
function arrayRemove(arr, value) {   
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}
*/
function ngelistisi(){
  let list = '';
  list += `${judullist[0]}\n`;
  daftarlist.forEach(function (item, index){
    index = index+1;
    list += `${index}. ${item}\n`
    //client.sendText(from, (index+1) + ". " + item);
  });
  return list;
}

function ngelisttugas(){
  let list = '';
  list += "Daftar tugas : \n"
  tugas.forEach(function (item, index){
    index = index+1;
    list += `${index}. ${item}\n`
    //client.sendText(from, (index+1) + ". " + item);
  });
  return list;
}

module.exports = async (client, message) => {
  //const { ChatGPTAPI } = await import('chatgpt');
  //const aiapi = new ChatGPTAPI({
  //  apiKey: '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'
  //})
  const {from} = message;
  try {
    const msgAmount = await client.getAmountOfLoadedMessages();
    if (msgAmount > 1000) {
      await client.cutMsgCache();
      await client.clearAllChats();
    } 
    const { id, body, mimetype, type, t, from, sender, content, caption, author, isGroupMsg, isMedia, chat, quotedMsg, quotedMsgObj, mentionedJidList } = message;
    const { pushname, formattedName } = sender;
    const { formattedTitle, isGroup, contact, groupMetadata } = chat;

    const { ind } = require('../message/text/lang/')

    const botOwner = set.owner;
    const botGroup = set.support;
    const botPrefix = set.prefix;
    const botNumber = (await client.getHostNumber()) + '@c.us';
    let isAdmin = groupMetadata ? groupMetadata.participants.find((res) => res.id === sender.id)?.isAdmin : undefined;
    let isOwner = groupMetadata ? groupMetadata.participants.find((res) => res.id === sender.id)?.isSuperAdmin : undefined;
    let isBotAdmin = groupMetadata ? groupMetadata.participants.find((res) => res.id === botNumber)?.isAdmin : undefined;

    const groupId = isGroupMsg ? chat.groupMetadata.id : ''
    const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''

    const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
    const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
    const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
    //const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
    //const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
    //const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
    const isImage = type === 'image'
    const isVideo = type === 'video' 
    //const isAudio = type === 'audio'
    //const isVoice = type === 'ptt'

    const isBanned = _ban.includes(sender.id)
    const isGroupAdmins = groupAdmins.includes(sender.id) || false

    global.voterslistfile = '/poll_voters_Config_' + chat.id + '.json'
    global.pollfile = '/poll_Config_' + chat.id + '.json'

    const blockNumber = await client.getBlockedIds()

    const validMessage = caption ? caption : body;
    if (!validMessage || validMessage[0] != botPrefix) return;

    const command = validMessage.trim().split(' ')[0].slice(1);
    const arguments = validMessage.trim().split(' ').slice(1);
    const arg = validMessage.substring(validMessage.indexOf(' ') + 1)
    const q = arguments.join(' ')
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    const url = arguments.length !== 0 ? arguments[0] : ''

    const santet = [
      'Muntah Paku',
      'Meninggoy',
      'Berak Paku',
      'Muntah Rambut',
      'Ketempelan MONYET!!!',
      'Menjadi Gila',
      'Menjadi manusiawi',
      'jomblo selamanya',
      'ga bisa berak',
      'ketiban pesawat',
      'jadi anak mulung',
      'ga jadi pacar zeus',
      'jadi jelek',
      'noob vr',
      'jadi botfrag terus',
      'di haloin bu anif ampe meninggoy'
      ]

    // debug
    console.debug(color('green', '➜'), color('yellow', isGroup ? '[GROUP]' : '[PERSONAL]'), `${botPrefix}${command} | ${sender.id} ${isGroup ? 'FROM ' + formattedTitle : ''}`, color('yellow', moment().format()));

    //const allChats = await client.getAllChats();
    switch (command) {
      case 'commandswitch':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true)
        if (disablecommand){
          disablecommand = false
        } else {
          disablecommand = true
        }
        await client.sendText(from, `_Blocked command telah di switch!_\nDisabled command status : *${disablecommand}*`)
        break

      case 'aichat':
        _function.aichat(client, message)
        break

      case 'speed':
      case 'ping':
            let pmsg = `Someone ping!\n\n*From* : ${from}\n*Name* : ${pushname}`
            await client.sendText(from, `Pong!!!!\nSpeed: ${_function.processTime(t, moment())} _Second_`)
            console.log(`from : ${from}`)
            if (isGroup) pmsg += `\n*Group* : ${formattedTitle}`
            await client.sendText("6285156132721@c.us", pmsg)
            break

      case 'unsend':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true)
        await client.deleteMessage(from, quotedMsg.id)
        break;

      case 'getses':
          if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true)
          const ses = await client.getSnapshot()
          await client.sendFile(from, ses, 'session.png', ind.doneOwner())
      break

      case 'unblock':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true);
        await client.contactUnblock(arguments[0] + 'c.us');
        return await client.reply(from, '_🟢 Berhasil *Unblock* user!_', id, true);
        break;

      case 'leaveall':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true);
        const allGroups = await client.getAllGroups();
        allGroups.forEach(async (group) => {
          if (!group.id !== botGroup) {
            await client.leaveGroup(group.id);
          }
        });
        return await client.reply(from, '_🟢 Bot Berhasil keluar dari semua grup yang ada!_', id, true);
        break;

      case 'owner':
      case 'contact':
      case 'ownerbot':
        return await client.reply(from, '_👋 Hai, kalo mau req fitur bisa pc ke *https://wa.me/6285156132721*_', id, true);
        break;

      case 'clearall':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true);
        await client.clearAllChats()
        //allChats.forEach(async (chat) => {
        //  await client.clearChat(chat.id);
        //});
        return await client.reply(from, '_🟢 Berhasil Membersihkan History Message Bot!_', id, true);
        break;

      case 'bc':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true);
        if (arguments.length < 1) return;
        const allChats = await client.getAllChats(true);
        await allChats.forEach(async (chat) => {
          await client.sendText(chat.id, arguments.join(' '));
        });
        return await client.reply(from, '_🟢 Berhasil Broadcast kesemua Chat List Bot!_', id, true);
        break;

      case 'ban':
        if (arguments.length !== 1) return client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}ban add @mention/nomor_`, id, true);
          if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true)
          if (arguments[0] === 'add') {
              if (mentionedJidList.length !== 0) {
                  for (let benet of mentionedJidList) {
                      if (benet === botNumber) return await client.reply(from, ind.wrongFormat(), id, true)
                      client.contactBlock(benet)
                      _ban.push(benet)
                      fs.writeFileSync('./database/banned.json', JSON.stringify(_ban))
                  }
                  await client.reply(from, 'Mampus lu gw ban', id, true)
                  await client.reply(from, ind.doneOwner(), id, true)
              } else {
                  _ban.push(arguments[1] + '@c.us')
                  client.contactBlock(arguments[1] + '@c.us')
                  fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                  await client.reply(from, 'Mampus lu gw ban', id, true)
                  await client.reply(from, ind.doneOwner(), id, true)
              }
          } else if (arguments[0] === 'del') {
              if (mentionedJidList.length !== 0) {
                  if (mentionedJidList[0] === botNumber) return await client.reply(from, ind.wrongFormat(), id, true)
                  client.contactUnblock(mentionedJidList[0])
                  _ban.splice(mentionedJidList[0], 1)
                  fs.writeFileSync('./database/banned.json', JSON.stringify(_ban))
                  await client.reply(from, 'Gw maapin dah, udh di unban lu', id, true)
                  await client.reply(from, ind.doneOwner(), id, true)
              } else{
                  client.contactUnblock(arguments[1] + '@c.us')
                  _ban.splice(arguments[1] + '@c.us', 1)
                  fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                  await client.reply(from, 'Gw maapin dah, udh di unban lu', id, true)
                  await client.reply(from, ind.doneOwner(), id, true)
              }
          } else {
              await client.reply(from, ind.wrongFormat(), id, true)
          }
        break

      case 'listban':
      case 'listblock':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true)
          let block = ind.listBlock(blockNumber)
          if (blockNumber.length === 0) {
            block += '\nYey gaada yang di blok'
            await client.sendText(from, block)
          } else {
            for (let i of blockNumber) {
              block += `@${i.replace('@c.us', '')}\n`
            } 
            await client.sendTextWithMentions(from, block)
          }
          
      break

      case 'kickall':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-pakai didalam grup!_', id, true);
        if (!isOwner) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Owner* grup saja!_', id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Bot *Wajib* dijadikan *Admin* untuk menggunakan perintah ini!_', id, true);
        await client.reply(from, '_😏 Perintah dilaksanakan! Berharap kamu tau apa yang kamu lakukan!_', id, true);
        await groupMetadata.participants.forEach(async (participant) => {
          if (!participant.isSuperAdmin) await client.removeParticipant(from, participant.id);
        });
        break;

      case 'add':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (arguments.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}add 62812....._`, id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        const isNumberValid = await client.checkNumberStatus(arguments[0] + '@c.us');
        if (isNumberValid.status === 200)
          await client
            .addParticipant(from, `${arguments[0]}@c.us`)
            .then(async () => await client.reply(from, '_🎉 Berhasil menambahkan Member, Berikan ucapan Selamat datang!_', id), true)
            .catch(async (error) => await client.reply(from, '_🥺 Gagal menambahkan member! kemungkinan member sudah diblock oleh Bot! untuk unblockir silahkan DM ke *https://wa.me/6285156132721*_', id), true);
        break;

      case 'kick':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (mentionedJidList.length !== 1) return await client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}kick @mention_`, id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        const isKicked = await client.removeParticipant(from, mentionedJidList[0]);
        if (isKicked) return await client.reply(from, '_🎉 Berhasil Kick member Berikan Ucapan Selamat Tinggal!_', id, true);
        break;

      case 'promote':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (mentionedJidList.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}promote @mention_`, id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        const isPromoted = await client.promoteParticipant(from, mentionedJidList[0]);
        if (isPromoted) return await client.reply(from, '_🎉 Berhasil promote member menjadi Admin/Pengurus Grup! Berikan Ucapan Selamat_', id, true);
        break;

      case 'demote':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (mentionedJidList.length !== 1) client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}demote @mention_`, id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        const isDemoted = await client.demoteParticipant(from, mentionedJidList[0]);
        if (isDemoted) return await client.reply(from, '_🎉 Berhasil demote Admin menjadi Member! Ucapkan Kasihan!_', id, true);
        break;

      case 'revoke':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        await client
          .revokeGroupInviteLink(from)
          .then(async (res) => await client.reply(from, '_🎉 Berhasil Me-reset ulang Invite Link Grup! gunakan !link untuk mendapatkan Link invite Group_', id), true)
          .catch((error) => console.log('revoke link error!'));
        break;

      case 'link':
      case 'invitelink':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        await client
          .getGroupInviteLink(from)
          .then(async (inviteLink) => await client.reply(from, `_🔗 Group Invite Link : *${inviteLink}*_`, id), true)
          .catch((error) => console.log('Invite link error'));
        break;

      case 'disconnect':
      case 'kickbot':
      case 'leave':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        client.reply (from, 'Gamao, gw gamao leave', id, true);
          /*
          .reply(from, '_👋 Terimakasih, atas kenangan selama ini yang kita lalui, kalau kamu rindu gpp masukin aku lagi ke grup kamu! aku akan selalu ada buat kamu!_', id)
          .then(async () => await client.leaveGroup(from))
          .catch((error) => console.log('kickbot error'));
          */
        break;

      case 'adminmode':
      case 'silent':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!isAdmin) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan oleh *Admin* grup saja!_', id, true);
        if (arguments.length !== 1) return await client.reply(from, `_⚠️ Contoh penggunaan Perintah : ${botPrefix}silent on|off_`, id, true);
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        const isSilent = await client.setGroupToAdminsOnly(from, arguments[0].toLowerCase() === 'on');
        if (isSilent) return await client.reply(from, `_🎉 Berhasil set grup ke-*${arguments[0].toLowerCase() === 'on' ? 'Admin Mode' : 'Everyone Mode'}*_`, id, true);
        break;

      case 'p':
      case 'spam':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        const allMembers = groupMetadata.participants.map((member) => `@${member.id.split('@')[0]}`);
        if ( groupMetadata.desc && groupMetadata.desc.includes("#noping") ) 
        { await client.sendText(from, '_*⚠️ Gaboleh spam disini yak*_') } 
        else {
          await client.sendTextWithMentions(from, `_*Summon*_\n\n${allMembers.join('\n')}\n`); }
        break;

      case 'sider':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (!quotedMsg) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : reply sebuah pesan yang ingin dibaca readnya dan memanggil sider, lalu berikan caption ${botPrefix}sider_`, id, true);
        const allMembers1 = groupMetadata.participants.map((member) => `@${member.id.split('@')[0]}`);
        const sidermember = await client.getMessageReaders(quotedMsg.id)
        if (sidermember.length === 0) return await client.reply(from, `Maaf, pesan reader tidak bisa di akses. Mohon reply pesan dari bot saja`, id, true)
        const sidermember1 = sidermember.map((member) => `@${member.id.split('@')[0]}`)
        const sidermemberset = new Set(sidermember1)
        const newArr = allMembers1.filter((name) => {
          return !sidermemberset.has(name);
        });
        console.log(newArr)
        await client.sendTextWithMentions(from, `_*Summon Sider*_\n\n${newArr.join('\n')}\n`);
        break

      case 'sendmessage':
        if (arguments.length === 0 && !quotedMsg) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}sendmessage <isipesan>_`, id, true)
        await client.sendText(from, arguments.join(' '))
        break
      
      case 'sendmsgto':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true);
        await client.sendText(arguments[0], arguments.slice(1).join(' '))
        await client.sendText(from, `Done send msg to ${arguments[0]}`)
        break

      case 'vote':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        let helpvote = `Command untuk mengadakan voting pada grup
=====================
*${botPrefix}pollresult* = Menampilkan hasil voting
*${botPrefix}addvote* <nomor> = Memvoting kandidat sesuai nomor
*${botPrefix}addv* <kandidat> = Menambah kandidat yang ingin di voting
*${botPrefix}addpoll* <judul voting> = Membuat sesi voting dengan judul, jika sebelumnya sudah ada sesi, akan otomatis tertimpa
`
          client.reply(from, helpvote, id, true)
        break;

      case 'jodohku':
      case 'matchme':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        let countMember = groupMetadata.participants.length;
        let randomNumber = Math.floor(Math.random() * (countMember - 1) + 1);
        const randomMembers = groupMetadata.participants[randomNumber];
        const isSenderNumber = randomMembers.id === sender.id;
        await client.sendTextWithMentions(from, isSenderNumber ? `_👬🏼 Yha! jodoh kamu gak ada ditemukan di grup ini, nge-gay aja ya_` : `_❤️ Jodoh @${sender.id.split('@')[0]} kamu digrup ini adalah @${randomMembers.id.split('@')[0]}_`);
        break;

      case 'groupstats':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        let { owner, creation, participants, desc } = groupMetadata;
        const creationTime = moment.unix(creation);
        await client.sendTextWithMentions(from, `_📃 Informasi Grup_\n\n_Nama : ${formattedTitle}_\n_Owner : @${owner.split('@')[0]}_\n_Total Member : ${participants.length}_\n_Tanggal Dibuat : ${creationTime.format('DD MMMM YYYY')}_\n_Jam Dibuat : ${creationTime.format('HH:mm:ss')}_\n_Deskripsi : ${desc ? desc : ''}_`, id);
        break;

      case 'kickme':
        if (!isBotAdmin) return await client.reply(from, '_⚠️ Perintah ini hanya dapat digunakan ketika *Bot berstatus Admin* di grup ini!_', id, true);
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (isOwner) return await client.reply(from, '_⛔ Owner grup/Orang ganteng tidak dapat dikick!_', id, true);
        await client.reply(from, '_😏 Aku harap kamu tau apa yang kamu lakukan!_', id, true);
        await client.removeParticipant(from, sender.id);
        break;

      case 'mystats':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        const senderPicture = sender.profilePicThumbObj.eurl ? sender.profilePicThumbObj.eurl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        await client.sendImage(from, senderPicture, formattedName, `_🎉 Group Member [ *${formattedTitle}* ]_\n\n_Nama : ${pushname ? pushname : 'Tidak Diketahui'}_\n_Owner Status : ${isOwner ? 'Ya' : 'Tidak'}_\n_Admin Status : ${isAdmin ? 'Ya' : 'Tidak'}_`, id);
        break;

        case 'profile':
        case 'me':
              if (quotedMsg) {
                  const getQuoted = quotedMsgObj.sender.id
                  const profilePic = await client.getProfilePicFromServer(getQuoted)
                  const username = quotedMsgObj.sender.name
                  const statuses = await client.getStatus(getQuoted)
                  const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                  const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                  const { status } = statuses
                  if (profilePic === undefined) {
                      var pfp = errorImg
                  } else {
                      pfp = profilePic
                  }
                  await client.sendFileFromUrl(from, pfp, `${username}.jpg`, ind.profile(username, status, benet, adm), id)
              } else {
                  const profilePic = await client.getProfilePicFromServer(sender.id)
                  const username = pushname
                  const statuses = await client.getStatus(sender.id)
                  const benet = isBanned ? 'Yes' : 'No'
                  const adm = isGroupAdmins ? 'Yes' : 'No'
                  const { status } = statuses
                  if (profilePic === undefined) {
                      var pfps = errorImg
                  } else {
                      pfps = profilePic
                  }
                  await client.sendFileFromUrl(from, pfps, `${username}.jpg`, ind.profile(username, status, benet, adm), id)
              }
          break

      case 'pick':
        if (!isGroup) return await client.reply(from, '_⛔ Perintah ini hanya dapat di-gunakan didalam grup!_', id, true);
        if (arguments.length < 1) return await client.reply(from, `_Contoh penggunaan perintah : ${botPrefix}pick <sifat>_`, id, true);
        const pickSomeone = groupMetadata.participants[Math.floor(Math.random() * groupMetadata.participants.length)];
        await client.sendTextWithMentions(from, `_👦🏼 ${arguments.join(' ')} di grup ini adalah @${pickSomeone.id.split('@')[0]}_`);
        break;

      case 'kerang':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}kerang <kalimat>_`, id, true);
        let resp = ['Ya', 'Tidak']
        const kerangresp = Math.floor(Math.random() * resp.length)
        await client.reply(from, `🐚 ${resp[kerangresp]} 🐚`, id, true)
        break;

      case 'voice':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}voice <kode> <kalimat>_\n_atau ${botPrefix}voice help`, id, true);
        if (arguments[0] === "help") return await client.reply(from, `_Daftar bahasa voice, true_
indonesia: "id",
arabic: "ar",
russia: "ru",
japan: "ja",
thailand: "th",
china: "zh-CN",
france: "fr",
german: "ge",
korea: "ko",
polish: "pl",
chinese: "zh-TW",
english: "en"

*Contoh* : ${botPrefix}voice en hello
    ${botPrefix}voice japan こんにちは`, id)
        const voiceUrl = _function.voiceUrl(arguments);
        const encodeurl = encodeURI(voiceUrl)
        await client.sendPtt(from, encodeurl, id);
        break;

      case 'menu':
      case 'help':
        if (arguments.length == 1 ) {
          if (arguments[0].toLowerCase() === 'button'){
            const ngetesmenu = await client.sendButtons(from, _txt.menu[0], [
              {
              id: `menu 0`,
              text: `Next ⏭️`
              }
            ], `Help button`)
            console.log(ngetesmenu)
          }
        } else {
          return await client.sendText(from, _txt.menu);
        }
        //return await client.reply(from, _txt.menu, id, true);
        break;

      case 'info':
        return await client.reply(from, _txt.info, id, true);

      case 'source':
        return await client.reply(from, _txt.source, id, true);

      case 'rules':
        return await client.reply(from, _txt.rules, id, true);
        break;

      case 'faq':
        return await client.reply(from, _txt.faq, id, true);
        break;

      case 'support':
        await client.addParticipant(botGroup, sender.id);
        return await client.reply(from, 'Kamu sudah ditambahkan kedalam Grup Official Bot Ini!', true);
        break;

      case 'donate':
      case 'donasi':
        return await client.reply(from, _txt.donate, id, true);
        break;

      case 'quran':
      case 'quranayat':
        try {
          if (arguments.length != 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}quranayat <surah> <ayat>_`, id, true);
          const ayah = await _function.quran.ayat(arguments);
          await client.reply(from, ayah, id, true);
        } catch (error) {
          await client.reply(from, `Ayat Surat Al-Quran tidak ditemukan!`, true);
        }
        break;

      case 'quransurah':
        try {
          if (arguments.length != 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}quransurah <surah>_`, true);
          const surah = await _function.quran.surah(arguments);
          await client.reply(from, surah, id, true);
        } catch (error) {
          await client.reply(from, `Ayat Surat Al-Quran tidak ditemukan!`, true);
        }
        break;

      case 'murotal':
      case 'murrotal':
      case 'murottal':
        try {
        if (arguments.length != 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}murrotal <ayat> <surat>_`, id, true);
        const murottalAudio = await _function.quran.murottal(arguments);
        await client.sendPtt(from, murottalAudio, id);
        } catch (error) {
          await client.reply(from, `Ayat Surat Al-Quran tidak ditemukan!`, true);
        }
        break;

      case 'tafsir':
        if (arguments.length != 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}tafsir <ayat> <surat>_`, id, true);
        const tafsir = await _function.quran.tafsir(arguments);
        await client.reply(from, tafsir, id, true);
        break;

        case 'jadwalsholat':
          case 'jadwalsolat':
              if (!q) return await client.reply(from, ind.wrongFormat(), id, true)
              await client.reply(from, ind.wait(), id, true)
              _function.misc.jadwalSholat(q)
                  .then((data) => {
                      data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                          const x = subuh.split(':')
                          const y = terbit.split(':')
                          const xy = x[0] - y[0]
                          const yx = x[1] - y[1]
                          const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                          const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${tanggal}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                          await client.reply(from, msg, id, true)
                          console.log('Success sending jadwal sholat!')
                      })
                  })
                  .catch(async (err) => {
                      console.error(err)
                      await client.reply(from, 'Kota tidak ditemukan!', id, true)
                  })
          break

      case 'quotes':
        break;

      case 'makequote':
        let getMakequote;
        if (arguments.join(' ').split('@').length < 2 && !quotedMsg) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}makequote <nama>@<kalimat>_`, id, true);
        if (quotedMsg) {
          let teks = quotedMsg.body.trim().split(' ');
          let newteks = [`${quotedMsg.sender.pushname}@`].concat(teks)
          getMakequote = _function.makequote(newteks);
        } else {
          getMakequote = _function.makequote(arguments);
        }
        await client.sendImage(from, getMakequote, sender.id, '', id);
        break;

      case 'mirip':
        if (mentionedJidList.length > 0 || arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}mirip <nama>_`, id, true);
        const listNama = ['Udin', 'Uzumaki Bayu', 'Saburo', 'Saruto', 'Yang Lek', 'Uchiha Roy', 'DPR yang korupsi, gendut gendut gak berotak', 'Monyet', 'Maling kandang', 'Maling Dalaman'];
        await client.reply(from, `_👦🏼 *${arguments.join(' ')}* Mirip dengan ${listNama[Math.floor(Math.random() * listNama.length)]}_`, id, true);
        break;

      case 'gay':
        if (mentionedJidList.length > 0 || arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}gay <nama>_`, id, true);
        const gayPercentage = Math.floor(Math.random() * 100);
        await client.reply(from, `_👬🏻 Tingkat gay *${arguments.join(' ')}* sebesar ${gayPercentage}%_`, id, true);
        break;

      case 'gila':
        if (mentionedJidList.length > 0 || arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}gila <nama>_`, id, true);
        const gilaPercentage = Math.floor(Math.random() * 100);
        await client.reply(from, `_👬🏻 Tingkat gila *${arguments.join(' ')}* sebesar ${gilaPercentage}%_`, id, true);
        break;

      case 'brainly':
        if (arguments.length < 1) return client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}brainly <pertanyaan>_`, id, true);
        const getBrainly = await _function.brainly(arguments.join(' '));
        await client.reply(from, getBrainly, id, true);
        break;

      case 'sticker':
      case 'stiker':
        if (!isImage && !isQuotedImage) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim atau reply sebuah gambar yang ingin dijadikan stiker lalu berikan caption ${botPrefix}stiker_`, id, true);
        const encryptMedia = isQuotedImage ? quotedMsg : message
        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
        const mediaData = await decryptMedia(encryptMedia, uaOverride)
        const mediatostr = mediaData.toString('base64')
        const imageBase64 = `data:${_mimetype};base64,${mediatostr}`
        //const imagemediadata = await decryptMedia(message);
        //const imageb64 = `data:${mimetype};base64,${imagemediadata.toString('base64')}`;
        await client.sendImageAsSticker(from, imageBase64, {keepScale:true});
        break;

      case 'gifsticker':
      case 'gifstiker':
        if (!isVideo && !isQuotedVideo) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim sebuah video pendek yang ingin dijadikan stiker lalu berikan caption ${botPrefix}gifstiker_`, id, true);
        const encryptMedia2 = isQuotedVideo ? quotedMsg : message
        const _mimetype2 = isQuotedVideo ? quotedMsg.mimetype : mimetype
        const vidmediadata = await decryptMedia(encryptMedia2);
        const vidb64 = `data:${_mimetype2};base64,${vidmediadata.toString('base64')}`;
        await client.sendMp4AsSticker(from, vidb64, { fps: 10, startTime: `00:00:00.0`, endTime: `00:00:10.0`, loop: 0, crop:false});
        break;

      case 'giphysticker':
      case 'giphystiker':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}giphystiker <giphy url/link>_`, id, true);
        if (!arguments[0].match(urlRegex)) return await client.reply(from, '_⚠️ Pastikan yang kamu kirimkan adalah url yang benar_', id, true);
        await client.sendGiphyAsSticker(from, arguments[0]);
        break;

      case 'extractsticker':
      case 'getsticker':
        if (!isQuotedSticker) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : reply sebuah stiker yang ingin diekstrak_`, id, true);
        const mediaData3 = await decryptMedia(client.getStickerDecryptable(quotedMsg));
        const _mimetype3 = quotedMsg.mimetype
        const mediatostr3 = mediaData3.toString('base64')
        const imageBase64_3 = `data:${_mimetype3};base64,${mediatostr3}`
        await client.sendImage(from, imageBase64_3, 'extract.jpg', null, id)
		break;

      case 'extract':
        if (!isQuotedImage) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : reply sebuah gambar view once yang ingin diekstrak_`, id, true);
        const mediaData4 = await decryptMedia(quotedMsg);
        const imageBase64_4 = `data:${quotedMsg.mimetype};base64,${mediaData4.toString(
          'base64'
        )}`;
        await client.sendImage(from, imageBase64_4, 'extract.jpg', null, id)
		break;

      case 'bucin':
        const katabucin = await _function.bucin();
        await client.reply(from, katabucin, id, true);
        break;

      case 'jodoh':
        const jodohSplit = arguments.join(' ').split('&');
        if (jodohSplit.length < 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}jodoh <nama kamu>&<nama seseorang>_`, true);
        const jodohPersentase = Math.floor(Math.random() * 100);
        await client.reply(from, `_💖 Persentase kecocokan ${jodohSplit[0]} & ${jodohSplit[1]} sebesar ${jodohPersentase}_`, id, true);
        break;

      case 'ytmp3':
      case 'musik':
      case 'music':
        await client.reply(from, "Fitur ini memerlukan resource yang berat, dimohon untuk tidak menspam command ini", id, true);
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}music <title> / <url>_`, id, true);
        //if (ytwait == true) return await client.reply(from, '_⚠️ Mohon menunggu command music sebelumnya selesai diupload terlebih dahulu_', id, true);
        const musicLink2 = await _function.youtube.youtubeMusic(arguments.join(' '));
        if (!musicLink2) return await client.reply(from, '_⚠️ Pastikan music yang anda inginkan dibawah 10 menit!_', id, true);
        try {
            if (musicLink2.result.error == true) return await client.reply(from, `⚠️ Error ! \n\nMessage error : \n${musicLink2.result.message}`,id, true)
            await client.reply(from, ind.wait() + "\nMusik sedang diupload...", id, true)
            const mp3url = musicLink2.result.file;
            const judul = musicLink2.result.title;
            const thumb = musicLink2.thumbnail;
            const durasi = musicLink2.duration;

            var menit = Math.floor(durasi / 60);
            var detik = durasi - menit * 60;

            const caption = `-------[ *Detail musik* ]-------\n\nJudul : ${judul}\nDurasi : ${menit} menit ${detik} detik`
            await client.sendImage(from, thumb, "thumb.jpg", caption, id)
            await client.sendFileFromUrl(from, mp3url, "mp3yt.mp3", judul, id, null, null, true);
            //await client.reply(from, `⚠️ Error !\nPastikan music yang anda inginkan dibawah 5 menit!\n\nMessage error : \n${musicLink.result.message}`, id, true);
        } catch (error) {
          await client.reply(from, "Sepertinya musik tidak bisa di upload, mon maap 🙏\n\nSilahkan cari musik lainnya", id, true);
          //console.log("music download error " + musicLink);
          console.log(error.stack);
        }
        break;

      case 'ytmp4':
        await client.reply(from, "Fitur ini memerlukan resource yang berat, dimohon untuk tidak menspam command ini\n\nCommand video ini membutuhkan waktu yang lama pada saat upload, mohon menunggu 3-6 menit", id, true);
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}ytmp4 <title> / <url>_`, id, true);
        //if (ytwait == true) return await client.reply(from, '_⚠️ Mohon menunggu command music/video sebelumnya selesai diupload terlebih dahulu_', id, true);
        const videoLink = await _function.youtube.youtubeVideo(arguments.join(' '));
        if (!videoLink) return await client.reply(from, '_⚠️ Pastikan video yang anda inginkan dibawah 10 menit!_', id, true);
        try {
          if (videoLink.result.error == true){
             return await client.reply(from, `⚠️ Error ! \n\nMessage error : \n${videoLink.result.message}`, id, true);
          } else {
            await client.reply(from, ind.wait()+ "\nVideo sedang diupload...", id, true)
            const mp4url = videoLink.result.file;
            const judul = videoLink.result.title;
            const thumb = videoLink.thumbnail;
            const durasi = videoLink.duration;

            var menit = Math.floor(durasi / 60);
            var detik = durasi - menit * 60;

            const caption = `-------[ *Detail Video* ]-------\n\nJudul : ${judul}\nDurasi : ${menit} menit ${detik} detik`

            await client.sendImage(from, thumb, "thumb.jpg", caption, id)
            await client.sendFileFromUrl(from, mp4url, "vid.mp4", judul, id);
          }
        } catch (error) {
          await client.reply(from, "Sepertinya musik tidak bisa di upload, mon maap 🙏\n\nSilahkan cari video lainnya", id, true);
          //console.log("music download error " + musicLink);
          console.log(error.stack);
        }
        break;

      case 'ytsearch':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}ytsearch <title>_`, id, true);
        const videodata = await _function.youtube.youtubeSearch(arguments.join(' '));
        //console.log(videodata)
        if (!videodata) return await client.reply(from, '_⚠️ Error !_', id, true);
          let url = videodata.url[0];
          let judul = videodata.title[0];
          //const thumb = videodata[index].thumbnail;
          let durasi = videodata.duration[0];

          var menit = Math.floor(durasi / 60);
          var detik = durasi - menit * 60;

          let caption = `-------[ *Detail Video* ]-------\n\nJudul : ${judul}\nDurasi : ${menit} menit ${detik} detik`
          await client.sendButtons(from, caption, [
            {
              id: `ytmp3 ${url}`,
              text: 'Download MP3🎵'
            },{
              id: `ytmp4 ${url}`,
              text: 'Download MP4▶️'
            },{
              id: `ytsearch 1 ${arguments.join(' ')}`,
              text: `Next item ⏭️`
            }
          ], `Video Results ${1}`)
      break
      
      case 'lyrics':
      case 'lirik':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}lirik <judul lagu>_`, id, true);
        const getLyrics = await _function.lirik(arguments.join(' '));
        if (!getLyrics) return await client.reply(from, `_🥺 Lirik *${arguments.join(' ')}* Tidak Ditemukan!_`, id, true);
        await client.reply(from, getLyrics, id, true);
        break;

      case 'short':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}short <url/link yang ingin di perkecil>_`, id, true);
        const getShortener = await _function.short(arguments[0]);
        await client.reply(from, `${getShortener}`, id, true);
        break;

      case 'corona':
      case 'covid':
        const getCovid = await _function.covid(arguments.join(' '));
        await client.reply(from, getCovid || '_⚠️ Negara yang kamu maksud sepertinya tidak ter-data!_', id, true);
        break;

      case 'cat':
        const getCat = await _function.cat();
        await client.sendImage(from, getCat || 'https://cdn2.thecatapi.com/images/uvt2Psd9O.jpg', `${t}_${sender.id}.jpg`, '', id);
        break;

      case 'dog':
        const getDog = await _function.dog();
        await client.sendImage(from, getDog || 'https://images.dog.ceo/breeds/cattledog-australian/IMG_3668.jpg', `${t}_${sender.id}.jpg`, '', id);
        break;

      case 'meme':
        const getMeme = await _function.meme();
        await client.sendFile(from, getMeme.picUrl || 'https://i.redd.it/5zm5i8eqw5661.jpg', `${t}_${sender.id}.${getMeme.ext}`, '', id);
        break;

      case 'anime':
        if (arguments.length < 1) return await client.reply(from, `_Penggunaan : ${botPrefix}anime <judul>_`, id, true);
        const getAnime = await _function.animesearch(arguments.join(' '));
        if (!getAnime) return await client.reply(from, `_*Error!*_\nAnime tidak ditemukan `, id, true)
        await client.sendImage(from, getAnime.picUrl, `${t}_${sender.id}.jpg`, getAnime.caption, id);
        break;

      case 'stikernobg':
        return await client.reply(from, '_⚠️ Fitur Proses perbaikan/pengerjaan!_', id, true);
        break;

      case 'stickertottext':
      case 'stickerteks':
      case 'stikerteks':
        let teksLink
        if (arguments.length < 1 && !quotedMsg) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}stikerteks <kalimat>_`, id, true);
        if (quotedMsg) {
          let teks = quotedMsg.body.trim().split(' ');
          teks.push(`-${quotedMsg.sender.pushname}`)
          teksLink = _function.tosticker(teks);
        } else {
          teksLink = _function.tosticker(arguments);
        }
        await client.sendStickerfromUrl(from, teksLink);
        break;

      case 'wikipedia':
      case 'wiki':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}wiki <keywords>_`, id, true);
        try {
          const getWiki = await _function.wiki.wiki(arguments.join(' '));
          if (getWiki.picUrl === undefined) {
            await client.sendText(from, getWiki.caption)
          } else {
            await client.sendImage(from, getWiki.picUrl, `${t}_${sender.id}.jpg`, getWiki.caption, id);
          }
          break;
        } catch (err){
          console.log(err)
          return await client.reply(from, `_⚠️ *${arguments.join(' ')}* pada Wikipedia tidak ditemukan_`, id, true);
        }
        

      case 'imagequote':
        const getImagequote = await _function.imgquote();
        await client.sendImage(from, getImagequote, `${t}_${sender.id}.jpg`, '', id);
        break;

      case 'join':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}join <grup link>_`, id, true);
        const joinStatus = await client.joinGroupViaLink(arguments[0]);
        if (joinStatus === 406) return await client.reply(from, '_⚠️ Pastikan yang kamu masukkan adalah URL grup yang benar!_', id, true);
        if (joinStatus === 401) return await client.reply(from, '_⚠️ Bot Tidak dapat Join, karena baru-baru ini bot baru saja di kick dari grup tersebut!_', id, true);
        await client.reply(from, '_🚀 Meluncur! Bot berhasil masuk grup!_', id, true);
        break;

      case 'roll':
        const rollNumber = Math.floor(Math.random() * (6 - 1) + 1);
        await client.sendStickerfromUrl(from, `https://www.random.org/dice/dice${rollNumber}.png`);
        break;

      case 'weather':
      case 'cuaca':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}cuaca <nama kota>_`, id, true);
        const getWeather = await _function.weather(arguments.join(' '));
        await client.reply(from, getWeather, id, true);
        break;

      case 'movie':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}movie <judul>_`, id, true);
        const getMovie = await _function.movie(arguments.join(' '));
        if (!getMovie) return await client.reply(from, `_⚠️ ${arguments.join(' ')} Tidak ditemukan!_`, id, true);
        await client.sendImage(from, getMovie.moviePicture, `${t}_${sender.id}.jpeg`, getMovie.movieCaption, id);
        break;

      case 'run':
        const { chatId, body } = message;
        try {
          let msg = body.replace("#run ", "").split("\n");
          const lang = msg.splice(0, 1)[0];
          const source = msg.join("\n");
          const response = await axios.post(
            "https://emkc.org/api/v1/piston/execute",
            {
              language: lang,
              source: source,
            }
          );
          const { ran, language, output, version, code, message } = response.data;
          const reply = `${
            ran ? "Ran" : "Error running"
          } with ${language} v${version}\nOutput:\n${output}`;
          client.sendText(from, reply);
        } catch (e) {
          console.log(e);
          client.sendText(from, "Unsupported language");
        }
        break;

      case 'run languages':
        const response = await axios.get(
          "https://emkc.org/api/v1/piston/versions"
        );
        const reply = response.data
          .map((item) => `${item.name} - v${item.version}`)
          .join("\n");
        client.sendText(from, reply);
        break;

      case 'peringkatepl':
        let response1 = await axios.get(
          "https://pl.apir7.repl.co/table"
        );
        let reply1 = '*Peringkat Sementara EPL*\n\n'
        reply1 += response1.data.join("\n");
        client.sendText(from, reply1);
        break;

      case 'jadwalepl':
        let response2 = await axios.get(
          "https://pl.apir7.repl.co/fixtures"
        );
        let reply2 = '*Jadwal EPL*\n\n'
        reply2 += response2.data.join("\n");
        client.sendText(from, reply2);
        break;

      case 'loginvr':
        const vr = "Login vr dong \n yasman @6281285600258 \n hadid @6281329989383 \n junas @628978113198 \n barra @6281388088047 \n sean @6283818448972 \n ari @6281299115053 \n dito @6285155277438 \n murise @6281511529199";
        await client.sendTextWithMentions(from, vr);
        break;

      case 'logingta':
        const gta =`Login gta dong
Aji @628888418207 
Junas @628978113198 
Gisah @6285156132721 
Dito @6285155277438 
Arip @6282299922988 
Hadid @6281329989383 
Willy @6282112378872 
Wahuy @6281413543830
Nopal @6289638065793
Murise @6281511529199`;
        await client.sendTextWithMentions(from, gta);
        break;

      case 'loginml':
        const ml = `Login ml dong
aji @628888418207
wahyu @6281413543830
junas @628978113198
ikhsan @6281510026269
dito @6285155277438
jidni @62895330810346
titan @6287788087760`;
        await client.sendTextWithMentions(from, ml);
        break;

      case 'loginamong':
        const among = `Login among us dong
Murise @6281511529199
Dito @6285155277438
Junas @628978113198
Arip @6282299922988
Hadid @6281329989383
Willy @6282112378872
Wahuy @6281413543830
Nopal @6289638065793
Ghyas @6281285600258
Zidny @62895330810346
Aji @628888418207
Barra @6281388088047
Titan @6287788087760
Aufa @6285893440925`;
        await client.sendTextWithMentions(from, among);
        break;

      case 'loginmc':
        const mc =`Login minecraft dong
Gisah @6285156132721
Willy @6282112378872
Murise @6281511529199
Aufa @6285893440925
Nopal @6289638065793
Junas @628978113198
Barra @6281388088047
Wahyu @6281413543830
Dito @6285155277438`
        await client.sendTextWithMentions(from, mc);
        break;

      case 'logindota':
        const dota =`Login Dota 2 dong
Junas @628978113198
Dito @6285155277438
Arip @6282299922988
Wahuy @6281413543830
Murise @6281511529199`;
        await client.sendTextWithMentions(from, dota);
        break;

      case 'logingensin':
      case 'logingenshin':
      case 'login4no':
      const genshin =`Login Genshin dong
Aji @628888418207
Dito @6285155277438
Titan @6287788087760
Wahuy @6281413543830
Barra @6281388088047
Murise @6281511529199`;
        await client.sendTextWithMentions(from, genshin);
        break;

      case 'loginl4d2':
      case 'loginl4d':
      case 'loginjombi':
      const l4d2 =`Login Left4Dead dong
Aji @628888418207
Gisah @6285156132721
Dito @6285155277438
Titan @6287788087760
Wahuy @6281413543830
Murise @6281511529199
Aufa @6285893440925
Nopal @6289638065793
ari @6281299115053
Hadid @6281329989383`;
        await client.sendTextWithMentions(from, l4d2);
        break;

      case 'tambahtugas':
      case 'addtugas':
	if (!q.includes('|')) return await client.reply(from, ind.wrongFormat(), id, true);
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}addtugas | <detail tugas>_`, id, true);
        const isitugas = arg.split('|')[1];
        const tugasin = tugas.push(isitugas);
        fs.writeFileSync('./database/tugas.json', JSON.stringify(tugas));
        if (tugasin) return await client.reply(from, '📚 Tugas sudah ditambahkan!', id, true)
        break;
      
      case 'listtugas':
        if (!tugas.length || tugas.length == 0){
          await client.reply(from, "Gaada tugas ntap", id, true);
        } else {
          const listtugas = ngelisttugas()
          await client.reply(from, listtugas, id, true);
        }
        break;
        
      case 'deletetugas':
      case 'hapustugas':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix} <nomor tugas>_`, id, true);
        var i = arguments[0];
        i--;
        const hapusintugaslist = tugas.splice(i, 1);
        fs.writeFileSync('./database/tugas.json', JSON.stringify(tugas));
        //const hapusin = delete tugas[i];
        if (hapusintugaslist) return await client.reply(from, "Tugas dengan nomor " + arguments + " sudah dihapus", id, true);
        break;

      //Stiker commands

      case 'halo':
        await client.sendFile(from, './mediapreload/haloo.mp3', "halo.mp3", "Haloo", null, null, true);
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/StZTdND/haloo.png');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/PNCvDNJ/halo2.jpg');
        break;

      case 'asep':
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/2yytWMt/asep1.png');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/Nt1qc67/asep2.png');
        break;

      case 'tabah':
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/Xy5YQ9H/tabah1.jpg');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/yS2zpFt/tabah2.jpg');
        break;

      case 'lutelat':
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/Y2mnHhm/lotelat.jpg');
        await client.sendFile(from, './mediapreload/telat.mp3', "telat.mp3", "telaat", null, null, true);
        break;

      case 'bayu':
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/pK5Qs4J/bayu1.jpg');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/kDfVq4h/bayu2.jpg');
        break;

      case 'payoy':
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/cxNvqz7/payoy.jpg');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/cxNvqz7/payoy.jpg');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/r6phywr/payoy2.jpg');
        break;

      case 'teja':
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/M5gfvfQ/teja1.jpg');
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/VSn3d8k/teja2.png');
        break;
      
      case 'indihome':
        await client.sendFile(from, './mediapreload/indihome.mp3', "halo.mp3", "Haloo", null, null, true);
        await client.sendStickerfromUrl(from, 'https://i.ibb.co/k8xwK8s/image.png');
        break;

      case 'palpale':
        await client.sendFile(from, './mediapreload/pale.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'yamete':
        await client.sendFile(from, './mediapreload/masukin.mp3', "halo.mp3", "Haloo", null, null, true);
        break;
      
      case 'papepap':
        await client.sendFile(from, './mediapreload/pap.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'prank':
        await client.sendFile(from, './mediapreload/prank.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'goblok':
        await client.sendFile(from, './mediapreload/goblok.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'anjing':
        await client.sendFile(from, './mediapreload/anjing.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'cangkul':
        await client.sendFile(from, './mediapreload/cangkul.mp3', "halo.mp3", "Haloo", null, null, true);
        break;
      
      case 'otak':
        await client.sendFile(from, './mediapreload/otak.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'bangsat':
        await client.sendFile(from, './mediapreload/bangsat.mp3', "halo.mp3", "Haloo", null, null, true);
        break;
      
      case 'sange':
        await client.sendFile(from, './mediapreload/sange.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'failed':
        await client.sendFile(from, './mediapreload/failed.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'demituhan':
        await client.sendFile(from, './mediapreload/demituhan.mp3', "halo.mp3", "Haloo", null, null, true);
        break;
      
      case 'asede':
      case 'asade':
        await client.sendFile(from, './mediapreload/asade.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'wikawika':
        await client.sendFile(from, './mediapreload/wikawika.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'panikga':
        await client.sendFile(from, './mediapreload/panikga.mp3', "halo.mp3", "Haloo", null, null, true);
        break;
      
      case 'yntkts':
      case 'ygtkts':
      case 'yntkns':
        await client.sendFile(from, './mediapreload/yntkts.mp3', 'yntkts.mp3', 'yntkts', null, null, true);
        break;

      case 'assalamualaikum':
      case 'asalamualaikum':
      case 'salam':
        await client.sendFile(from, './mediapreload/salam.mp3', "halo.mp3", "Haloo", null, null, true);
        break;

      case 'resi':
        return client.reply(from, `Maaf, Sementara fitur ini tidak bisa digunakan`, id, true);
        if (arguments.length !== 2) return client.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${botPrefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id, true);
        const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex'];
        if (!kurirs.includes(arguments[0])) return client.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`);
        console.log('Memeriksa No Resi', arguments[1], 'dengan ekspedisi', arguments[0]);
        _function.cekResi(arguments[0], arguments[1]).then((result) => client.sendText(from, result));
        break;

      case 'nhder':
        if (disablecommand) {
          client.reply(from, "Fitur dimatikan sementara, tobat cok ", id, true)
          await client.sendStickerfromUrl(from, 'https://i.ibb.co/8nZFsY9/ghyastobat.png')
          return 0
        }
        if (arguments.length !== 1) return await client.reply(from, 'Silakan masukkan kode dengan benar!', id, true)
        await client.reply(from, ind.wait(), id, true)
        try {
            const kodeDojin = arguments[0]
            const proccessLink = `https://nhder.herokuapp.com/download/nhentai/${kodeDojin}/zip`
            const captionDojin = `------[ NHENTAI DOWNLOADER ]------\n\n➸ Kode doujin: ${kodeDojin}`
            await client.sendText(from, captionDojin)
            await client.sendFileFromUrl(from, proccessLink, `${kodeDojin}.zip`, '' , id)
        } catch (err) {
            console.error(err)
              await client.reply(from, `Error!\n${err}`, id, true)
        }
        break
      
        case 'santet':
          if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id, true)
          if (mentionedJidList.length === 0) return client.reply(from, 'Tag member yang mau disantet\n\nContoh : /santet @tag | kalo berak kaga di siram', id, true)
          if (arguments.length === 1) return client.reply(from, 'Masukkan alasan kenapa menyantet dia!!\n\nContoh : /santet @tag | kalo berak kaga di siram', id, true)
              const terima1 = santet[Math.floor(Math.random() * (santet.length))]
              const target = arg.split('|')[0]
              const alasan = arg.split('|')[1]
              await client.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}\n\nJenis Santet Yang di Terima Korban adalah *${terima1}*`)
          break

        case 'addjudullist':
          if (arguments.length === 0) return client.reply(from, `Buat list dengan judul\n\nContoh : ${botPrefix}addjudullist | <judul list>`, id, true);
          if (judullist.length > 0) return client.reply(from, `Mohon untuk reset list terlebih dahulu dengan command ${botPrefix}resetlist`, id, true);
          const isijudullist = arg.split(`|`)[1];
          const judulin = judullist.push(isijudullist);
          if (judulin) return client.reply(from, `List sudah ditambahkan, untuk menambahkan isi list menggunakan command ${botPrefix}addlist | <isi list>`, id, true);
          break;
        
        case 'addlist':
          if (arguments.length === 0) return client.reply(from, `Tambah daftar List dengan isi\n\nContoh : ${botPrefix}addlist | <ini list>`, id, true);
          if (judullist.length === 0) return client.reply(from, `Mohon untuk membuat judul List terlebih dahulu dengan command ${botPrefix}addjudullist`, id, true);
          const isilist = arg.split(`|`)[1];
          const isiin = daftarlist.push(isilist);
          if (isiin) {
            const isidaftar = ngelistisi();
            client.reply(from, isidaftar, id, true);
          }
          break;
        
        case 'hapuslist':
          if (arguments.length === 0) return client.reply(from, `Hapus item pada List dengan nomor item\n\nContoh : ${botPrefix}hapuslist 1`, id, true);
          if (daftarlist.length === 0) return client.reply(from, `Tambah daftar List dengan isi\n\nContoh : ${botPrefix}addlist | <ini list>`, id, true);
          if (judullist.length === 0) return client.reply(from, `Mohon untuk membuat judul List terlebih dahulu dengan command ${botPrefix}addjudullist`, id, true);
          var i = arguments[0];
          i--;
          const hapusinlist = daftarlist.splice(i, 1);
          if (hapusinlist){
            client.reply(from, `Item dengan nomor ${arguments} telah dihapus !`, true);
            const isidaftar = ngelistisi();
            client.sendText(from, isidaftar);
          }
          break;

        case 'outputlist':
          if (daftarlist.length === 0) return client.reply(from, `Tambah daftar List dengan isi\n\nContoh : ${botPrefix}addlist | <ini list>`, id, true);
          if (judullist.length === 0) return client.reply(from, `Mohon untuk membuat judul List terlebih dahulu dengan command ${botPrefix}addjudullist`, id, true);
          const isidaftar = ngelistisi();
          client.reply(from, isidaftar, id, true);
          break;

        case 'resetlist':
          while (daftarlist.length) { 
            daftarlist.pop(); 
          }
          while (judullist.length) { 
            judullist.pop(); 
          }
          if (daftarlist.length === 0 && judullist.length === 0) return client.reply(from, `List sudah di reset !`, id, true);
          break;

      case 'alkitab':
        if (arguments.length === 0) return client.reply(from, `Mengirim detail ayat al-kitab dari pencarian \n\nContoh : ${botPrefix}alkitab <pencarian>`, id, true);
        try {
        await client.reply(from, ind.wait(), id, true)
        _function.misc.alkitab(q)
            .then(async ({ result }) => {
                let alkitab = '-----[ *AL-KITAB* ]-----'
                for (let i = 0; i < result.length; i++) {
                    alkitab +=  `\n\n➸ *Ayat*: ${result[i].ayat}\n➸ *Isi*: ${result[i].isi}\n➸ *Link*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                }
                await client.reply(from, alkitab, id, true)
                console.log('Success sending Al-Kitab!')
            })
          } catch (e) {
            await client.sendText(from, e)
          }
        break

      case 'kbbi':
        if (arguments.length === 0) return client.reply(from, `Mengirim detail arti kbbi dari pencarian \n\nContoh : ${botPrefix}kbbi <pencarian>`, id, true);
        await client.reply(from, ind.wait(), id, true)
          _function.misc.kbbi(q)
          .then(async ({ lema, arti })=> {
              let kbbi = '------*KBBI*------'
              kbbi += `\n\n*Kata*: ${lema}\n\n`
              kbbi += `*Arti*: \n`
              for (let i = 0; i < arti.length; i++){
                kbbi += `➸ ${arti[i]}\n`
              }
              await client.reply(from, kbbi, id, true)
              console.log('Success sending KBBI details!')
	        })
          .catch(err => {
            client.reply(from, `Sepertinya kata tersebut tidak ditemukan, mohon coba kata lain`, id, true)
            console.log('Failed sending KBBI details!')
            console.log(err)
          })
        break

      case 'reminder': // by Slavyan
        const remindhelp= `
*${botPrefix}reminder*
Pengingat. 
*s* - detik
*m* - menit
*h* - jam
*d* - hari
Aliases: -
Usage: *${botPrefix}reminder* 10s | pesan_pengingat
        `
        if (arguments.length === 0) return client.reply(from, remindhelp, id, true)
        if (!q.includes('|')) return await client.reply(from, ind.wrongFormat(), id, true)
        const timeRemind = q.substring(0, q.indexOf('|') - 1)
        const messRemind = q.substring(q.lastIndexOf('|') + 2)
        const parsedTime = parseMilliseconds(toMs(timeRemind))
        _function.reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
        await client.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.days} hari ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
        const intervRemind = setInterval(async () => {
            if (Date.now() == _function.reminder.getReminderTime(sender.id, _reminder)) {
                await client.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${_function.reminder.getReminderMsg(sender.id, _reminder)}`)
                _reminder.splice(_function.reminder.getReminderPosition(sender.id, _reminder), 1)
                fs.writeFileSync('./database/reminder.json', JSON.stringify(_reminder))
                clearInterval(intervRemind)
            }
        }, 1000)
        break

      case 'infohoax':
        await client.reply(from, ind.wait(), id, true)
        _function.misc.infoHoax()
          .then(async ({ result }) => {
              let txt = '*「 HOAXES 」*'
              for (let i = 0; i < 4; i++) {
                  const { desc, title, link, date } = result[i]
                  txt += `\n\n➸ *Judul*: ${title}\n➸ *Link*: ${link}\n➸ *Deskripsi*: ${desc}\n➸ *Tanggal*: ${date}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
              }
              await client.sendFileFromUrl(from, result[0].img, 'hoax.jpg', txt, id)
              console.log('Success sending infohoax!')
          })
          .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id, true)
          })
        break

      case 'translate':   
          if (arguments.length === 0 && !quotedMsg) return client.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${botPrefix}translate <kode_bahasa>\ncontoh ${botPrefix}translate id\n\nAtau dengan perintah ${botPrefix}translate <bahasa> | <teks>`, id, true)
          if (q.includes('|')){
            const texto = arg.split('|')[1]
            const languaget = arg.split(' |')[0]
            _function.translate(texto, languaget).then((result) => client.sendText(from, result)).catch(() => client.sendText(from, 'Error noreply, Kode bahasa salah.\n\n Silahkan cek kode bahasa disini\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js'))
            //translate(texto, {to: languaget}).then(res => {client.reply(from, res.text, id)}).catch(() => client.sendText(from, 'Error, Kode bahasa salah.\n\n Silahkan cek kode bahasa disini\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js'), true)
          } else { const quoteText = quotedMsg.body
            _function.translate(quoteText, arguments[0])
                .then((result) => client.sendText(from, result))
                .catch(() => client.sendText(from, 'Error reply, Kode bahasa salah.\n\n Silahkan cek kode bahasa disini\nhttps://github.com/vitalets/google-translate-api/blob/master/languages.js'))}
          //if (!quotedMsg) return client.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${botPrefix}translate <kode_bahasa>\ncontoh ${botPrefix}translate id`, id, true)
          break
      
          case 'hadis': // irham01
          case 'hadees':
              if (arguments.length <= 1) return await client.reply(from, ind.hadis(), id, true)
              await client.reply(from, ind.wait(), id, true)
              console.log('argumen 1 : ' + arguments[0]+ ' argumen 2 : ' + arguments[1])
              try {
                  if (arguments[0] === 'darimi') {
                      const hdar = await axios.get(`https://api.hadith.gading.dev/books/darimi/${arguments[1]}`)
                      await client.sendText(from, `${hdar.data.data.contents.arab}\n${hdar.data.data.contents.id}\n\n*H.R. Darimi*`, id)
                  } else if (arguments[0] === 'ahmad') {
                      const hmad = await axios.get(`https://api.hadith.gading.dev/books/ahmad/${arguments[1]}`)
                      await client.sendText(from, `${hmad.data.data.contents.arab}\n${hmad.data.data.contents.id}\n\n*H.R. Ahmad*`, id)
                  } else if (arguments[0] === 'bukhari') {
                      const hbukh = await axios.get(`https://api.hadith.gading.dev/books/bukhari/${arguments[1]}`)
                      await client.sendText(from, `${hbukh.data.data.contents.arab}\n${hbukh.data.data.contents.id}\n\n*H.R. Bukhori*`, id)
                  } else if (arguments[0] === 'muslim') {
                      const hmus = await axios.get(`https://api.hadith.gading.dev/books/muslim/${arguments[1]}`)
                      await client.sendText(from, `${hmus.data.data.contents.arab}\n${hmus.data.data.contents.id}\n\n*H.R. Muslim*`, id)
                  } else if (arguments[0] === 'malik') {
                      const hmal = await axios.get(`https://api.hadith.gading.dev/books/malik/${arguments[1]}`)
                      await client.sendText(from, `${hmal.data.data.contents.arab}\n${hmal.data.data.contents.id}\n\n*H.R. Malik*`, id)
                  } else if (arguments[0] === 'nasai') {
                      const hnas = await axios.get(`https://api.hadith.gading.dev/books/nasai/${arguments[1]}`)
                      await client.sendText(from, `${hnas.data.data.contents.arab}\n${hnas.data.data.contents.id}\n\n*H.R. Nasa'i*`, id)
                  } else if (arguments[0] === 'tirmidzi') {
                      const htir = await axios.get(`https://api.hadith.gading.dev/books/tirmidzi/${arguments[1]}`)
                      await client.sendText(from, `${htir.data.data.contents.arab}\n${htir.data.data.contents.id}\n\n*H.R. Tirmidzi*`, id)
                  } else if (arguments[0] === 'ibnumajah') {
                      const hibn = await axios.get(`https://api.hadith.gading.dev/books/ibnu-majah/${arguments[1]}`)
                      await client.sendText(from, `${hibn.data.data.contents.arab}\n${hibn.data.data.contents.id}\n\n*H.R. Ibnu Majah*`, id)
                  } else if (arguments[0] === 'abudaud') {
                      const habud = await axios.get(`https://api.hadith.gading.dev/books/abu-daud/${arguments[1]}`)
                      await client.sendText(from, `${habud.data.data.contents.arab}\n${habud.data.data.contents.id}\n\n*H.R. Abu Daud*`, id)
                  } else {
                      await client.sendText(from, ind.hadis(), id)
                  }
              } catch (err) {
                  console.error(err)
                  await client.reply(from, 'Error!', id, true)
              }
          break

        case 'nulishd':                
          if (arguments.length == 0) return client.reply(from, `Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulishd [teks]\n\ncontoh: ${prefix}nulis i love you 3000`, id, true)
          const nulisp = await _function.tulis(q)
          await client.sendImage(from, `${nulisp}`, '', 'Nih ...', id)
          .catch(() => {
              client.reply(from, 'Ada yang Error!', id, true)
          })
          break


          case 'nuliskanan': {
            if (!arguments.length >= 1) return client.reply(from, `Kirim ${botPrefix}nuliskanan teks`, id), true 
            const tulisan = validMessage.slice(12)
            client.sendText(from, 'sabar ya lagi nulis')
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './mediapreload/images/buku/sebelumkanan.jpg',
                '-font',
                './lib/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '2',
                '-annotate',
                '+128+129',
                fixHeight,
                './mediapreload/images/buku/setelahkanan.jpg'
            ])
            .on('error', () => client.reply(from, 'Error gan', id), true)
            .on('exit', () => {
                client.sendImage(from, './mediapreload/images/buku/setelahkanan.jpg', 'after.jpg', `*Nulis selesai!*\n\nDitulis selama: ${_function.processTime(t, moment())} _detik_`, id)
              })
            }
            break

        case 'nuliskiri':                     
          if (!arguments.length >= 1) return client.reply(from, `Kirim ${botPrefix}nuliskiri teks`, id), true 
          const tulisan = validMessage.slice(11)
          client.sendText(from, 'sabar ya lagi nulis')
          const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
          const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
          spawn('convert', [
              './mediapreload/images/buku/sebelumkiri.jpg',
              '-font',
              './lib/font/Indie-Flower.ttf',
              '-size',
              '960x1280',
              '-pointsize',
              '22',
              '-interline-spacing',
              '2',
              '-annotate',
              '+140+153',
              fixHeight,
              './mediapreload/images/buku/setelahkiri.jpg'
          ])
          .on('error', () => client.reply(from, 'Error gan', id), true)
          .on('exit', () => {
              client.sendImage(from, './mediapreload/images/buku/setelahkiri.jpg', 'after.jpg', `*Nulis selesai!*\n\nDitulis selama: ${_function.processTime(t, moment())} _detik_`, id)
          })
          break

        case 'foliokiri': {
            if (!arguments.length >= 1) return client.reply(from, `Kirim ${botPrefix}foliokiri teks`, id), true 
            const tulisan = validMessage.slice(11)
            client.sendText(from, 'sabar ya lagi nulis')
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './mediapreload/images/folio/sebelumkiri.jpg',
                '-font',
                './lib/font/Indie-Flower.ttf',
                '-size',
                '1720x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '4',
                '-annotate',
                '+48+185',
                fixHeight,
                './mediapreload/images/folio/setelahkiri.jpg'
            ])
            .on('error', () => client.reply(from, 'Error gan', id), true)
            .on('exit', () => {
                client.sendImage(from, './mediapreload/images/folio/setelahkiri.jpg', 'after.jpg', `*Nulis selesai!*\n\nDitulis selama: ${_function.processTime(t, moment())} _detik_`, id)
            })
            }
            break

          case 'foliokanan': {
            if (!arguments.length >= 1) return client.reply(from, `Kirim ${botPrefix}foliokanan teks`, id), true 
            const tulisan = validMessage.slice(12)
            client.sendText(from, 'sabar ya lagi nulis')
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './mediapreload/images/folio/sebelumkanan.jpg',
                '-font',
                './lib/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '3',
                '-annotate',
                '+89+190',
                fixHeight,
                './mediapreload/images/folio/setelahkanan.jpg'
            ])
            .on('error', () => client.reply(from, 'Error gan', id), true)
            .on('exit', () => {
                client.sendImage(from, './mediapreload/images/folio/setelahkanan.jpg', 'after.jpg', `*Nulis selesai!*\n\nDitulis selama: ${_function.processTime(t, moment())} _detik_`, id)
            })
            }
            break

          case 'pollresult':
              _function.polling.getpoll(client, message, pollfile, voterslistfile)
              break
          
          case 'addvote':
              try{
                console.log('---> vote start')
                _function.polling.voteadapter(client, message, pollfile, voterslistfile)
              } catch (e){
                console.log(e)
              }
              break
          
          case 'addpoll':
              _function.polling.adminpollreset(client, message, message.body.slice(9), pollfile, voterslistfile)
              break
          
          case 'addv':
            try {
              _function.polling.addcandidate(client, message, message.body.slice(6), pollfile, voterslistfile)
            } catch (e){
              console.log(e)
            }
            break


      case 'fb':
        case 'facebook':
            if (arguments.length !== 1) return client.reply(from, `_⚠️ Contoh Penggunaan perintah : ${botPrefix}fb <link fb>_`, id, true)
            if (!isUrl(url) && !url.includes('facebook.com')) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid. [Invalid Link]', id, true)
            await client.reply(from, ind.wait(), id, true)
            _function.facebook(url).then(async (videoMeta) => {
                const title = videoMeta.title
	              const linkhd = videoMeta.download.hd
                var statquality = "quality"
                var linkdown

                if (linkhd == null) {
                  linkdown = videoMeta.download.sd
                  statquality = "SD"
                } else {
                  linkdown = videoMeta.download.hd
                  statquality = "HD"
                }
                
                console.log(`FB link found : ${linkdown}`);

                const caption = `Judul: ${title} \n\nKualitas Video: ${statquality}`
                await client.sendFileFromUrl(from, linkdown, 'videos.mp4', caption)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${_function.processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            })
                .catch(async (err) => {
                  client.reply(from, `Error, url tidak valid atau tidak memuat video. [Invalid Link or No Video] \n\n${err}`, id, true);
                  console.log(err);
                })
          break
      
          /*
      case 'musicidentify':
        let resultm
        if (!isQuotedVoice && !isQuotedAudio) return client.reply(from, `_⚠️ Contoh Penggunaan perintah : reply music berbentuk voice note yang ingin di identifikasi musiknya dengan ${botPrefix}musicidentify_`, id, true)
        await client.reply(from, ind.wait(), id, true)
        const encryptMediaAudio = quotedMsg
        const mediaDataAudio = await decryptMedia(encryptMediaAudio, uaOverride)
        const audioPath = await saveFile(mediaDataAudio, `musicidentify.${sender.id}`)
        if (path.extname(audioPath) == '.opus' || path.extname(audioPath) == '.aac'){
          var audioPath2 = path.resolve(audioPath)
          console.log("audiopath absolute : ", audioPath2)
          console.log("Converting audio to mp3...")
          var absolutepath = process.cwd()
          var fileresult = `${absolutepath}/media/musicout.${sender.id}.mp3`
          ffmpeg(audioPath2)
          .toFormat('mp3')
          .setDuration(20)
          .on('error', (err) => {
            client.reply(from, `Konversi error!\nMohon coba lagi atau laporkan kepada owner\n\nError Message ${err.message}`, true);
          })
          .on('progress', (progress) => {
              // console.log(JSON.stringify(progress));
              console.log('Processing: ' + progress.targetSize + ' KB converted');
          })
          .on('end', () => {
              console.log('Processing finished !');
          })
          .save(fileresult);//path where you want to save your file
          const linkfile = await _function.uploadAnonfile(`media/musicout.${sender.id}.mp3`)
          if (linkfile.data.status == 'false') return client.reply(from, `Upload anonfile error!\n Message : ${linkfile.data.error.message}`, id, true)
          console.log("link file : ", linkfile.data.data.file.url.full)
          resultm = await _function.audioindentify(linkfile.data.data.file.url.full)
        } else if (path.extname(audioPath) == '.mp3') {
          var fileresult2 = `media/musicout.${sender.id}.mp3`
          await MP3Cutter.cut({
            src: audioPath,
            target: fileresult2,
            start: 0,
            end: 20 
          });
          const linkfile2 = await _function.uploadAnonfile(fileresult2)
          console.log("link file : ", linkfile2)
          resultm = await _function.audioindentify(linkfile2)
        }
        console.log('resultm : ', resultm)
        if (resultm.data.status == 'success'){
          let teks = `🎵*Hasil Identifikasi Lagu*🎵
*Judul* : ${resultm.data.result.title}
*Artis* : ${resultm.data.result.artist}
*Album* : ${resultm.data.result.album}
*Link* : ${resultm.data.result.song_link}
*Link Spotify* : ${resultm.data.result.spotify.album.external_urls.spotify}
          
*Posisi rekaman pada lagu* : ${resultm.data.result.timecode}`
          client.sendImage(from, resultm.data.result.spotify.album.images[0].url, 'music.jpg', teks, id)
        } else {
          client.reply(from, `Request error!\nMohon coba lagi atau laporkan kepada owner\nError Message : ${resultm.data.error.error_code} - ${resultm.data.error.error_message}`,id, true)
        }
        //await client.reply(from, `${audioPath} file saved`, id, true)
        break
        */
      
      case 'artdots':
      if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah: ${botPrefix}artdots <pilihan> atau ${botPrefix}artdots help_`, id, true);
      switch (arguments[0]){
        case 'help' :
          return await client.reply(from, `Pilihan art dots:\n among\n sus\n yntkts\n kanna\n paimon\n nopal\n nazi\n soviet`, id, true);
          break
        case 'among':
          return await client.reply(from, _artdots.among, id, true)
          break
        case 'sus':
          return await client.reply(from, _artdots.sus, id, true)
          break
        case 'yntkts':
          return await client.reply(from, _artdots.yntkts, id, true)
          break
        case 'kanna':
          return await client.reply(from, _artdots.kanna, id, true)
          break
        case 'paimon':
          return await client.reply(from, _artdots.paimon, id, true)
          break
        case 'nopal':
          return await client.reply(from, _artdots.nopal, id, true)
          break
        case 'nazi':
          return await client.reply(from, _artdots.nazi, id, true)
          break
        case 'soviet':
          return await client.reply(from, _artdots.soviet, id, true)
          break
        default:
          return await client.reply(from, `Artdots tidak tersedia!\nList pilihan: ${botPrefix}artdots help`, id, true);
          break
      }
      break

      case 'billboard':
        const bmodes = ['indo', 'global', 'kpop']
        let bres, bhasil
        if (arguments.length <= 0 || arguments[0] == 'help'){
          return await client.reply(from, `*Fitur List Billboard Charts*\n\n_Untuk menggunakan fitur :\n ${botPrefix}billboard <chart>\n\nDaftar chart tersedia : _indo, global, kpop_`, id, true)
        }
        else if (arguments[0] == 'indo'){
          bhasil = '*Billboard Chart Indonesia*'
          await getChart('indonesia-songs-hotw', (err, chart) => {
            if (err) console.log(err);
            bres = chart.songs
            for (let i = 0; i < 14; i++) {
              p = i + 1;
              bhasil += `\n${p}.\n*Judul* : ${bres[i].title}\n*Artist* : ${bres[i].artist}\n*Posisi* : \n  Lastweek : ${bres[i].position.positionLastWeek} | Peak : ${bres[i].position.peakPosition} | Weeks on Chart : ${bres[i].position.weeksOnChart}\n\n`
            }
            client.sendText(from, bhasil);
          });
        }
        else if (arguments[0]=='global'){
          bhasil = '*Billboard Chart Global*'
          await getChart('hot-100', (err, chart) => {
            if (err) console.log(err);
            bres = chart.songs
            for (let i = 0; i < 14; i++) {
              p = i + 1;
              bhasil += `\n${p}.\n*Judul* : ${bres[i].title}\n*Artist* : ${bres[i].artist}\n*Posisi* : \n  Lastweek : ${bres[i].position.positionLastWeek} | Peak : ${bres[i].position.peakPosition} | Weeks on Chart : ${bres[i].position.weeksOnChart}\n\n`
            }
            client.sendText(from, bhasil);
          });
        }
        else if (arguments[0]=='kpop'){
          bhasil = '*Billboard Chart K-Pop*'
          await getChart('billboard-korea-100', (err, chart) => {
            if (err) console.log(err);
            bres = chart.songs
            for (let i = 0; i < 14; i++) {
              p = i + 1;
              bhasil += `\n${p}.\n*Judul* : ${bres[i].title}\n*Artist* : ${bres[i].artist}\n*Posisi* : \n  Lastweek : ${bres[i].position.positionLastWeek} | Peak : ${bres[i].position.peakPosition} | Weeks on Chart : ${bres[i].position.weeksOnChart}\n\n`
            }
            client.sendText(from, bhasil);
          });
        }
        break;

      case 'google':
        const gmodes = ['search', 'image', 'reverseimage']
        if (arguments.length <= 1 || arguments[0] == 'help'){
          return await client.reply(from, `*Fitur Pencarian Google*\n\n_Untuk mencari dengan Google_ : ${botPrefix}google search <judul>\n_Untuk mencari gambar_ : ${botPrefix}google image <judul>\n_Untuk mencari hasil google dengan gambar_ : kirim atau reply gambar yang ingin dicari, lalu berikan caption ${botPrefix}google reverseimage`, id, true)
        }
        else if (arguments[0] == 'search'){
         await client.reply(from, ind.wait() + `\n\n_Mendapatkan hasil dari Google Search..._`, id, true)
          const gres = await google.search(arguments.slice(1).join(' '), {
            page: 0,
            safe: disablecommand,
          });
          //console.log(gres);
          let ghasil = '*Hasil Pencarian Google*\n\n'
          if (gres.hasOwnProperty("did_you_mean")){
            ghasil += `Mungkin maksud anda, _*${gres.did_you_mean}*_?\n\n`
          }
          for (let i = 0; i < gres.results.length; i++) {
            ghasil += `${i}.\n*Judul* : ${gres.results[i].title}\n*Deskripsi* : ${gres.results[i].description}\n*Link* : ${gres.results[i].url}\n\n`
          }
          await client.reply(from, ghasil, id, true)
        }
        else if (arguments[0] == 'image'){
          client.reply(from, ind.wait() + `\n\n_Mendapatkan hasil dari Google Search..._`, id, true)
          const gimages = await google.image(arguments.slice(1).join(' '), { safe: disablecommand });
          if (gimages.length === 0) return await client.reply(from, `Maaf, hasil pencarian tidak ditemukan`, id, true)
          for (let i = 0; i < 4; i++) {
            await client.sendFileFromUrl(from, gimages[i].url, 'hasilgambar.jpg', `${i}\n*Judul sumber* : ${gimages[i].origin.title}\n*Website sumber* : ${gimages[i].origin.website}\n*Link gambar* : ${gimages[i].url}` ,id) 
          }
        }
        else if (arguments[0] == 'reverseimage'){
          client.reply(from, ind.wait() + `\n\n_Mendapatkan hasil dari Google Search..._`, id, true)
          if(isMedia && isImage || isQuotedImage){
            const encryptMedia = isQuotedImage ? quotedMsg : message
            const mediaData = await decryptMedia(encryptMedia, uaOverride)
            const imageLink = await uploadImages(mediaData, `greverse.${sender.id}`)
            console.log(imageLink)
            const greverse = await google.search(imageLink, { ris: true });

            let greversehasil = '*Hasil Pencarian Google Reverse Image Search*\n\n'
            for (let i = 0; i < greverse.results.length; i++) {
              greversehasil += `${i}.\n*Judul* : ${greverse.results[i].title}\n*Deskripsi* : ${greverse.results[i].description}\n*Link* : ${greverse.results[i].url}\n\n`
            }
            await client.reply(from, greversehasil, id, true)
          } else if (!isImage && !isQuotedImage) {
            await client.reply(from, `_⚠️ Mohon kirim atau reply gambar yang ingin dicari, lalu berikan caption ${botPrefix}google reverseimage_ `, true)
          }
        }
        break
      
      case 'removebg':
        if (!isImage && !isQuotedImage) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim atau reply sebuah gambar yang ingin dihapus background nya lalu berikan caption ${botPrefix}removebg_`, id, true);
        if (isMedia && isImage || isQuotedImage){
          await client.reply(from, ind.wait(), id, true)
          const encryptMedia = isQuotedImage ? quotedMsg : message
          //const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
          const mediaData = await decryptMedia(encryptMedia, uaOverride)
          //const mediatostr = mediaData.toString('base64')
          //const imageBase64 = `data:${_mimetype};base64,${mediatostr}`
          const imageLink = await uploadImages(mediaData, `removebg.${sender.id}`)
          await _function.misc.downloadFile(`https://api.akuari.my.id/other/removebg2?link=${imageLink}`, `./media/removebg.${sender.id}.png`)
          await client.sendImage(from, `./media/removebg.${sender.id}.png`)
          await client.sendFile(from, `./media/removebg.${sender.id}.png`, '', '', null, null, null, true)
        }
        break

      case 'tafsirmimpi':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}tafsirmimpi <pencarian>_`, id, true);
        _function.akuariapi.tafsirmimpi(arguments.join(' '))
          .then(async ({hasil}) => {
            await client.reply(from, `*Pencarian tafsir mimpi* : ${arguments.join(' ')}\n\n${hasil}`, id, true)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `Sepertinya kata tersebut tidak ditemukan, mohon coba kata lain`, id, true)
          })
        break
      
      case 'ramalanjodoh':
        if (arguments.length < 1 && arguments.length > 2) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}ramalanjodoh <nama> <jodoh>_`, id, true);
        _function.akuariapi.ramalanjodoh(arguments[0], arguments[1])
          .then(async ({hasil}) => {
            await client.sendText(from, `_*Ramalan Jodoh*_\n\n*Nama* : ${arguments[0]}\n*Pasangan* : ${arguments[1]}\n\n*Positif* : ${hasil.positif}\n*Pesan* : ${hasil.negatif}`)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`, id, true)
          })
        break

      case 'ramalantgljadian':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}ramalantgljadian <tanggal 'DD-MM-YYYY' : 21-09-2021>_`, id, true);
        _function.akuariapi.ramalantgljadian(arguments.join(' '))
          .then(async ({hasil}) => {
            await client.sendText(from, `_*Ramalan Makna Tanggal Jadian*_\n${hasil.substring(hasil.indexOf(";") + 1)}`)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break
      
      case 'ramalantanggal':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}ramalantanggal <tanggal 'DD-MM-YYYY' : 21-09-2021>_`, id, true);
        _function.akuariapi.ramalantgl(arguments.join(' '))
          .then(async ({hasil}) => {
            await client.sendText(from, `_*Ramalan Tanggal*_\n${hasil.substring(hasil.indexOf(";") + 1)}`)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break

      case 'artinama':
        if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}artinama <nama>_`, id, true);
        _function.akuariapi.artinama(arguments.join(' '))
          .then(async (hasil) => {
            await client.sendText(from, `_*Arti Nama *_\n${hasil.substring(hasil.indexOf(";") + 1)}`)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break

      case 'faktaunik':
        //if (arguments.length < 1) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}artinama <nama>_`, id, true);
        _function.akuariapi.faktaunik()
          .then(async ({hasil}) => {
            await client.sendText(from, `*Fakta Unik Random*\n\n_"${hasil}"_`)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break

      case 'infogempa':
        await client.reply(from, ind.wait(), id, true)
        _function.akuariapi.gempa()
          .then(async ({result}) => {
            await client.sendFileFromUrl(from, result.image, 'hoax.jpg', `_*Info Gempa Terbaru*_\n\n*Tanggal* : ${result.tanggal}\n*Jam* : ${result.jam}\n*Lokasi* : \n  Lintang: ${result.lintang}\n  Bujur: ${result.bujur}\n*Magnitude* : ${result.magnitude}\n*Kedalaman* : ${result.kedalaman}\n*Potensi* : ${result.potensi}\n*Wilayah* : ${result.wilayah}`)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break

      case 'asahotak':
        _function.akuariapi.asahotak()
          .then(async ({hasil}) => {
            let idasah = await client.sendText(from, `*Soal Asah Otak*\n\nSoal : ${hasil.soal}`)
            await new Promise(resolve => setTimeout(resolve, 30000));
            await client.reply(from, `*Jawaban Asah Otak*\n\n${hasil.jawaban}`, idasah, true)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break

      case 'tebakgambar':
        await client.reply(from, ind.wait(), id, true)
        _function.akuariapi.tebakgambar()
          .then(async ({img, jawaban}) => {
            let idtebak = await client.sendFileFromUrl(from, img, 'tebakgambar.jpg', `*Soal Tebak Gambar*`)
            await new Promise(resolve => setTimeout(resolve, 60000));
            await client.reply(from, `*Jawaban Tebak Gambar*\n\n${jawaban}`, idtebak, true)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        break

      case 'hilih':
        if (arguments.length < 1 && !quotedMsg) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}hilih <kalimat>_`, id, true);
        if (quotedMsg) {
          _function.akuariapi.hilih(quotedMsg.body)
          .then(async ({message}) => {
            await client.reply(from, message, id, true)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id , true)
          })
        } else {
          _function.akuariapi.hilih(arguments.join(' '))
          .then(async ({message}) => {
            await client.reply(from, message, id, true)
          })
          .catch(err => {
            console.log(err)
            client.reply(from, `_Request Error!_ \nMohon coba sesaat lagi`,id, true)
          })
        }
        break

      case 'qrcode':
        if (arguments.length < 1 && !quotedMsg) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}hilih <kalimat>_`, id, true);
        await _function.misc.downloadFile(`https://api.akuari.my.id/other/qrcode?text=${quotedMsg ? quotedMsg.body : arguments.join(' ')}`, `./media/qrcode.${sender.id}.png`)
        await client.sendImage(from, `./media/qrcode.${sender.id}.png`)
        break

      
      //==========================Weeb Zone========================================
      case 'neko':
        console.log('Getting neko image...')
        await client.sendFileFromUrl(from, (await neko.neko()).url, 'neko.jpg', '', null, null, true)
          .then(() => console.log('Success sending neko image!'))
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id, true)
          })
        break

      case 'animewall':
        if (disablecommand) return await client.reply(from, "_Sementara fitur dimatikan, dikarenakan tercampurnya library sfw dengan nsfw_", id, true)
        console.log('Getting wallpaper image...')
          await client.sendFileFromUrl(from, (await neko.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
            .then(() => console.log('Success sending wallpaper image!'))
            .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id , true)
          })
        
        break

      case 'kusonime':
        if (arguments.length === 0) return client.reply(from, `Mengirim details anime dari web Kusoanime\n\nContoh : ${botPrefix}kusonime <judul anime>`, id, true);
        _function.weeaboo.anime(q)
          .then(async ({ info, link_dl, sinopsis, thumb, title, error, status }) => {
            if (status === false) {
              return await client.reply(from, error, id, true)
            } else {
              let animek = `${title}\n\n${info}\n\nSinopsis: ${sinopsis}\n\nLink download:\n${link_dl}`
              await client.sendFileFromUrl(from, thumb, 'animek.jpg', animek, null, null, true)
                .then(() => console.log('Success sending anime info!'))
            }
          })
          .catch(async (err) => {
            console.error(err)
            await client.reply(from, 'Error!', id, true)
          })
        break
      
      case 'wait':
      case 'traceanime':
        if (!isImage && !isQuotedImage) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim atau reply sebuah gambar screenshot yang ingin dicari sumber anime nya lalu berikan caption ${botPrefix}wait_`, id, true);
        if (isMedia && isImage || isQuotedImage){
          await client.reply(from, ind.wait(), id, true)
          const encryptMedia = isQuotedImage ? quotedMsg : message
          //const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
          const mediaData = await decryptMedia(encryptMedia, uaOverride)
          //const mediatostr = mediaData.toString('base64')
          //const imageBase64 = `data:${_mimetype};base64,${mediatostr}`
          const imageLink = await uploadImages(mediaData, `wait.${sender.id}`)
          _function.weeaboo.wait(imageLink)
            .then(async (result) => {
              if (result.result && result.result.length <= 2) {
                return await client.reply(from, 'Anime not found! :(', id, true)
              } else {
                const {native, romaji, english} = result.result[0].anilist.title
                const { episode, similarity, video} = result.result[0]
                let teks = ''
                console.log(imageLink)
                teks += `*Anime Result*\n\n`
                console.log('Anime found, please wait')
                if (similarity < 0.85) {
                  teks += `*Title*: ${native}\n*Romaji*: ${romaji}\n*English*: ${english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%\nLow similiarity!. \n\nHasil merupakan asal tebak saja.`
                  client.reply(from, teks, id, true)
                } else {
                  teks += `*Title*: ${native}\n*Romaji*: ${romaji}\n*English*: ${english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                  try {
                    await client.sendFileFromUrl(from, video, `result.mp4`, null, id)
                    await client.reply(from, teks, id, true)
                      .then(() => console.log('Success sending anime source!'))
                  } catch (error) {
                    await client.reply(from, teks, id, true)
                    console.log('Video send error, trying without video')
                    console.log(error.stack)
                  }
                }
              }
            })
              .catch(async (err) => {
              console.error(err)
              await client.reply(from, 'Error!', id, true)
            })
          }
        break

      case 'sauce':
        if (!isImage && !isQuotedImage) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : kirim sebuah gambar artwork yang ingin dicari sumber link nya lalu berikan caption ${botPrefix}sauce_`, id, true);
        if (isMedia && isImage || isQuotedImage) {
          await client.reply(from, ind.wait(), id, true)
          const encryptMedia = isQuotedImage ? quotedMsg : message
          const mediaData = await decryptMedia(encryptMedia, uaOverride)
          try {
              const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
              console.log('Searching for source...')
              console.log('---> Image link : ' + imageLink)
              const results = await saus(imageLink)
              let teks = ''
              for (let i = 0; i < results.length; i++) {
                  if (results[i].similarity < 80) {
                      teks += `${i}.\n*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%\n*Low similarity!*\n\n`
                  } else {
                      teks += `${i}.\n*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%\n\n`
                  }
              }
              await client.reply(from, teks, id, true)
                    .then(() => console.log('Source sent! '))
          } catch (err) {
              console.error(err)
              await client.reply(from, 'Error!', id, true)
          }
        } else {
          await client.reply(from, ind.wrongFormat(), id, true)
        }
        break

      case 'waifu':
        const modes = ['sfw', 'nsfw']
        const categories = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'kill', 'slap', 'happy', 'wink', 'poke', 'dance', 'cringe', 'blush']
        const categoriesnsfw = ['waifu', 'neko', 'blowjob']
        const categoriesrand = ['waifu', 'neko', 'shinobu', 'megumin', 'happy', 'blush']
        var mode,cat;
        const random = Math.floor(Math.random() * categoriesrand.length);
        const randomnsfw = Math.floor(Math.random() * categoriesnsfw.length);
        if (modes.includes(arguments[0]) && categories.includes(arguments[1])) {client.reply(from, ind.wait() + `\n\n_Mendapatkan gambar ${arguments[0]} dengan kategori ${arguments[1]}..._`, id), true}
        if (arguments[0] === 'nsfw' && disablecommand) {
          client.reply(from, "Fitur dimatikan sementara, tobat cok ", id, true)
          await client.sendStickerfromUrl(from, 'https://i.ibb.co/8nZFsY9/ghyastobat.png')
          return 0
        }
        if (arguments.length == 0){ 
          client.reply(from, ind.wait() + `\n\n_Mendapatkan gambar random..._`, id, true)
          mode = "sfw"
          cat = "waifu"
        } else {
          mode = arguments[0]
          cat = arguments[1]
        }
        if (arguments.length == 1){
          if (arguments[0] === 'sfw'){
            client.reply(from, ind.wait() + `\n\n_Mendapatkan gambar sfw random..._`, id, true)
            mode = "sfw"
            cat = categories[random]
          } else if (arguments[0] === 'nsfw'){ 
            var i = true 
            mode = 'nsfw'
            cat = categoriesnsfw[randomnsfw]
          }
        }
        if (arguments[0] === 'help' && arguments.length == 1 && disablecommand) return await client.reply(from, ind.waifu(), id, true)
        if (arguments[0] === 'help' && arguments.length == 1) return await client.reply(from, ind.waifuex(), id, true)
        _function.weeaboo.waifu(mode, cat)
          .then(async ({ url }) => {
            console.log('Waifu image received!')
            if (i == true) {
              await client.sendText(from, `_⚠️Disclaimer⚠️_\n\nPastikan yang melihat ini berumur 18+++++++\nBot Owner tidak bertanggung jawab jika command ini disalahgunakan\n\nTerima kasih`)
            }
            await client.sendImage(from, url, `${t}_${sender.id}.jpg`, ''. id);
            //let filename = url.slice(21)
            //await _function.misc.downloadFile(url, `./media/${filename}`)
            //await client.sendImage(from, `./media/${filename}`, filename, '')
            //  .then(() => console.log('Success sending waifu!'))
            //  fs.unlink(`./media/${filename}`, (err) => {
            //    if (err) {console.log(`file delete error : ${err}`)}
            //  });
          })
            .catch(async (err) => {
              console.error(err)
              await client.reply(from, `Error!\nCoba lagi atau Lihat command ${botPrefix}waifu help`, id, true)
            })
        break
      
      //GENSIN DB
      case 'genshin':
        const gensinfunction = ['characters', 'talents', 'constellations', 'weapons', 'materials', 'artifacts', 'foods', 'domains', 'enemies', 'elements', 'rarity']
        if (arguments.length <= 1 || arguments[0] == 'help') return await client.reply(from, ind.genshindb("3.3"), id, true)
        
        let querygenshin
        let hasilpencarian = ''
        switch (arguments[0]){
          case 'chara':
          case 'character':
          case 'karakter':
            if (arguments[1] == 'ascend' || arguments[1] == 'cv' || arguments[1] == 'cost') {
              querygenshin = genshindb.characters(arguments.slice(2).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else if (arguments[1] == 'stats' || arguments[1] == 'stat') {
              querygenshin = genshindb.characters(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else {
              querygenshin = genshindb.characters(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } 

            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Karakter*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'ascend' || arguments[1] == 'cost') {
              hasilpencarian += `*Ascend Material Info*
*Name* : ${querygenshin.fullname}

*Ascend Cost*`
              for (let i = 1; i < 7; i++) {
                hasilpencarian += `\nAscend ${i} : `
                for (let j = 0; j < querygenshin.costs[`ascend${i}`].length; j++){
                  hasilpencarian += `\n  - ${querygenshin.costs[`ascend${i}`][j].count} ${querygenshin.costs[`ascend${i}`][j].name} `
                }
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'stats' || arguments[1] == 'stat') {
              let querygenshinstat = genshindb.characters(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true}).stats(parseInt(arguments[2]))
              hasilpencarian += `Base Stats Karakter Berdasarkan Level
*Name* : ${querygenshin.fullname}

*Stats*
Level : ${querygenshinstat.level}
Ascension : ${querygenshinstat.ascension}
HP : ${~~querygenshinstat.hp}
Attack : ${~~querygenshinstat.attack}
Defense : ${~~querygenshinstat.defense}
Specialized : ${querygenshinstat.specialized}
`
              await client.reply(from, hasilpencarian, id, true)
            } else {
              hasilpencarian = `_*Character Info*_
              
*Name* : ${querygenshin.fullname}
*Gender* : ${querygenshin.gender}
*Element* : ${querygenshin.element}
*Weapon Type* : ${querygenshin.weapontype}
*Substat* : ${querygenshin.substat}
*Region* : ${querygenshin.region}
*Birthday* : ${querygenshin.birthday}
*Constellation* : ${querygenshin.constellation}
*Rarity* : ${querygenshin.rarity}
`
              await client.sendFileFromUrl(from, querygenshin.images.card, 'hasilgensin.jpg', hasilpencarian, id)
            }
            break

          case 'arte':
          case 'artifact':
              querygenshin = genshindb.artifacts(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
              if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
              else if (Array.isArray(querygenshin)){
                hasilpencarian += `*Hasil Pencarian Artifact*\n\n`
                for (let i = 0; i < querygenshin.length; i++) {
                  hasilpencarian += `${i}. ${querygenshin[i]}\n`
                }
                await client.reply(from, hasilpencarian, id, true)
              } else {
                hasilpencarian = `_*Artifact Info*_
*Name* : ${querygenshin.name}
*Rarity* : ${querygenshin.rarity.toString()}
`
                querygenshin.hasOwnProperty("1pc") ? hasilpencarian += `\n*1 Piece* : ${querygenshin['1pc']}` : null
                querygenshin.hasOwnProperty("2pc") ? hasilpencarian += `\n*2 Piece* : ${querygenshin['2pc']}` : null
                querygenshin.hasOwnProperty("4pc") ? hasilpencarian += `\n*4 Piece* : ${querygenshin['4pc']}` : null

                /*
                querygenshin.hasOwnProperty("flower") ? hasilpencarian += `\n\n*Flower* \n  Name : ${querygenshin.flower.name}` : null
                querygenshin.hasOwnProperty("plume") ? hasilpencarian += `\n\n*Plume* \n  Name : ${querygenshin.plume.name}` : null
                querygenshin.hasOwnProperty("sands") ? hasilpencarian += `\n\n*Sands* \n  Name : ${querygenshin.sands.name}` : null
                querygenshin.hasOwnProperty("goblet") ? hasilpencarian += `\n\n*Goblet* \n  Name : ${querygenshin.goblet.name}` : null
                querygenshin.hasOwnProperty("circlet") ? hasilpencarian += `\n\n*Circlet* \n  Name : ${querygenshin.circlet.name}` : null
                */
                await client.reply(from, hasilpencarian, id, true)
              }
            break

          case 'domain':
            querygenshin = genshindb.domains(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true,  queryLanguages: ["English", "Indonesian"]})
            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Domain*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else {
                hasilpencarian = `*Domain Info*

*Name* : ${querygenshin.name}
*Region* : ${querygenshin.region}
*Domain Entrance* : ${querygenshin.domainentrance}
*Domain type* : ${querygenshin.domaintype}
*Recommended Elements* : ${querygenshin.recommendedelements.toString()}
${querygenshin.hasOwnProperty("daysofweek") ? `*Days open* : ${querygenshin.daysofweek.toString()}` : ''}
*Recommended Level* : ${querygenshin.recommendedlevel}

*Rewards*`
                for (let i = 0; i < querygenshin.rewardpreview.length; i++) {
                  hasilpencarian += `\n  - ${querygenshin.rewardpreview[i].hasOwnProperty("count") ? querygenshin.rewardpreview[i].count : '1'} ${querygenshin.rewardpreview[i].name}`
                }
                hasilpencarian += `\n\n*Monsters List*`
                for (let i = 0; i < querygenshin.monsterlist.length; i++) {
                  hasilpencarian += `\n  - ${querygenshin.monsterlist[i]}`
                }
                await client.reply(from, hasilpencarian, id, true)
              }
            break

          case 'weapon':
            if (arguments[1] == 'ascend' || arguments[1] == 'cost') {
              querygenshin = genshindb.weapons(arguments.slice(2).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else if (arguments[1] == 'stats' || arguments[1] == 'stat') {
              querygenshin = genshindb.weapons(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else {
              querygenshin = genshindb.weapons(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            }

            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Weapon*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'ascend' || arguments[1] == 'cost') {
              hasilpencarian += `*Ascend Material Info*
*Weapon Name* : ${querygenshin.name}

*Ascend Cost*`
              for (let i = 1; i < 7; i++) {
                if (!querygenshin.costs.hasOwnProperty(`ascend${i}`)) {break}
                hasilpencarian += `\nAscend ${i} : `
                for (let j = 0; j < querygenshin.costs[`ascend${i}`].length; j++){
                  hasilpencarian += `\n  - ${querygenshin.costs[`ascend${i}`][j].count} ${querygenshin.costs[`ascend${i}`][j].name} `
                }
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'stats' || arguments[1] == 'stat') {
              let querygenshinstat = genshindb.weapons(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true}).stats(parseInt(arguments[2]))
              hasilpencarian += `Base Stats Weapon Berdasarkan Level
*Name* : ${querygenshin.name}

*Stats*
Level : ${querygenshinstat.level}
Ascension : ${querygenshinstat.ascension}
Attack : ${~~querygenshinstat.attack}
Specialized : ${querygenshinstat.specialized}
`
              await client.reply(from, hasilpencarian, id, true)
            } else {
              let weaponeffect = ''
              querygenshin.effect.includes('{0}') ? weaponeffect = querygenshin.effect.replace('{0}', querygenshin.r1[0]) : null
              querygenshin.effect.includes('{1}') ? weaponeffect = weaponeffect.replace('{1}', querygenshin.r1[1]) : null
              querygenshin.effect.includes('{1}') ? weaponeffect = weaponeffect.replace('{2}', querygenshin.r1[2]) : null
              hasilpencarian = `_*Weapon Info*_
              
*Name* : ${querygenshin.name}
*Weapon Type* : ${querygenshin.weapontype}
*Substat* : ${querygenshin.substat}
*Sub Value* : ${querygenshin.subvalue}
*Base ATK* : ${querygenshin.baseatk}
*Rarity* : ${querygenshin.rarity}
*Weapon Effect* : ${weaponeffect == '' ? querygenshin.effect : weaponeffect}`

              
              await client.sendFileFromUrl(from, querygenshin.images.icon, 'hasilgensin.jpg', hasilpencarian, id)
            }
            break
          
          case 'talent' :
            if (arguments[2] == 'detail' || arguments[2] == 'details') {
              querygenshin = genshindb.talents(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else {
              querygenshin = genshindb.talents(arguments.slice(2).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            }

            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Character*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'ascend' || arguments[1] == 'cost') {
              hasilpencarian += `*Talent Ascend Material Info*
*Character Name* : ${querygenshin.name}

*Ascend Cost*`
              for (let i = 2; i < 11; i++) {
                if (!querygenshin.costs.hasOwnProperty(`lvl${i}`)) {break}
                hasilpencarian += `\nAscend ${i} : `
                for (let j = 0; j < querygenshin.costs[`lvl${i}`].length; j++){
                  hasilpencarian += `\n  - ${querygenshin.costs[`lvl${i}`][j].count} ${querygenshin.costs[`lvl${i}`][j].name} `
                }
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'passive') {
              hasilpencarian += `*Character Passive Talent Info*
*Character Name* : ${querygenshin.name}

*Passive Talent*`
              for (let i = 1; i < 5; i++) {
                if (!querygenshin.hasOwnProperty(`passive${i}`)) {break}
                hasilpencarian += `\nPassive ${i} : \n  - Name : ${querygenshin[`passive${i}`].name}\n  - Info : ${querygenshin[`passive${i}`].info}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'combat'){
              hasilpencarian += `*Character Combat Talent Info*
*Character Name* : ${querygenshin.name}

*Combat Talent*`
              let paramname = ''
              for (let i = 1; i < 5; i++) {
                if (!querygenshin.hasOwnProperty(`combat${i}`)) {break}
                hasilpencarian += `\n*Combat ${i}* : \n  - Name : ${querygenshin[`combat${i}`].name}\n  - Info : ${querygenshin[`passive${i}`].info}\n`

                if (arguments[2] == 'detail' || arguments[2] == 'more'){
                  hasilpencarian += `*Attributes* : `
                  for (let j = 0; j < querygenshin[`combat${i}`].attributes.labels.length; j++){
                    hasilpencarian += `\n  - Name : ${querygenshin[`combat${i}`].attributes.labels[j].split('|')[0]}`
                    hasilpencarian += `\n  - Scale : \n  `
                    paramname = querygenshin[`combat${i}`].attributes.labels[j].split('|')[1].split(':')[0].replace('{' , '')
                    for (let k = 0; k < querygenshin[`combat${i}`].attributes.parameters[`${paramname}`].length; k++){
                      hasilpencarian += `${~~((querygenshin[`combat${i}`].attributes.parameters[`${paramname}`][k])*100)}% - `
                    }
                    hasilpencarian += `\n`
                  }
                }
              }
              await client.reply(from, hasilpencarian, id, true)
            }
            break

          case 'conte':
          case 'const':
          case 'constellation' :
            querygenshin = genshindb.constellations(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true,  queryLanguages: ["English", "Indonesian"]})

            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Character*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else {
              hasilpencarian = `*Character Constellation info*
*Name* : ${querygenshin.name}

*Constellation Info*
`
              for (let i = 1; i < 7; i++) {
                hasilpencarian += `\n*Constellation ${i}* : `
                hasilpencarian += `\n  - Name : ${querygenshin[`c${i}`].name} \n  - Effect : ${querygenshin[`c${i}`].effect}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            }
            break
          
          case 'material':
            if (arguments[2] == 'more') {
              querygenshin = genshindb.materials(arguments.slice(2).join(' '), {matchNames: false, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else {
              querygenshin = genshindb.materials(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            }

            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Material*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else {
              hasilpencarian = `*Material Info*
*Name* : ${querygenshin.name}
${querygenshin.hasOwnProperty("rarity") ? `*Rarity* : ${querygenshin.rarity}` : null}
*Category* : ${querygenshin.category}
*Type* : ${querygenshin.materialtype}
${querygenshin.hasOwnProperty("dropdomain") ? `*Domain source : ${querygenshin.dropdomain}*` : null}
${querygenshin.hasOwnProperty("daysofweek") ? `*Days Available : ${querygenshin.daysofweek.toString()}*` : null}
*Source* : ${querygenshin.source.toString()}`

              await client.sendFileFromUrl(from, querygenshin.images.redirect, 'hasilgensin.jpg', hasilpencarian, id)
            }
            break
          
          case 'enemies':
          case 'enemy':
            if (arguments[2] == 'more') {
              querygenshin = genshindb.enemies(arguments.slice(2).join(' '), {matchNames: false, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else if (arguments[1] == 'stats' || arguments[1] == 'stat') {
              querygenshin = genshindb.enemies(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            } else {
              querygenshin = genshindb.enemies(arguments.slice(1).join(' '), {matchAliases: true, matchCategories: true, queryLanguages: ["English", "Indonesian"]})
            }

            if (querygenshin == undefined) return await client.reply(from, `Maaf, pencarian tidak ditemukan`, id, true)
            else if (Array.isArray(querygenshin)){
              hasilpencarian += `*Hasil Pencarian Enemies*\n\n`
              for (let i = 0; i < querygenshin.length; i++) {
                hasilpencarian += `${i}. ${querygenshin[i]}\n`
              }
              await client.reply(from, hasilpencarian, id, true)
            } else if (arguments[1] == 'stats' || arguments[1] == 'stat') {
              let querygenshinstat = genshindb.enemies(arguments.slice(3).join(' '), {matchAliases: true, matchCategories: true}).stats(parseInt(arguments[2]))
              hasilpencarian += `Base Stats Enemy Berdasarkan Level
*Name* : ${querygenshin.name}

*Stats*
Level : ${querygenshinstat.level}
HP : ${querygenshinstat.hp}
Attack : ${~~querygenshinstat.attack}
Defense : ${querygenshinstat.defense}
`
              await client.reply(from, hasilpencarian, id, true)
            } else {
              hasilpencarian = `*Enemy Info*
*Name* : ${querygenshin.name}
*Enemy type* : ${querygenshin.enemytype}
*Category* : ${querygenshin.category}
*Rewards* : `
              for (let i = 0; i < querygenshin.rewardpreview.length; i++) {
                  hasilpencarian += `\n  - ${querygenshin.rewardpreview[i].hasOwnProperty("count") ? querygenshin.rewardpreview[i].count : '1'} ${querygenshin.rewardpreview[i].name}`
                }
              await client.reply(from, hasilpencarian, id, true)
            }
            break
        }
        
      break

      /*=====================CHAT GPT SECTION================================

      case 'chatai':
        if (gptwait) return await client.reply(from, "Mohon menunggu command Chat AI sebelumnya selesai di proses...", id, true);
        gptwait = true;
        // ensure the API is properly authenticated
        try {
          let res = await aiapi.sendMessage(arguments.join(' '));
          await client.reply(from, res.text, id, true);
          gptwait = false;
        } catch (e){
          await client.reply(from, e, id, true);
          gptwait = false;
        }
      break
        */
        
    
      //=====================Torrent leecher site============================

      /*
      case 'torrent':
        if (arguments.length === 0) return await client.reply(from, ind.torrent(), id, true)
        if (arguments[0] == 'list'){
          const torrentlist = _function.torrent.list()
            .then(async ({ torrents }) => {
              let list = '-----[ *Daftar Torrent* ]-----'
              for (let i = 0; i < torrents.length; i++) {
                  list +=  `\n\n➸ *Nama*: ${torrents[i].name}\n➸ *Status*: ${torrents[i].status}\n➸ *Link Magnet*: ${torrents[i].magnetURI}\n➸ *Kecepatan*: ${torrents[i].speed}\n➸ *Ukuran*: ${torrents[i].downloaded} / ${torrents[i].total}\n➸ *Link Download*: ${torrents[i].downloadLink}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
              }
              await client.reply(from, list, id, true)
              //console.log('Success sending Torrent List info!')
            })
        } else if(arguments[0] == 'status'){
          if (arguments[1] == null) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}torrent status <link magnet>_`, id, true)
          const torrentstatus = _function.torrent.status(arguments[1]).then(async ({ status }) => {
            if (status == null) return await client.reply(from, '_⛔ Status torrent tidak ditemukan!_', id, true)
            console.log(status)
            let statusinfo = `➸ *Nama*: ${status.name}\n➸ *Status*: ${status.status}\n➸ *Link Magnet*: ${status.magnetURI}\n➸ *Kecepatan*: ${status.speed}\n➸ *Ukuran*: ${status.downloaded} / ${status.total}➸ *Link Download*: ${status.downloadLink}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
            await client.reply(from, statusinfo, id, true)
          })
        } else if(arguments[0] == 'download'){
          if (arguments[1] == null) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}torrent download <link magnet>_`, id, true)
          const torrentdownload = _function.torrent.download(arguments[1])
            .then(async ({error, errorMessage}) => {
              console.log(error)
              if (error) {
                await client.reply(from,`_Error !_\nMessage:${errorMessage}`, id, true)
              } else {
                await client.reply(from,`_Torrent berhasil ditambahkan!_`, id)         , true 
              }
            })
        } else if(arguments[0] == 'remove'){
          if (arguments[1] == null) return await client.reply(from, `_⚠️ Contoh Penggunaan Perintah : ${botPrefix}torrent remove <link magnet>_`, id, true)
          const torrentremove = _function.torrent.remove(arguments[1])
            .then(async ({error, errorMessage}) => {
              console.log(error)
              if (error) {
                await client.reply(from,`_Error !_\nMessage:${errorMessage}`, id, true)
              } else {
                await client.reply(from,`_Torrent berhasil dihapus!_`, id)       , true 
              }
            })
        } else return await client.reply(from, ind.torrent(), id, true)
        break
        */

      //debugging button
      case 'buttontest':
        await client.sendButtons(from, "Button variable passing testing", [
          {
            id: `test1 ${q}`,
            text: "Test 1"
          },{
            id: "test2",
            text: "Test 2"
          }
        ], "Button Test")
      break

      case 'forcerestartbot':
        if (!botOwner.includes(sender.id)) return await client.reply(from, ind.ownerOnly(), id, true)
        await client.sendText(from, 'Bot restarting please wait...')
        const restartdata = {
          status : true,
          from : from
        };
        let restartstring = JSON.stringify(restartdata)
        fs.writeFile("./configFiles/restartdata.json", restartstring, err => {
          if (err) {
              console.log('Error writing restart file', err)
          } else {
              console.log('Successfully wrote restart file')
          }
        })
        exec('sleep 2')
        exec("pm2 restart botwa", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          
          console.log(`stdout: ${stdout}`);
      });
      break

      case 'showlastlogs':
        if (arguments.length == 1) {
          exec(`pm2 logs --raw --out --nostream --lines ${arguments}`, (error, stdout, stderr) => {
            if (error) {
                //console.log(`error: ${error.message}`);
                client.sendText(from, `Error getting last logs!\n\n${error.message}`);
                return;
            }
            if (stderr) {
                //console.log(`stderr: ${stderr}`);
                client.sendText(from, `stderr output: \n\n${stderr}`)
                return;
            }
            //console.log(`stdout: ${stdout}`);
            client.sendText(from, stdout);
        })}
        else {
          exec("pm2 logs --raw --out --nostream", (error, stdout, stderr) => {
            if (error) {
                //console.log(`error: ${error.message}`);
                client.sendText(from, `Error getting last logs!\n\n${error.message}`);
                return;
            }
            if (stderr) {
                //console.log(`stderr: ${stderr}`);
                client.sendText(from, `stderr output: \n\n${stderr}`)
                return;
            }
            //console.log(`stdout: ${stdout}`);
            client.sendText(from, stdout);
          });
        }
        
      break

      default:
        let matching = closestMatch(command, _txt.menulist);
        client.reply(from, `Salah command, Mungkin maksud anda _*${botPrefix}${matching}*_ ?`, id, true)
        return console.debug(color('red', '➜'), color('yellow', isGroup ? '[GROUP]' : '[PERSONAL]'), `${botPrefix}${command} | ${sender.id} ${isGroup ? 'FROM ' + formattedTitle : ''}`, color('yellow', moment().format()));
    }

    return;
  } catch (err) {
    client.sendText(from, 'Syid, Client error!\n\nTolong hubungi owner beserta error log')
    client.sendText(from, `error log\n\n${err}`)
    console.log(err);
    gptwait = false;
  }
};
