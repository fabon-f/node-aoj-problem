# aoj-problem
get AOJ problem information

## Requirement
* Node

## Installation
`npm install aoj-problem`

## API

```js
const getAOJProblemInfo = require("aoj-problem");
```

### `getAOJProblemInfo(problemID, language)`
* `problemID` string
* `language` string - Can be `"en"` or `"ja"`

Returns Promise that resolves `problemInfo`
* `problemInfo` Object
    * `title` string - title of the problem
    * `description` string - description of the problem(HTML)

## Example
See [example.js](example.js)
