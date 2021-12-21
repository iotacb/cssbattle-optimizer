import React from "react";
import styled from "styled-components";

import { SETTINGS } from "../pages/Home";

function Settings(props) {
	const { dispatch, settings } = props;
	return (
		<SettingsContainer>
			<Input
				name="replaceAbsolute"
				type={SETTINGS.REPLACE_ABSOLUTE}
				text="Replace absolute with fixed"
				dispatch={dispatch}
				checked={settings.replaceAbsolute}
			/>

			<Input
				name="removePix"
				type={SETTINGS.REMOVE_PIX}
				text="Remove pixel unit"
				dispatch={dispatch}
				checked={settings.removePix}
			/>

			<Input
				name="removeLastSemi"
				type={SETTINGS.REMOVE_LAST_SEMI}
				text="Remove last semicolon"
				dispatch={dispatch}
				checked={settings.removeLastSemi}
			/>

			<Input
				name="minify"
				type={SETTINGS.MINIFY}
				text="Minify (Remove whitespace)"
				dispatch={dispatch}
				checked={settings.minify}
			/>

			<Input
				name="removeClosingTags"
				type={SETTINGS.REMOVE_CLOSING_TAGS}
				text="Remove closing tags"
				dispatch={dispatch}
				checked={settings.removeClosingTags}
			/>

			<Input
				name="replaceDivTags"
				type={SETTINGS.REMOVE_CLOSING_TAGS}
				text="Replace div with p tags"
				dispatch={dispatch}
				checked={settings.replaceDivTags}
			/>

			<Input
				name="removeLastParanthesis"
				type={SETTINGS.REMOVE_LAST_PARANTHESIS}
				text="Remove last paranthesis"
				dispatch={dispatch}
				checked={settings.removeLastParanthesis}
			/>

			<Input
				name="replaceNthChild"
				type={SETTINGS.REPLACE_NTH_CHILD}
				text="Replace nth-child selector with custom attributes"
				dispatch={dispatch}
				checked={settings.replaceNthChild}
			/>

			<Input
				name="replaceClasses"
				type={SETTINGS.REPLACE_CLASSES}
				text="Replace classes with custom attributes"
				dispatch={dispatch}
				checked={settings.replaceClasses}
			/>

			<Input
				name="compressColors"
				type={SETTINGS.COMPRESS_COLORS}
				text="Compress hexadecimal colors"
				dispatch={dispatch}
				checked={settings.compressColors}
			/>

			<Input
				name="compressFontWeights"
				type={SETTINGS.COMPRESS_FONT_WEIGHTS}
				text="Compress font weights"
				dispatch={dispatch}
				checked={settings.compressFontWeights}
			/>

			<Input
				name="stripComments"
				type={SETTINGS.STRIP_COMMENTS}
				text="Strip all comments"
				dispatch={dispatch}
				checked={settings.stripComments}
			/>

			<Input
				name="replaceNoneWithZero"
				type={SETTINGS.REPLACE_NONE_WITH_ZERO}
				text="Replace none with zero where possible"
				dispatch={dispatch}
				checked={settings.replaceNoneWithZero}
			/>
		</SettingsContainer>
	);
}

export default Settings;

const SettingsContainer = styled.div`
	width: 100%;
	height: 6rem;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	padding: 2rem;

	input {
		accent-color: var(--accent);
	}

	@media (max-width: 1060px) {
		height: auto;
	}
`;

function Input(props) {
	const { name, type, text, dispatch, checked } = props;
	return (
		<div>
			<input
				type="checkbox"
				id={name}
				name={name}
				onChange={(e) =>
					dispatch({
						type: type,
						payload: { boolean: e.target.checked },
					})
				}
				checked={checked}
			/>
			<label htmlFor={name}>{text}</label>
		</div>
	);
}
