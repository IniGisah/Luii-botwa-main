const { fetchJson, fetchText } = require('../../util/fetcher')

/**
 * Get tafsir mimpi with query.
 * @param {string} mimpi
 * @returns {Promise<object>}
 */
 const tafsirmimpi = (mimpi) => new Promise((resolve, reject) => {
    console.log('Getting Tafsir mimpi...')
    fetchJson(`https://api.akuari.my.id/primbon/tafsirmimpi?mimpi=${mimpi}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get ramalan jodoh with query.
 * @param {string} nama
 * @param {string} pasangan
 * @returns {Promise<object>}
 */
 const ramalanjodoh = (nama, pasangan) => new Promise((resolve, reject) => {
    console.log('Getting Ramalan jodoh...')
    fetchJson(`https://api.akuari.my.id/primbon/ramalanjodoh?nama=${nama}&pasangan=${pasangan}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get ramalan tanggal jadian with query.
 * @param {string} tanggal
 * @returns {Promise<object>}
 */
 const ramalantgljadian = (tanggal) => new Promise((resolve, reject) => {
    console.log('Getting Ramalan jodoh...')
    fetchJson(`https://api.akuari.my.id/primbon/tanggaljadian?tanggal=${tanggal}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get ramalan tanggal with query.
 * @param {string} tanggal
 * @returns {Promise<object>}
 */
 const ramalantgl = (tanggal) => new Promise((resolve, reject) => {
    console.log('Getting Ramalan tanggal...')
    fetchJson(`https://api.akuari.my.id/primbon/haribaik?tanggal=${tanggal}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get arti nama with query.
 * @param {string} nama
 * @returns {Promise<object>}
 */
 const artinama = (nama) => new Promise((resolve, reject) => {
    console.log('Getting Arti nama')
    fetchText(`https://api.akuari.my.id/primbon/artinama?nama=${nama}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get fakta unik.
 * @returns {Promise<object>}
 */
 const faktaunik = () => new Promise((resolve, reject) => {
    console.log('Getting Fakta unik...')
    fetchJson(`https://api.akuari.my.id/randomtext/faktaunik`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get latest gempa.
 * @returns {Promise<object>}
 */
 const gempa = () => new Promise((resolve, reject) => {
    console.log('Getting Gempa...')
    fetchJson(`https://api.akuari.my.id/info/gempa`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random asah otak.
 * @returns {Promise<object>}
 */
 const asahotak = () => new Promise((resolve, reject) => {
    console.log('Getting Asah otak...')
    fetchJson(`https://api.akuari.my.id/games/asahotak`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get random tebak gambar.
 * @returns {Promise<object>}
 */
 const tebakgambar = () => new Promise((resolve, reject) => {
    console.log('Getting tebak gambar...')
    fetchJson(`https://api.akuari.my.id/games/tebakgambar`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get hilih converted text.
 * @returns {Promise<object>}
 */
 const hilih = (teks) => new Promise((resolve, reject) => {
    console.log('Getting hilih...')
    fetchJson(`https://api.akuari.my.id/converter/hilih?kata=${teks}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get qrcode image from text.
 * @returns {Promise<object>}
 */
 const qrcode = (teks) => new Promise((resolve, reject) => {
    console.log('Getting qrcode...')
    fetchJson(`https://api.akuari.my.id/other/qrcode?text=${teks}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    tafsirmimpi,
    ramalanjodoh,
    ramalantgljadian,
    ramalantgl,
    artinama,
    faktaunik,
    gempa,
    asahotak,
    tebakgambar,
    hilih,
    qrcode
}