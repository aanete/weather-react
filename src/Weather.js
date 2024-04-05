import React from "react";
import axios from "axios";

export default function Weather(props) {
	function handleResponse(response) {
		alert(`It is ${response.data.main.temp}℃ in ${props.city}`);
	}
	let apiKey = `63214c4281922e3bb72fdf12dada7734`;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(handleResponse);

	return <h2>Test from Weather</h2>;
}
