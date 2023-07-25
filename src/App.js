import { useEffect } from "react";
import "./App.css";
import { useFetchData } from "./hooks/useFetchData";

import Dashboard from "./screens/Dashboard/Dashboard";

function App() {
	const { isLoading, weatherData, serverError, fetchData } = useFetchData();

	useEffect(() => {
		fetchData("Kolkata");
	}, []);

	return (
		<div className="App">
			<Dashboard
				serverError={serverError}
				weatherData={weatherData}
				isLoading={isLoading}
				fetchData={fetchData}
			/>
		</div>
	);
}

export default App;
