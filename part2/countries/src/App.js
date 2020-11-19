import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryListItem = ({ country, setVisibleCountry }) => {
  return (
    <p>
      {country.name}
      <button onClick={() => setVisibleCountry(country)}>show</button>
    </p>
  );
};

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let corsProxy = "https://thingproxy.freeboard.io/fetch/";
    setLoading(true);
    setWeather(null);

    axios
      .get(
        `${corsProxy}https://www.metaweather.com/api/location/search/?query=${location}`
      )
      .then(({ data }) => {
        console.log(data);
        return axios.get(
          `${corsProxy}https://www.metaweather.com/api/location/${data[0].woeid}/`
        );
      })
      .then(({ data }) => {
        setWeather(data.consolidated_weather[0]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setWeather(null);
      });
  }, [location]);

  if (!loading && !weather) return <p>Unable to load weather</p>;

  return (
    <div>
      <h2>weather in {location}</h2>

      {loading ? <p>Loading weather...</p> : null}

      {!loading ? (
        <>
          <p>
            <strong>temperature:</strong> {weather.the_temp} celsius
          </p>
          <img
            src={`https://www.metaweather.com//static/img/weather/${weather.weather_state_abbr}.svg`}
            height={"100px"}
            alt={`${weather.weather_state_name} icon`}
          />
          <p>
            <strong>wind:</strong> {weather.wind_speed.toFixed(2)} mph direction{" "}
            {weather.wind_direction_compass}
          </p>
        </>
      ) : null}
    </div>
  );
};

const CountryPage = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(({ name, iso639_2 }) => (
          <li key={iso639_2}>{name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} height={"150px"} />
      <Weather location={country.capital} />
    </div>
  );
};

const SearchResults = ({ visibleCountry, result, setVisibleCountry }) => {
  if (result.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <div>
      {result.map((country) => (
        <CountryListItem
          key={country["alpha2Code"]}
          country={country}
          setVisibleCountry={setVisibleCountry}
        />
      ))}
      {result.length === 1 ? (
        <CountryPage country={result[0]} />
      ) : (
        visibleCountry && <CountryPage country={visibleCountry} />
      )}
    </div>
  );
};

const Search = ({ countries }) => {
  const [query, setQuery] = useState("");
  const [visibleCountry, setVisibleCountry] = useState(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setVisibleCountry(null);
    if (query) {
      setResult(
        countries.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setResult([]);
    }
  }, [query, countries]);

  return (
    <div>
      find countries{" "}
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <SearchResults
        result={result}
        visibleCountry={visibleCountry}
        setVisibleCountry={setVisibleCountry}
      />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(({ data }) => setCountries(data));
  };

  useEffect(getCountries, []);

  return <Search countries={countries} />;
};

export default App;
