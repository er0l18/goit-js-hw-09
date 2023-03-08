export async function fetchCountries(name) {
    console.log("Fetching input:",name);
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    return response.json();
};
