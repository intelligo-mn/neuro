---
sidebar: auto
type: guide
---

# neuro.js

[![npm](https://img.shields.io/npm/v/neuro.js.svg?style=plastic)](https://www.npmjs.com/package/neuro.js)
[![npm](https://img.shields.io/npm/dt/neuro.js.svg?style=plastic)](https://www.npmjs.com/package/neuro.js)
[![GitHub license](https://img.shields.io/github/license/intelligo-systems/neuro.js.svg)](https://github.com/intelligo-systems/neuro.js/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/intelligo-systems/neuro.js.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fintelligo-systems%2Fintelligo)

## Introduction 

Machine learning for Node.js

[![NPM](https://nodei.co/npm/neuro.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/neuro.js/)

| [Installation][] | [Usage][] | [Contributors][] | [License][] |
|---|---|---|---|

## Installation

```
npm install neuro.js --save
```

## Usage

```js
'use strict';

var neuro = require('neuro.js');

var robot = new neuro.NeuralNetwork();

robot.train([
	{ input: 'I feel great about the world!', output: 'happy' },
    { input: 'The world is a terrible place!', output: 'sad' }
	]);

console.log(robot.classify('The world is a terrible place'));  // sad
```

## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CODE_OF_CONDUCT.md](.github/CODE_OF_CONDUCT.md).
<a href="https://github.com/intelligo-systems/neuro.js/graphs/contributors">Contributors</a>

## License

> Copyright (C) 2019 Intelligo Systems.  
> neuro.js is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/intelligo-systems/neuro.js/blob/master/LICENSE) file for the whole license text.)

**[⬆ back to top](#neurojs)**

[Installation]:#installation
[Usage]:#usage
[Contributors]:#contributors
[License]:#license

