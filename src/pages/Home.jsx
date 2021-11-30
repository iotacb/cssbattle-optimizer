import React, { useReducer } from "react";

import styled, { keyframes } from "styled-components";
import CodeInputs from "../components/CodeInputs";

export const ACTIONS = {
	SHOW: "show",
	HIDE: "hide",
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
		visible: false,
		payload: { title: "", text: "" },
	});
	return (
		<MainContainer>
			<h1>Optimizer</h1>
			<CodeInputs dispatch={dispatch} />
			<ShowModal
				state={state}
				onClick={() => dispatch({ type: ACTIONS.HIDE })}
			/>
			<SettingsContainer>
				<h2>Settings coming soon.</h2>
			</SettingsContainer>
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

	gap: 2rem;

	padding: 2rem 4rem;

	h1:first-of-type {
		align-self: flex-start;
		font-weight: bold;
		font-size: 2.5rem;
		margin: 1rem 0;
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
	border-radius: 14px;
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

const SettingsContainer = styled.div`
	width: 100%;
	height: 100px;
	background-color: rgb(30 30 30);
	display: flex;
	justify-content: center;
	align-items: center;
`;
