# helloChalk
a lite version of chalk, copyed some code from https://github.com/chalk/chalk and https://github.com/Qix-/color-convert

## Install

```bash
npm install hello-chalk
```

## Usage

```js
const chalk = require('hello-chalk');

console.log(chalk.bold(chalk.bgBlack(chalk.red('Hello world!'))));

console.log(chalk.bghex('#333F60')(chalk.hex('#fff000')('Hello world again!')));

// actually the '#' can be omitted
```

these are supported styles and colors
```
  // style
	reset
	bold
	dim
	italic
	underline
	inverse
	hidden
	strikethrough

	// front color
	black
	red
	green
	yellow
	blue
	magenta
	cyan
	white
	blackBright
	redBright
	greenBright
	yellowBright
	blueBright
	magentaBright
	cyanBright
	whiteBright

	// back color
	bgBlack
	bgRed
	bgGreen
	bgYellow
	bgBlue
	bgMagenta
	bgCyan
	bgWhite
	bgBlackBright
	bgRedBright
	bgGreenBright
	bgYellowBright
	bgBlueBright
	bgMagentaBright
	bgCyanBright
	bgWhiteBright
```