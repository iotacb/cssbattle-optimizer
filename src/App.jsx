import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/detail/:id" element={<ProjectDetail />} />
				<Route path="*" element={<NotFound />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
