import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
	WiSunrise,
	CgArrowsExchangeAlt,
	WiSunset,
	BsThermometerHalf,
	FiSearch,
} from "../../utils/getIcons";
import Loader from "../Loader/Loader";

function Sidebar({
	toggleTempMetric,
	showTempInCelsius,
	serverError,
	isLoading,
	currWeatherDetails,
	fetchData,
}) {
	const [city, setCity] = useState("");
	const [error, setError] = useState(null);
	const updateCity = (e) => {
		setCity(e.target.value);
	};

	const fetchCityWeather = (e) => {
		e.preventDefault();
		if (city.trim() !== "") {
			fetchData(city);
		}
	};

	useEffect(() => {
		if (serverError) {
			setError(serverError);
			setCity(`Error: ${serverError}!`);
			setTimeout(() => {
				setCity("");
				setError(null);
			}, 3000);
		}
	}, [serverError]);

	const {
		status,
		clouds,
		icon,
		currCity,
		tempInCelsius,
		sunrise,
		sunset,
		tempInFahrenheit,
		windSpeed,
		windDeg,
		feelsLikeCelsius,
		feelsLikeFahrenheit,
		humidity,
	} = currWeatherDetails;

	return (
		<div className="sidebar-container">
			<form
				id={error ? "input-error" : ""}
				onSubmit={(e) => fetchCityWeather(e)}
				className="search-city-input-wrapper"
			>
				<span className="thermo-icon">
					<BsThermometerHalf size="1.7em" />
				</span>
				<input
					autoComplete="off"
					className="input-search-city"
					required
					value={city}
					onChange={(e) => updateCity(e)}
					type="text"
					name="search-city"
					placeholder="Kolkata"
				/>
				<button className="btn-search" type="submit">
					<FiSearch size="1.1em" />
				</button>
			</form>
			{isLoading ? (
				<span className="loader-wrapper">
					<Loader />
				</span>
			) : (
				<div className="temp-details-wrapper">
					<div className="main-temp-details">
						<span className="temp-text">
							{showTempInCelsius
								? `${tempInCelsius}°C`
								: `${tempInFahrenheit}°F`}
							<button className="btn-toggle-metric" onClick={toggleTempMetric}>
								<CgArrowsExchangeAlt className="toggle-icon" size="1.4em" />
							</button>
						</span>
						<span className="widget-icon">
							<img
								className="widget-icon-img"
								alt="weather-icon"
								src={`http://openweathermap.org/img/w/${icon}.png`}
								width="50"
								height="50"
							/>
						</span>
					</div>
					<div className="extra-temp-details">
						<p className="detail">
							<span className="details-key">Wind:</span>'{windDeg}° at{" "}
							{windSpeed} mph
						</p>
						<p className="detail">
							<span className="details-key">Humidity:</span>
							{humidity}%
						</p>
						<p className="detail">
							<span className="details-key">Feels like:</span>
							{showTempInCelsius
								? `${feelsLikeCelsius}°C`
								: `${feelsLikeFahrenheit}°F`}
						</p>
					</div>
					<div className="sunset-details">
						<span className="sunset-detail">
							<WiSunrise size="3.7em" />
							{`Sunrise at   ${sunrise}`}
						</span>
						<span className="sunset-detail">
							<WiSunset size="3.7em" />
							{`Sunset at  ${sunset}`}
						</span>
					</div>
					<div className="weather-report-details">
						<p className="city-name">{currCity} City</p>
						<p className="weather-report-desc">{`
As the sun rises, we're looking at ${status}, and about ${clouds}% clouds in the weather, and a pleasant breeze. Humidity remains moderate. Enjoy your day!`}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Sidebar;
