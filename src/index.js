const { resolve: resolveURL } = require("url");
const request = require("request");
const iconv = require("iconv-lite");
const htmlparser = require("htmlparser2");
const {
    getText,
    getInnerHTML,
    getElementsByTagName,
    getElements: getElementsByAttribute,
    getElementsByTagType,
    removeElement
} = require("domutils");

const langToParam = lang => {
    if (lang === "ja") { return "jp"; }
    if (lang === "en") { return "en"; }
    throw new Error("Invalid language");
};

module.exports = function getAOJProblemInfo(problemID, language) {
    const problemURL = `http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=${problemID}&lang=${langToParam(language)}`;
    return new Promise((resolve, reject) => {
        request({
            url: problemURL,
            encoding: null
        }, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            const problemPage = htmlparser.parseDOM(iconv.decode(body, "shift_jis"));
            const title = getText(getElementsByTagName("title", problemPage)[0])
                .replace(/ \| Aizu Online Judge$/, "");
            const descriptionNode = getElementsByAttribute({
                class: "description"
            }, problemPage)[0];
            if (!descriptionNode) {
                reject(new Error("Problem doesn't exist"));
                return;
            }
            for (const link of getElementsByTagName("a", descriptionNode)) {
                link.attribs.href = resolveURL(problemURL, link.attribs.href);
            }
            for (const img of getElementsByTagName("img", descriptionNode)) {
                img.attribs.src = resolveURL(problemURL, img.attribs.src);
            }
            for (const comment of getElementsByTagType("comment", descriptionNode)) {
                removeElement(comment);
            }
            resolve({
                title,
                description: getInnerHTML(descriptionNode).trim()
            });
        });
    });
};
