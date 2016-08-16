const url = require("url");
const request = require("request");
const parseProblemPage = require("./parse-problem-page");
module.exports = function getAOJProblemInfo(problemID) {
    const problemURL = `http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=${problemID}`;
    return new Promise((resolve, reject) => {
        request({
            url: problemURL,
            encoding: null
        }, (error, response, body) => {
            if (error) { reject(error); }
            const problemPage = parseProblemPage(body);
            for (const link of problemPage.find("//div[@class = \"description\"]//a")) {
                const hrefAttribute = link.attr("href");
                hrefAttribute.value(url.resolve(problemURL, hrefAttribute.value()));
            }
            for (const img of problemPage.find("//div[@class = \"description\"]//img")) {
                const srcAttribute = img.attr("src");
                srcAttribute.value(url.resolve(problemURL, srcAttribute.value()));
            }
            for (const comment of problemPage.find("//div[@class = \"description\"]//comment()")) {
                comment.remove();
            }
            const description = problemPage.get("//div[@class = \"description\"]");
            resolve(description.childNodes().map(childNode => childNode.toString()).join("").trim());
        });
    });
};
