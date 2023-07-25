import React, { useMemo } from "react";
import "./MainForecast.css";
import { formateDate } from "../../utils/formateDate";
import Loader from "../Loader/Loader";

function MainForecast({
	showTempInCelsius,
	currWeatherDetails,
	weatherData,
	isLoading,
}) {
	const { formattedDate } = formateDate();

	const forecastWeatherData = useMemo(() => {
		let forecastDataArr = [];

		for (let i = 0; i < weatherData?.list?.length; i += 8) {
			forecastDataArr.push(weatherData?.list[i]);
		}

		return { forecastDataArr };
	}, [weatherData]);

	const { forecastDataArr } = forecastWeatherData;

	const { status } = currWeatherDetails;

	return (
		<div className="mainForecast-container">
			<header className="main-header">
				<p className="title-text">National Weather</p>
				<div className="header-clock">
					<p className="clock-time">{`${new Date().getHours()}:${new Date().getMinutes()}`}</p>
					<p className="clock-date">{formattedDate}</p>
				</div>
			</header>
			{isLoading ? (
				<span className="loader-wrapper">
					<Loader />
				</span>
			) : (
				<>
					<main className="main-forecast">
						<div className="weather-desc">
							<p className="main-title">Weather Forecast</p>
							<p className="desc-title">{status}</p>
						</div>
					</main>
					<div className="forecast-wrapper">
						{forecastDataArr.map((forecast, idx) => {
							const { formattedDate } = formateDate(forecast.dt_txt);
							const tempInCelsius = Math.round(forecast.main?.temp - 273.15);
							const tempInFahrenheit = Math.round(forecast.main?.temp - 216.87);
							const tempMinInCelsius = Math.round(
								forecast.main?.temp_min - 273.15
							);
							const tempMaxInCelsius = Math.round(
								forecast.main?.temp_max - 273.15
							);
							const tempMinInFahrenheit = Math.round(
								forecast.main?.temp_min - 216.87
							);
							const tempMaxInFahrenheit = Math.round(
								forecast.main?.temp_max - 216.87
							);
							const status = forecast.weather[0].description;
							const icon = forecast.weather[0].icon;
							return (
								<div key={idx} className="forecast-container">
									<div className="forecast-temp-scale">
										<span className="date-text">{formattedDate}</span>
										<span>
											high{" "}
											{showTempInCelsius
												? `${tempMaxInCelsius}°C`
												: `${tempMaxInFahrenheit}°F`}
										</span>
										<span>
											low{" "}
											{showTempInCelsius
												? `${tempMinInCelsius}°C`
												: `${tempMinInFahrenheit}°F`}
										</span>
									</div>
									<div className="forecast-temp">
										<span className="forecast-weather-icon">
											<img
												className="forecast-weather-icon-img"
												alt="weather-icon"
												src={`http://openweathermap.org/img/w/${icon}.png`}
												width="50"
												height="50"
											/>
										</span>
										<span className="temp-text">
											{showTempInCelsius
												? `${tempInCelsius}°C`
												: `${tempInFahrenheit}°F`}
										</span>
										<span className="forecast-status">{status}</span>
										<span className="status-border-bottom long"></span>
										<span className="status-border-bottom short"></span>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default MainForecast;
