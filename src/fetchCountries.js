export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then(
    (res) => {
      if (!res.ok) {
        return { status: res.status };
      }
      return res.json();
    },
  );
}
