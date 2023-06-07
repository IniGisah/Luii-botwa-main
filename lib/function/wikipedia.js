const wikijs = require("wikijs").default
const { fetchJson, fetchText } = require('../../util/fetcher')

const wiki = async (query) => {
  try {
    //let summary
    let summary = await wikijs({ apiUrl: 'https://id.wikipedia.org/w/api.php' }).page(query).then(page => page.chain().summary().image().request())
      //summary = await page.chain().summary().image().request()
      const picUrl = summary.image.original !== undefined ? summary.image.original.source : summary.image.thumbnail?.source
      const caption = `_*Judul* : ${summary.title}_\n_*Deskripsi* : ${summary.extract}_`;
      return { picUrl, caption};
      cons
    //const summary = await page.summary();
  } catch (ex) {
    return console.log("Error Wikipedia: ", ex);
  }
};

module.exports = {
  wiki,
};