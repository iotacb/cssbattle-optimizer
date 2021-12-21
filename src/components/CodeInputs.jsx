import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { ACTIONS } from "../pages/Home";

import * as opt from "../Optimizations";

import Draggable from "react-draggable";

function CodeInputs(props) {
	const { dispatch, settings, minCodeWidth } = props;
	const [codeString, setCodeString] = useState("");
	const [unoptimizedCode, setUnoptimizedCode] = useState("");
	const [charLengthDefault, setCharLengthDefault] = useState(0);
	const [charLengthFormatted, setCharLengthFormatted] = useState(0);

	const defaultCodeRef = useRef();
	const styledCodeRef = useRef();

	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

	const optimize = () => {
		let tempCode = unoptimizedCode.trim();

		tempCode = opt.setupShortcutProps(tempCode);
		tempCode = opt.setupCalc(tempCode);
		if (settings.replaceNoneWithZero) {
			tempCode = opt.replaceNoneWithZero(tempCode);
		}
		if (settings.stripComments) {
			tempCode = opt.stripComments(tempCode);
		}
		if (settings.removeEmptyDeclarations) {
			tempCode = opt.removeEmptyDeclarations(tempCode);
		}
		if (settings.compressColors) {
			tempCode = opt.compressColors(tempCode);
		}
		if (settings.compressFontWeights) {
			tempCode = opt.compressFontWeights(tempCode);
		}
		if (settings.replaceNthChild) {
			tempCode = opt.replaceNthChild(tempCode);
		}
		if (settings.removeClosingTags) {
			tempCode = opt.removeClosingTags(tempCode);
		}
		if (settings.replaceDivTags) {
			tempCode = opt.replaceDivTags(tempCode);
		}
		if (settings.replaceClasses) {
			tempCode = opt.replaceClasses(tempCode);
		}
		if (settings.replaceAbsolute) {
			tempCode = opt.replaceAbsolute(tempCode);
		}
		if (settings.removeLastSemi) {
			tempCode = opt.removeLastSemicolon(tempCode);
		}
		if (settings.removeLastParanthesis) {
			tempCode = opt.removeLastParanthesis(tempCode);
		}
		if (settings.removePix) {
			tempCode = opt.removePixelUnit(tempCode);
		}
		if (settings.minify) {
			tempCode = opt.removeWhiteSpace(tempCode);
		}

		tempCode = opt.cleanupCode(tempCode);

		setCodeString(tempCode);
		setCharLengthFormatted(tempCode.length);

		dispatch({
			type: ACTIONS.SHOW,
			payload: {
				title: "Success!",
				text: `Your css has been optimized. You saved ${
					charLengthDefault - charLengthFormatted
				} characters!`,
			},
		});
	};

	const resizeCodeInputs = (e) => {
		const mouseX = e.x;
		const vw = Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		);

		let dWidth = clamp(mouseX, minCodeWidth, vw - minCodeWidth);
		let sWidth = clamp(vw - mouseX, minCodeWidth, vw - minCodeWidth);

		defaultCodeRef.current.style.width = `${
			dWidth - defaultCodeRef.current.getBoundingClientRect().left
		}px`;
		styledCodeRef.current.style.width = `${
			sWidth - (vw - styledCodeRef.current.getBoundingClientRect().right)
		}px`;
	};

	useEffect(() => {
		const vw = Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		);

		defaultCodeRef.current.style.width = `${vw / 2}px`;
		styledCodeRef.current.style.width = `${vw / 2}px`;
	}, []);

	return (
		<Container>
			<InputContainer ref={defaultCodeRef}>
				{charLengthDefault > 0 && <p>{charLengthDefault}</p>}
				<DefaultInput
					setCode={setUnoptimizedCode}
					setLength={setCharLengthDefault}
				/>
				<Button onClick={optimize}>Optimize</Button>
			</InputContainer>
			<Draggable axis="x" onDrag={resizeCodeInputs}>
				<Drag />
			</Draggable>
			<InputContainer ref={styledCodeRef}>
				{charLengthFormatted > 0 && <p>{charLengthFormatted}</p>}
				<SyntaxInput code={codeString} />
				<CopyToClipboard text={codeString}>
					<Button
						onClick={() =>
							dispatch({
								type: ACTIONS.SHOW,
								payload: {
									title: "Success!",
									text: "The optimized css has been copied to the clipboard",
								},
							})
						}
					>
						Copy to Clipboard
					</Button>
				</CopyToClipboard>
			</InputContainer>
		</Container>
	);
}

function SyntaxInput(props) {
	const { code = "" } = props;
	return (
		<SyntaxHighlighterInput language="css" style={vscDarkPlus}>
			{code}
		</SyntaxHighlighterInput>
	);
}

function DefaultInput(props) {
	const { setCode, setLength } = props;
	return (
		<DefaultInputStyle
			onChange={(e) => {
				setCode(e.target.value);
				setLength(e.target.value.length);
			}}
			placeholder="Put your css here"
		/>
	);
}

export default CodeInputs;

const Drag = styled.div`
	width: 10px;
	height: 100%;
	position: relative;
	cursor: col-resize;
	transform: none !important;

	&:hover {
		&::before {
			height: 25%;
		}
	}

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 20%;
		transform: translate(-50%, -50%);
		background: var(--highlight);
		transition: height 0.25s cubic-bezier(1, -0.6, 0, 1.65);
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100vh;

	h2 {
		user-select: none;
	}
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: relative;
	gap: 5px;

	h2 {
		margin: 0;
	}

	p {
		position: absolute;
		right: 1rem;
		opacity: 1;
		z-index: 1;
		text-align: right;
		background: var(--accent);
		border-radius: 5px;
		padding: 0.25rem;
	}
`;

const DefaultInputStyle = styled.textarea`
	background: var(--bg-light);
	color: var(--text);
	resize: none;
	margin: 0;
	height: 100%;
	padding: 0.5rem;
	border: none;
	position: relative;
	outline: none;
	transition: background 0.3s ease;
`;

const SyntaxHighlighterInput = styled(SyntaxHighlighter)`
	margin: 0 !important;
	padding: 0.5rem !important;
	min-height: 36px;
	height: 100%;
	background: var(--bg-light) !important;
`;

const Button = styled.a`
	text-decoration: none;
	color: var(--text);
	user-select: none;
	background: var(--bg-light);
	padding: 1rem 1rem;
	cursor: pointer;
	position: relative;
	transition: background 0.25s ease;
	text-shadow: 2px 2px 5px rgba(0 0 0 / 0.25);

	&:hover {
		background: var(--accent-l);
		text-shadow: 2px 2px 5px rgba(0 0 0 / 0.5);
	}
`;
