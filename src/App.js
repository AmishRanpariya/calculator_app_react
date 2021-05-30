import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import KeyPad from "./components/KeyPad/KeyPad";

const App = () => {
	return (
		<div className="App">
			<Header />
			<KeyPad />
		</div>
	);
};

export default App;
