const parseHTML = require("libxmljs").parseHtml;
const Iconv = require("iconv").Iconv;
const sjis = new Iconv("SJIS", "UTF-8");
module.exports = function parseProblemPage(body) {
    const html = sjis.convert(body).toString().replace("</nobr>", "").replace("SHIFT-JIS", "UTF-8").replace(/<script type="text\/javascript">[\s\S]*?<\/script>/g, "").replace("id=\"body\"", "id=\"body2\"");
    return parseHTML(html);
};
