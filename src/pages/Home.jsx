import React from "react";

import styled from "styled-components";
import CodeInputs from "../components/CodeInputs";

function Home() {
	return (
		<MainContainer>
			<h1>Optimizer</h1>
			<CodeInputs />
		</MainContainer>
	);
}

export default Home;

const MainContainer = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;

	padding: 2rem 4rem;
`;
