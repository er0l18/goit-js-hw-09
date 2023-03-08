//import ('./css/styles.css'); //added to index.html
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector("ul.country-list");

searchBox.addEventListener("keyup", async () => {
  const val = searchBox.value;
  const delay = ms => new Promise(res => setTimeout(res,ms));
  await delay(DEBOUNCE_DELAY);
  if (searchBox.value != val) {
    console.log("User is typing:",val);
  } else {
      if (searchBox.value.trim() !== "") {
        try {
        const countries = await fetchCountries(searchBox.value.trim());
        renderCountriesList(countries);
        } catch (error) {
        console.log(error.message);
        }
    } else {
      console.log("Input error!");
      countryList.innerHTML = "";
    }
  }
});

  function renderCountriesList(elements) {
    if (elements.status == 404) {
      countryList.innerHTML = "Oops, there is no country with that name!";
    } else if (elements.length >= 10) {
      console.log(`Too many matches found!\n${elements.length} hits!`);
      countryList.innerHTML = "Too many matches found. Please enter a more specific name.";
    } else if (elements.length >= 2) {
    const markup = elements
      .map(
        (element) => `<li class="countries">
          <p onclick="onClick(this)" class="clickable">${element.flag} <b>${element.name.official}</b> (${element.name.common})</p>
        </li>`
      )
      .join("");
      countryList.innerHTML = markup;
    } else {
      const markup = elements
      .map(
        (element) => `<li class="details">
          <p id="title">${element.flag} <b>${element.name.official}</b> (${element.name.common})</p>
          <p><b>Capital</b>: ${element.capital}</p>
          <p><b>Population</b>: ${element.population}</p>
          <p><b>Languages</b>: ${Object.values(element.languages).join(", ")}</p>
        </li>`
      )
      .join("");
      countryList.innerHTML = markup;
    }
  };