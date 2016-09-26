/* eslint-disable no-console */

const getAOJProblemInfo = require(".");

// http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=0104
getAOJProblemInfo("0104", "en").then(data => {
    console.log(data.title);
    // Magical Tiles

    console.log(data.description);
    // <h1>Magical Tiles</h1>
    // <p>
    // There is a magic room in a homestead. The room is paved with H &times W tiles. There are five different tiles:
    // </p> etc...
}).catch(error => console.error(error));
