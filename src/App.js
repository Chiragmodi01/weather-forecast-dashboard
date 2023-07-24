import { useEffect } from "react";
import "./App.css";
import { useFetchData } from "./hooks/useFetchData";

function App() {

	const { isLoading, weatherData, serverError, fetchData } = useFetchData();

  useEffect(() => {
    fetchData()
  },[])

	return (
    <div className="App">
      Weather Forecast Dashboard
    </div>
  )
}

export default App;
