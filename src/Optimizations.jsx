const space = "--space--";
const pix = "--pix--";

const removeWhiteSpace = (code) => {
	const tmpCode = code.replaceAll(/\s+/g, "");
	return tmpCode.replaceAll(space, " ");
};

const removeLastSemicolon = (code) => {
	return code.replaceAll(";}", "}");
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
	const usedIds = [];
	const tags = [];

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];

		if (line.trim().startsWith("<") && line.includes("class")) {
			const tag = line.split("<")[1].split("class")[0].trim();
			const className = (line.match(/["']([^"]+)["']/g) || [""])[0]
				.replaceAll('"', "")
				.replaceAll("'", "");
			let id = makeId(2);
			while (usedIds.includes(id)) {
				id = makeId(2);
			}
			usedIds.push(id);
			tags.push({
				tag: tag,
				className: className,
				id: id,
			});
			line = `<${tag}${space}${id}>`;
		}
		newLines.push(line);
	}

	const linesToReplace = [];

	for (let t = 0; t < tags.length; t++) {
		const tag = tags[t];
		for (let i = 0; i < newLines.length; i++) {
			const line = newLines[i];
			if (line.trim().startsWith(".") && line.endsWith("{")) {
				let className = line.split("{")[0].trim().substring(1);

				if (className.includes(":")) {
					let selector = className.split(":")[0];
					selector = className.split(selector)[1];

					if (className.includes(tag.className)) {
						linesToReplace.push({
							index: i,
							newLine: `${tag.tag}[${tag.id}]${selector} {`,
						});
					}
				} else {
					if (className.includes(tag.className)) {
						linesToReplace.push({
							index: i,
							newLine: `${tag.tag}[${tag.id}] {`,
						});
					}
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

function makeId(length) {
	var result = "";
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
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
};
