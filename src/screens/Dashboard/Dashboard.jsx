import React, { useMemo, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainForecast from "../../components/MainForecast/MainForecast";

function Dashboard({ isLoading, serverError, weatherData, fetchData }) {
	const [showTempInCelsius, setShowTempInCelsius] = useState(true);

	const toggleTempMetric = () => {
		setShowTempInCelsius((prev) => !prev);
	};

	const currWeatherDetails = useMemo(() => {
		if (!weatherData || Object.keys(weatherData).length === 0) {
			return {
				icon: "",
				description: "",
				city: "",
				country: "",
				status: "",
				tempInCelsius: 0,
				tempInFahrenheit: 0,
				wind: 0,
				feelsLike: 0,
				humidity: 0,
				sunrise: 0,
				sunset: 0,
			};
		}

		return {
			icon: weatherData.list[0].weather[0].icon,
			clouds: weatherData.list[0].clouds.all,
			status: weatherData.list[0].weather[0].description,
			currCity: weatherData.city.name,
			tempMin: Math.round(weatherData.list[0].main?.temp_min - 273.15),
			tempMax: Math.round(weatherData.list[0].main?.temp_max - 273.15),
			tempInCelsius: Math.round(weatherData?.list[0]?.main?.temp - 273.15),
			tempInFahrenheit: Math.round(weatherData?.list[0]?.main?.temp - 216.87),
			windSpeed: weatherData.list[0].wind.speed,
			windDeg: weatherData.list[0].wind.deg,
			feelsLikeCelsius: Math.round(
				weatherData.list[0].main.feels_like - 273.15
			),
			feelsLikeFahrenheit: Math.round(
				weatherData.list[0].main.feels_like - 216.87
			),
			humidity: weatherData.list[0].main.humidity,
			sunrise: `${new Date(weatherData.city.sunrise).getHours()}:${new Date(
				weatherData.city.sunrise
			).getMinutes()}`,
			sunset: `${new Date(weatherData.city.sunset).getHours()}:${new Date(
				weatherData.city.sunset
			).getMinutes()}`,
		};
	}, [weatherData]);

	return (
		<div className="dashboard-container">
			<Sidebar
				toggleTempMetric={toggleTempMetric}
				showTempInCelsius={showTempInCelsius}
				serverError={serverError}
				fetchData={fetchData}
				currWeatherDetails={currWeatherDetails}
				isLoading={isLoading}
			/>
			<MainForecast
				showTempInCelsius={showTempInCelsius}
				currWeatherDetails={currWeatherDetails}
				weatherData={weatherData}
				isLoading={isLoading}
			/>
		</div>
	);
}

export default Dashboard;
