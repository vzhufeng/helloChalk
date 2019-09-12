// copy from https://github.com/Qix-/color-convert
function hex2rgb(args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString
			.split("")
			.map(char => {
				return char + char;
			})
			.join("");
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xff;
	const g = (integer >> 8) & 0xff;
	const b = integer & 0xff;

	return [r, g, b];
}

// copy from https://github.com/Qix-/color-convert
function rgb2ansi256(args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi =
		16 +
		36 * Math.round((r / 255) * 5) +
		6 * Math.round((g / 255) * 5) +
		Math.round((b / 255) * 5);

	return ansi;
}

// copy from https://github.com/chalk/chalk
const styleMap = {
	// style
	reset: [0, 0],
	bold: [1, 22],
	dim: [2, 22],
	italic: [3, 23],
	underline: [4, 24],
	inverse: [7, 27],
	hidden: [8, 28],
	strikethrough: [9, 29],

	// front color
	black: [30, 39],
	red: [31, 39],
	green: [32, 39],
	yellow: [33, 39],
	blue: [34, 39],
	magenta: [35, 39],
	cyan: [36, 39],
	white: [37, 39],
	blackBright: [90, 39],
	redBright: [91, 39],
	greenBright: [92, 39],
	yellowBright: [93, 39],
	blueBright: [94, 39],
	magentaBright: [95, 39],
	cyanBright: [96, 39],
	whiteBright: [97, 39],

	// back color
	bgBlack: [40, 49],
	bgRed: [41, 49],
	bgGreen: [42, 49],
	bgYellow: [43, 49],
	bgBlue: [44, 49],
	bgMagenta: [45, 49],
	bgCyan: [46, 49],
	bgWhite: [47, 49],
	bgBlackBright: [100, 49],
	bgRedBright: [101, 49],
	bgGreenBright: [102, 49],
	bgYellowBright: [103, 49],
	bgBlueBright: [104, 49],
	bgMagentaBright: [105, 49],
	bgCyanBright: [106, 49],
	bgWhiteBright: [107, 49]
};

// write by myself
function Chalk() {}

Chalk.prototype.hex = function(hex) {
	return function(content) {
		return `\u001B[38;5;${rgb2ansi256(hex2rgb(hex))}m${content}\u001B[39m`;
	};
};

Chalk.prototype.bghex = function(hex) {
	return function(content) {
		return `\u001B[48;5;${rgb2ansi256(hex2rgb(hex))}m${content}\u001B[49m`;
	};
};

const styleName = Object.keys(styleMap);
for(let i=0, len=styleName.length; i<len; i++){
  Chalk.prototype[styleName[i]] = function(content) {
    return `\u001B[${styleMap[styleName[i]][0]}m${content}\u001B[${styleMap[styleName[i]][1]}m`;
  };
}

module.exports = new Chalk();
