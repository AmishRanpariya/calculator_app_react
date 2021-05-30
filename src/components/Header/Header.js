import React, { useEffect, useState } from "react";

import "./header.css";

const Header = () => {
	const [themeNumber, setThemeNumber] = useState(0);

	useEffect(() => {
		let storedTheme =
			localStorage.getItem("Calculator_app_react_theme_number") || 0;
		setThemeNumber(storedTheme);

		document
			.querySelector(`[data-id='${storedTheme}']`)
			.classList.add("active");

		//add event for toggle switch click
		const toggleSwitch = document.querySelector(".toggle");
		toggleSwitch.addEventListener("click", (e) => {
			const current = document.querySelector(".toggle .active");
			const next = document.querySelector(
				`[data-id='${(current.getAttribute("data-id") + 1) % 3}']`
			);
			next.classList.add("active");
			current.classList.remove("active");
			setThemeNumber((current.getAttribute("data-id") + 1) % 3);
		});
	}, []);

	useEffect(() => {
		const html = document.querySelector("html");
		html.classList.add(`theme${themeNumber}`);
		html.classList.remove(`theme${(+themeNumber + 3 - 1) % 3}`);
		localStorage.setItem("Calculator_app_react_theme_number", themeNumber);
	}, [themeNumber]);

	return (
		<div className="header">
			<h1>calc</h1>
			<div className="toggle__div">
				<span className="toggle__label">THEME</span>
				<div className="toggle">
					<div className="option" data-id="0">
						1
					</div>
					<div className="option" data-id="1">
						2
					</div>
					<div className="option" data-id="2">
						3
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
