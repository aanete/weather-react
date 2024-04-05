import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
	let [city, setCity] = useState("");
	let [loaded, setLoaded] = useState(false);
	let [weather, setWeather] = useState(null);

	function showWeather(response) {
		setLoaded(true);
		setWeather({
			temperature: response.data.main.temp,
			humidity: response.data.main.humidity,
			wind: response.data.wind.speed,
			description: response.data.weather[0].description,
			icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		let apiKey = `63214c4281922e3bb72fdf12dada7734`;
		let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
		axios.get(apiUrl).then(showWeather);
	}

	function updateCity(event) {
		setCity(event.target.value);
	}

	let form = (
		<form onSubmit={handleSubmit}>
			<input
				type="search"
				autoFocus={true}
				onChange={updateCity}
				placeholder="Type a city..."
			/>
			<input type="submit" name="Search" />
		</form>
	);

	if (loaded) {
		return (
			<div>
				{form}
				<ul>
					<li className="currentCity">{city}</li>
					<li>Temperature: {Math.round(weather.temperature)}°C</li>
					<li>Humidity: {weather.humidity}%</li>
					<li>Wind: {Math.round(weather.wind)} m/s</li>
					<li>Description: {weather.description}</li>
					<li>
						<img src={weather.icon} alt="weather icon" />
					</li>
				</ul>
			</div>
		);
	} else {
		return form;
	}
}
