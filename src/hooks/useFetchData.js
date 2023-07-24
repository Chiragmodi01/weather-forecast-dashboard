import { useState } from "react";
import axios from "axios";

export const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [weatherData, setWeatherData] = useState({});
	const [serverError, setServerError] = useState(null);

    const API_KEY = '8e1724f6c49204db0db08a7ddcba09de';
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Kolkata&appid=${API_KEY}`;

	const fetchData = async () => {
		setIsLoading(true);
		setServerError(null);

		try {
            const resp = await axios.get(API_URL);
			const data = await resp?.data;
            console.log(data);
			setWeatherData({
                icon: data.weather[0].icon,
                location: data.name,
                status: data.weather[0].description,
                temp: Math.round(resp.data.main.temp - 273.15),
                wind: data.wind.speed,
                feelsLike: Math.round(resp.data.main.feels_like - 273.15),
                humidity: data.main.humidity,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
            })
			setIsLoading(false);
		} catch (error) {
			setServerError(error);
			setIsLoading(false);
		}
	};


	return { isLoading, weatherData, serverError, fetchData };
};
