const space = "--space--";
const pix = "--pix--";

let usedIds = [];

const removeWhiteSpace = (code) => {
	return code.replaceAll(/\s+/g, "");
};

const removeLastSemicolon = (code) => {
	return code.replaceAll(/;+(\s+)?}/gm, "\n}");
};

const removeLastParanthesis = (code) => {
	return code.slice(-1) === "}" ? code.slice(0, -1) : code;
};

const removePixelUnit = (code) => {
	const tempCode = code.replaceAll("px", "");
	return tempCode.replaceAll(pix, "px");
};

const replaceAbsolute = (code) => {
	return code.replaceAll("absolute", "fixed");
};

const compressColors = (code) => {
	let tmpCode = code;
	let newCode = "";
	let lines = tmpCode.split("\n");
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line.includes("rgb")) {
			let rgbCode = line.match(
				/rgb\((\s+)?\d+(,|\s)(\s+)?\d+(\s+)?(,|\s+)(\s+)?\d+(\s+)?\)/g
			);
			if (rgbCode != null) {
				// console.log(rgbCode);
				rgbCode = rgbCode[0].substring(4).slice(0, -1).replaceAll(/\s+/g, "");
				const rgbValues = rgbCode.includes(",")
					? rgbCode.split(",")
					: rgbCode.split(" ");
				console.log(rgbValues);

				const hex = rgbToHex(
					parseInt(rgbValues[0]),
					parseInt(rgbValues[1]),
					parseInt(rgbValues[2])
				);

				let tmpLine = line.split(":")[0];
				line = `${tmpLine}:${hex};`;
			}
		}
		newCode += line + "\n";
	}
	tmpCode = newCode;
	// Compresses hexadecimal colors
	// e. g. "FFFFFF" will be compressed to "FFF"
	tmpCode = tmpCode.replaceAll(/([A-Za-z0-9])\1{5}/g, "$1$1$1");

	return tmpCode;
};

const compressFontWeights = (code) => {
	let tmpCode = code;
	tmpCode = tmpCode.replaceAll(/font-weight:(\s+)?bold/g, "font-weight: 700");
	tmpCode = tmpCode.replaceAll(
		/font-weight:(\s+)?normal/g,
		"font-weight: normal"
	);
	return tmpCode;
};

const replaceNthChild = (code) => {
	const lines = code.split("\n");
	const newLines = [];
	const split = ":nth-child(";
	code = "";

	const tags = [];
	const usedIds = [];

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line.includes(split)) {
			const tag = line.split(split)[0].trim();
			const index = parseInt(line.split(split)[1].split(")")[0]);
			let id = makeId(2);
			while (usedIds.includes(id)) {
				id = makeId(2);
			}
			usedIds.push(id);
			tags.push({
				tag: tag,
				index: index,
				id: id,
			});
			line = `${tag}[${id}] {`;
		}
		newLines.push(line);
	}

	const linesToReplace = [];

	for (let t = 0; t < tags.length; t++) {
		let tag = tags[t];
		let count = 0;

		for (let i = 0; i < newLines.length; i++) {
			let line = newLines[i];
			if (line.includes(`<${tag.tag}>`)) {
				count++;
				if (count === tag.index) {
					linesToReplace.push({
						index: i,
						newLine: `<${tag.tag}${space}${tag.id}>`,
					});
				}
			}
		}
	}

	for (let i = 0; i < newLines.length; i++) {
		let line = newLines[i];
		for (let j = 0; j < linesToReplace.length; j++) {
			let newLine = linesToReplace[j];

			if (i === newLine.index) {
				line = newLine.newLine;
			}
		}

		code += line + "\n";
	}

	return code;
};

const replaceClasses = (code) => {
	const lines = code.split("\n");
	code = "";
	const newLines = [];
	const newClasses = [];

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].trim();
		if (line.includes("<") && line.includes(">") && line.includes("class=")) {
			const tag = line
				.match(/<\w+\s/g)[0]
				.substring(1)
				.trim();
			const classes = line
				.match(/class=".+"/)[0]
				.split("=")[1]
				.replaceAll("'", "")
				.replaceAll('"', "")
				.split(" ");
			const newCls = [];
			for (const c in classes) {
				const cl = classes[c];
				let id = makeId(2);
				while (usedIds.includes(id)) {
					id = makeId(2);
				}
				usedIds.push(id);
				newCls.push(id);
				newClasses.push({
					tag: tag,
					className: cl,
					id: id,
				});
			}
			const classString = newCls.join(space);
			line = `<${tag}${space}${classString}>`;
		}
		newLines.push(line);
	}
	for (let i = 0; i < newLines.length; i++) {
		let line = newLines[i].trim();
		if (line.includes(".") && line.endsWith("{")) {
			for (let c = 0; c < newClasses.length; c++) {
				const cl = newClasses[c];
				if (line.includes(cl.className)) {
					line = `${cl.tag}[${cl.id}]${space}{`;
				}
			}
		}
		code += line + "\n";
	}
	return code;
};

const removeClosingTags = (code) => {
	return code.replaceAll(/<\/\w+>/g, "");
};

const replaceDivTags = (code) => {
	return code.replaceAll("div", "p");
};

const setupShortcutProps = (code) => {
	const lines = code.split("\n");
	let newCode = "";
	const props = [
		"box-shadow",
		"border-radius",
		"border-left",
		"border-right",
		"border-top",
		"border-bottom",
		"border",
		"inset",
	];
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		for (let j = 0; j < props.length; j++) {
			const property = props[j];
			if (line.includes(property)) {
				const prop = line.trim().split(":")[0];
				let value = line.trim().split(":")[1].trim();
				value = value.replaceAll(" ", "+");
				value = value.replaceAll("+#", "#");
				value = value.replaceAll("px", pix);
				line = `${prop}: ${value}`;
			}
		}
		newCode += line + "\n";
	}
	return newCode;
};

function splitIt(text, splitter) {
	const split = text.split(splitter);
	return [split[0], split[1]];
}

const setupCalc = (code) => {
	const lines = code.split("\n");
	let newCode = "";
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line.includes("calc(")) {
			const [left, right] = splitIt(line, ":");
			let n = right.trim().replaceAll(" ", space);
			n = n.replaceAll("px", pix);
			line = `${left}: ${n}`;
		}
		newCode += line + "\n";
	}
	return newCode;
};

function cleanupCode(code) {
	usedIds = [];
	const tmpCode = code.replaceAll(space, " ");
	return tmpCode.replaceAll(pix, "px");
}

function makeId(length) {
	var result = "";
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export {
	removeWhiteSpace,
	removeLastSemicolon,
	removeLastParanthesis,
	removePixelUnit,
	removeClosingTags,
	replaceAbsolute,
	replaceNthChild,
	replaceDivTags,
	replaceClasses,
	setupShortcutProps,
	setupCalc,
	cleanupCode,
	compressColors,
	compressFontWeights,
};
