import React, { useReducer } from "react";

import styled, { keyframes } from "styled-components";
import CodeInputs from "../components/CodeInputs";
import Settings from "../components/Settings";

export const ACTIONS = {
	SHOW: "show",
	HIDE: "hide",
};

export const SETTINGS = {
	REPLACE_ABSOLUTE: "absolute",
	REMOVE_PIX: "pix",
	REMOVE_LAST_SEMI: "semi",
	MINIFY: "minify",
	REMOVE_CLOSING_TAGS: "closing",
	REPLACE_DIV_TAGS: "div",
	REMOVE_LAST_PARANTHESIS: "paranthesis",
	REPLACE_NTH_CHILD: "nth_child",
	REPLACE_CLASSES: "classes",
	COMPRESS_COLORS: "compress_colors",
	COMPRESS_FONT_WEIGHTS: "compress_font_weights",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.HIDE:
			return { visible: false, payload: action.payload | state.payload };
		case ACTIONS.SHOW:
			return { visible: true, payload: action.payload };
		default:
			return state;
	}
}

function changeSettings(state, action) {
	switch (action.type) {
		case SETTINGS.REPLACE_ABSOLUTE:
			return { ...state, replaceAbsolute: action.payload.boolean };
		case SETTINGS.REMOVE_PIX:
			return { ...state, removePix: action.payload.boolean };
		case SETTINGS.REMOVE_LAST_SEMI:
			return { ...state, removeLastSemi: action.payload.boolean };
		case SETTINGS.MINIFY:
			return { ...state, minify: action.payload.boolean };
		case SETTINGS.REMOVE_CLOSING_TAGS:
			return { ...state, removeClosingTags: action.payload.boolean };
		case SETTINGS.REPLACE_DIV_TAGS:
			return { ...state, replaceDivTags: action.payload.boolean };
		case SETTINGS.REMOVE_LAST_PARANTHESIS:
			return { ...state, removeLastParanthesis: action.payload.boolean };
		case SETTINGS.REPLACE_NTH_CHILD:
			return { ...state, replaceNthChild: action.payload.boolean };
		case SETTINGS.REPLACE_CLASSES:
			return { ...state, replaceClasses: action.payload.boolean };
		case SETTINGS.COMPRESS_COLORS:
			return { ...state, compressColors: action.payload.boolean };
		case SETTINGS.COMPRESS_FONT_WEIGHTS:
			return { ...state, compressFontWeights: action.payload.boolean };
		default:
			return state;
	}
}

function Home() {
	const [state, dispatch] = useReducer(reducer, {
		visible: false,
		payload: { title: "", text: "" },
	});

	const [settings, dispatch2] = useReducer(changeSettings, {
		replaceAbsolute: false,
		removePix: true,
		removeLastSemi: true,
		minify: true,
		removeClosingTags: true,
		replaceDivTags: true,
		removeLastParanthesis: true,
		replaceNthChild: true,
		replaceClasses: true,
		compressColors: true,
		compressFontWeights: true,
		payload: { boolean: false },
	});
	return (
		<MainContainer>
			{/* <h1>Optimizer</h1> */}
			<CodeInputs dispatch={dispatch} settings={settings} minCodeWidth={300} />
			<ShowModal
				state={state}
				onClick={() => dispatch({ type: ACTIONS.HIDE })}
			/>
			<Settings dispatch={dispatch2} settings={settings} />

			<FooterContainer>
				<Spinner>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
						<path
							id="textcircle"
							d="M80 15.7c19.4 0 36.8 8.6 48.6 22.2 9.8 11.3 15.7 26 15.7 42.1 0 18.3-7.6 34.8-19.8 46.5-11.5 11-27.2 17.8-44.4 17.8-19.6 0-37.2-8.8-49-22.6-9.6-11.2-15.4-25.8-15.4-41.7 0-14.4 4.8-27.8 12.8-38.5C40.2 25.8 58.9 15.7 80 15.7m0-1c-20.8 0-39.8 9.5-52.3 26.2-8.5 11.4-13 24.9-13 39.1 0 15.5 5.5 30.5 15.6 42.3 12.4 14.6 30.6 23 49.7 23 16.9 0 32.9-6.4 45.1-18.1 13-12.4 20.2-29.2 20.2-47.2 0-15.7-5.6-30.9-15.9-42.7C117 22.9 99 14.7 80 14.7z"
						></path>
						<text>
							<textPath xlinkHref="#textcircle">
								<tspan>Made with love - 2021 💚 Made with love - 2021 💚</tspan>
							</textPath>
						</text>
					</svg>
				</Spinner>
			</FooterContainer>
		</MainContainer>
	);
}

export default Home;

function ShowModal(props) {
	const { state, onClick } = props;
	return (
		<ModalContainer visible={state.visible}>
			<Modal>
				<h2>{state.payload.title}</h2>
				<p>{state.payload.text}</p>
				<Button onClick={onClick}>Okay</Button>
			</Modal>
		</ModalContainer>
	);
}

const Spin = keyframes`
	from {
		transform: rotateZ(0deg);
	}
	to {
		transform: rotateZ(360deg);
	}
`;

const Spinner = styled.div`
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;

	margin: 20px;

	min-width: 100px;
	min-height: 100px;
	max-width: 100px;
	max-height: 100px;

	transform-origin: center center;
	animation: ${Spin} 20s infinite linear;
	svg {
		width: 100%;

		path {
			fill: none;
		}

		text {
			fill: var(--text);
		}
	}
`;

const FooterContainer = styled.div`
	width: 100%;
`;

const Wobble = keyframes`
	0%, 100% {
		transform: rotate(0deg) scale(1);
	}
	33% {
		transform: rotate(-5deg) scale(.95);
	}
	66% {
		transform: rotate(5deg) scale(1.05);
	}
`;

const MainContainer = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;

	padding: 2rem;

	h1:first-of-type {
		font-weight: bold;
		font-size: 2.5rem;
		margin: 2rem 0;
		position: relative;
		text-shadow: 2px 2px 5px rgba(0 0 0 / 0.25);
		user-select: none;

		&::before {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			left: -1rem;
			top: -0.5rem;
			background: var(--accent-l);
			z-index: -1;
			animation: ${Wobble} 5s ease infinite reverse;
			border-radius: 50px;
		}

		&::after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			left: 1rem;
			top: 0.5rem;
			background: var(--accent);
			z-index: -1;
			border-radius: 50px;
			animation: ${Wobble} 5s ease infinite alternate;
		}
	}
`;

const ModalContainer = styled.div`
	${(props) => `
		position: fixed;
		inset: 0;
		background: rgba(0 0 0 / .5);
		width: 100%;
		height: 100%;
		opacity: ${props.visible ? 1 : 0};
		transition: opacity .3s ease, transform .3s ease-in;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: ${props.visible ? "all" : "none"};
	`}
`;

const Modal = styled.div`
	width: 400px;
	height: 240px;
	background: var(--bg);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 1rem;
	box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
		6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
		12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
		22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
		41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
		100px 100px 80px rgba(0, 0, 0, 0.07);

	p {
		height: 60%;
		padding: 0.5rem 1rem;
	}
`;

const Button = styled.a`
	text-decoration: none;
	color: var(--text);
	user-select: none;
	background: var(--bg-light);
	padding: 1rem 2rem;
	cursor: pointer;
	position: relative;
	transition: background 0.25s ease;
	text-shadow: 2px 2px 5px rgba(0 0 0 / 0.25);

	&:hover {
		background: var(--accent-l);
		text-shadow: 2px 2px 5px rgba(0 0 0 / 0.5);
	}
`;
