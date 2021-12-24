import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import Snowfall from "react-snowfall";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<Snowfall style={{ position: "fixed" }} />
	</React.StrictMode>,
	document.getElementById("root")
);
