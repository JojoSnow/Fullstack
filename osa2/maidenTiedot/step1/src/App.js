import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = (props) => {
  const {countries} = props;
  const countryNames = countries.filter(country => 
    country.name.common.toLowerCase().includes(props.filterName.toLowerCase()));

  if (props.filterName.length > 0) {
    if (countryNames.length < 10 && countryNames.length !== 1) {
      return (
        <>
          {countryNames.map(country =>
              <p key={country.name.common}>
                  {country.name.common}
              </p>
          )}
        </>
      )
    } else if (countryNames.length === 1) {
      return (
        <>
          {countryNames.map(country =>
            <>
              <h1 key={country.name.common}>      
                {country.name.common}
              </h1>

              <p key={country.capital}>capital {country.capital}</p>
              <p key={country.population}>population {country.population}</p>

              <h2>languages</h2>
                <ul key='languages'>
                  <Languages country={country} />
                </ul>

              <img key='2' src={country.flags.svg} alt='flag' width='200px' />
            </>
          )}
        </>
      )
    } else {
      return (
        <>
          <p>Too many matches, specify another filter</p>
        </>
      )
    }
  } else {
    return <></>;
  }
  
}

const Languages = (props) => {
  const {country} = props;

  const languages = Object.values(country.languages);
  
  return (
    <>
      {languages.map(language =>
        <li key={language}>{language}</li>
      )}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);
  //  console.log(countries)

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor='input'>find countries</label>
        <input name='input' value={filterName} onChange={handleFilterChange} />
      </form>
      <Countries id='3' countries={countries} filterName={filterName} />
    </div>
  );
}

export default App;
