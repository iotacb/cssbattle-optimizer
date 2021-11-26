import React, { useState } from "react";

import styled from "styled-components";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyToClipboard } from "react-copy-to-clipboard";

import * as opt from "../Optimizations";

function CodeInputs() {
	const [codeString, setCodeString] = useState("");
	const [unoptimizedCode, setUnoptimizedCode] = useState("");
	const optimize = () => {
		let tempCode = unoptimizedCode;

		tempCode = opt.replaceNthChild(tempCode);
		tempCode = opt.replaceDivTags(tempCode);
		tempCode = opt.removeClosingTags(tempCode);
		tempCode = opt.replaceClasses(tempCode);
		// tempCode = opt.replaceAbsolute(tempCode);
		tempCode = opt.removeWhiteSpace(tempCode);
		tempCode = opt.removeLastSemicolon(tempCode);
		tempCode = opt.removeLastParanthesis(tempCode);
		tempCode = opt.removePixelUnit(tempCode);

		setCodeString(tempCode);
	};

	const selectAllText = (e) => {
		e.target.select();
	};

	return (
		<Container>
			<Inputs>
				<InputContainer>
					<h1>Input:</h1>
					<DefaultInput onChange={(e) => setUnoptimizedCode(e.target.value)} />
					<Button onClick={optimize}>Optimize</Button>
				</InputContainer>
				<InputContainer>
					<h1>Output:</h1>
					<SyntaxInputContainer>
						<SyntaxInput code={codeString} />
					</SyntaxInputContainer>
					<CopyToClipboard text={codeString}>
						<Button>Copy to Clipboard</Button>
					</CopyToClipboard>
				</InputContainer>
			</Inputs>
		</Container>
	);
}

function SyntaxInput(props) {
	const { code = "", onClick } = props;
	return (
		<SyntaxHighlighterInput language="css" style={vscDarkPlus}>
			{code}
		</SyntaxHighlighterInput>
	);
}

export default CodeInputs;

const Container = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	width: 100%;
	height: 80vh;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 100%;
`;

const DefaultInput = styled.textarea`
	width: 100%;
	height: 100%;
	background: rgb(30, 30, 30);
	color: var(--text);
	resize: none;
	padding: 0.25rem;
	margin: 0;
`;

const SyntaxInputContainer = styled.div`
	height: 100%;
`;

const SyntaxHighlighterInput = styled(SyntaxHighlighter)`
	height: 100%;
	max-width: 800px;
	padding: 0.25rem;
`;

const Inputs = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	gap: 2rem;
`;

const Button = styled.a`
	text-decoration: none;
	color: var(--text);
	user-select: none;
	background: var(--bg-light);
	padding: 1rem 2rem;
	border-radius: 5px;
	cursor: pointer;
`;
