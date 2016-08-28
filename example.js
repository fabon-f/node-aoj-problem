/* eslint-disable no-console */

const getAOJProblemInfo = require(".");
getAOJProblemInfo("0104", "ja").then(data => {
    data.title; // title of problem
    data.description; // description of problem(HTML)
});
