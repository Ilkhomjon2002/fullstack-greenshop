import React from "react";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { theme as chakraTheme } from "./chakraConfig";
// 2. Call `extendTheme` and pass your custom values

function App() {
	return (
		<ChakraProvider theme={chakraTheme}>
			<BrowserRouter>
				<Routes></Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
