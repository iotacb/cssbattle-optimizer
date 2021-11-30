import React, { useState } from "react";

import styled from "styled-components";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { ACTIONS } from "../pages/Home";

import * as opt from "../Optimizations";

function CodeInputs(props) {
	const { dispatch } = props;
	const [codeString, setCodeString] = useState("");
	const [unoptimizedCode, setUnoptimizedCode] = useState("");
	const optimize = () => {
		let tempCode = unoptimizedCode;

		tempCode = opt.setupShortcutProps(tempCode);
		tempCode = opt.setupCalc(tempCode);
		tempCode = opt.replaceNthChild(tempCode);
		tempCode = opt.removeClosingTags(tempCode);
		tempCode = opt.replaceDivTags(tempCode);
		tempCode = opt.replaceClasses(tempCode);
		// tempCode = opt.replaceAbsolute(tempCode);
		tempCode = opt.removeWhiteSpace(tempCode);
		tempCode = opt.removeLastSemicolon(tempCode);
		tempCode = opt.removeLastParanthesis(tempCode);
		tempCode = opt.removePixelUnit(tempCode);

		setCodeString(tempCode);

		dispatch({
			type: ACTIONS.SHOW,
			payload: { title: "Success!", text: "Your css has been optimized." },
		});
	};

	return (
		<Container>
			<InputContainer>
				<h2>Input:</h2>
				<DefaultInput
					onChange={(e) => setUnoptimizedCode(e.target.value)}
					placeholder="Put your css here"
				/>
				<Button onClick={optimize}>Optimize</Button>
			</InputContainer>
			<InputContainer>
				<h2>Output:</h2>
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

export default CodeInputs;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 2rem;
	width: 100%;
	height: 80vh;

	h2 {
		user-select: none;
	}
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: 100%;
`;

const DefaultInput = styled.textarea`
	background: rgb(30, 30, 30);
	color: var(--text);
	resize: none;
	margin: 0;
	height: 100%;
	flex-grow: 0;
	padding: 0.5rem;
	border: none;
	position: relative;

	&:hover,
	&:focus-within {
		outline: none;
	}

	&:focus-within {
		box-shadow: 0 0 2rem -0.5rem var(--accent-l);
	}
`;

const SyntaxHighlighterInput = styled(SyntaxHighlighter)`
	margin: 0 !important;
	padding: 0 !important;
	min-height: 36px;
	width: 100%;
	height: 100%;
`;

const Button = styled.a`
	text-decoration: none;
	color: var(--text);
	user-select: none;
	background: var(--bg-light);
	padding: 1rem 2rem;
	border-radius: 5px;
	cursor: pointer;
	position: relative;
	transition: background 0.25s ease;
	text-shadow: 2px 2px 5px rgba(0 0 0 / 0.25);

	&:hover {
		background: var(--accent-l);
		text-shadow: 2px 2px 5px rgba(0 0 0 / 0.5);
	}
`;
