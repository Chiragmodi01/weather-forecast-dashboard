import { useState } from "react";
import axios from "axios";

export const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [weatherData, setWeatherData] = useState({});
	const [serverError, setServerError] = useState(null);

	const fetchData = async (city) => {
		setIsLoading(true);

		const API_KEY = "8e1724f6c49204db0db08a7ddcba09de";
		const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

		setServerError(null);

		try {
			const resp = await axios.get(API_URL);
			const data = await resp?.data;
			setTimeout(() => {
				setWeatherData(data);
				setIsLoading(false);
			}, 3000);
		} catch (error) {
			setServerError(error.response.data.message);
			setIsLoading(false);
		}
	};

	return { isLoading, weatherData, serverError, fetchData };
};
