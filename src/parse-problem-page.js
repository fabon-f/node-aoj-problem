const parseHTML = require("libxmljs").parseHtml;
const Iconv = require("iconv").Iconv;
const sjis = new Iconv("SJIS", "UTF-8");
module.exports = function parseProblemPage(body) {
    const html = sjis.convert(body).toString()
        .replace("</nobr>", "")
        .replace("SHIFT-JIS", "UTF-8")
        .replace(/<script type="text\/javascript">[\s\S]*?<\/script>/g, "")
        .replace("id=\"body\"", "id=\"body2\"")
        .replace(/<pre>([\s\S]+?)<\/pre>/g, (match, submatch) => `<pre>${submatch.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`);
    return parseHTML(html);
};
