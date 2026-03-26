import { error } from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from "lodash.debounce";
import fetchCountries from "./fetchCountries";

PNotifyMobile.defaultModules &&
  PNotifyMobile.defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector(".input");
const listRef = document.querySelector(".list");
const cardContainerRef = document.querySelector(".block");

function clearUI() {
  listRef.innerHTML = "";
  cardContainerRef.innerHTML = "";
}

function renderCountryList(countries) {
  const markup = countries
    .map((country) => `<li>${country.name.common}</li>`)
    .join("");
  listRef.innerHTML = markup;
}

function renderCountryCard(country) {
  const { name, capital, population, languages, flags } = country;
  const capitalText = capital ? capital[0] : "N/A";
  const languagesText = languages ? Object.values(languages).join(", ") : "N/A";
  const flagUrl = flags ? flags.svg : "";

  const markup = `
    <div>
      <h2>${name.common}</h2>
      <p><strong>Capital:</strong> ${capitalText}</p>
      <p><strong>Population:</strong> ${population.toLocaleString()}</p>
      <p><strong>Languages:</strong> ${languagesText}</p>
      <img src="${flagUrl}" alt="Flag of ${name.common}" width="150">
    </div>
  `;
  cardContainerRef.innerHTML = markup;
}

function onSearchInput(event) {
  const searchQuery = event.target.value.trim();

  if (!searchQuery) {
    clearUI();
    return;
  }

  fetchCountries(searchQuery)
    .then((countries) => {
      clearUI();

      if (countries.status === 404 || !countries.length) {
        return;
      }

      if (countries.length > 10) {
        error({
          text: "Багато збігів,уведіть більш точну назву країни",
        });
        return;
      }

      if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
        return;
      }

      if (countries.length === 1) {
        renderCountryCard(countries[0]);
      }
    })
    .catch(() => {});
}

inputRef.addEventListener("input", debounce(onSearchInput, 500));
