import React, { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest';
import { Pie } from 'react-chartjs-2'



const Country = () => {
    const [countries, setcountries] = useState([])
    const [selectedCountry, setselectedCountry] = useState('')
    const [suggestions, setsuggestions] = useState([])
    const [country, setcountry] = useState({})

    const url = 'https://covid19.mathdro.id/api/countries';
    const fetchCountries = () => {
        fetch(url)
            .then(res => res.json())
            .then(output => {
                let array = [];
                output.countries.map((item) => {
                    return array = [...array, item]
                })
                setcountries(array)
            })

    }
    const fetchACountry = (country) => {
        const url = `https://covid19.mathdro.id/api/countries/${country}`
        console.log(url)
        fetch(url).then(res => res.json())
            .then(result => {
                setcountry(result)
            })
    }

    useEffect(() => {
        fetchCountries()
    }, [setcountries])

    // ---------------------------------------------

    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return countries.filter(country => regex.test(country.name));
    }

    function getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }


    const onChange = (event, { newValue, method }) => {
        setselectedCountry(newValue)
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setsuggestions(getSuggestions(value))
    };

    const onSuggestionsClearRequested = () => {
        setsuggestions([])
    };

    // --------------------------------------


    return (
        <div className='country'>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={(event, { suggestionValue }) => {
                    fetchACountry(suggestionValue)
                }}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    value: selectedCountry,
                    onChange: onChange,
                    type: "search",
                    placeholder: "Enter country"
                }} />
            <h2>{selectedCountry}</h2>
            <div className='country-chart' style={{ marginTop: '.5rem', padding: '.5rem 0 1.5rem 0' }}>
                {Object.entries(country).length === 0
                    ? 'Please select a country'
                    : <Pie data={{
                        labels: ['infected', 'deaths', 'recovered'],
                        datasets: [{
                            data: [country.confirmed.value, country.deaths.value, country.recovered.value],
                            backgroundColor: [
                                '#FF6384',
                                '#FB2828',
                                '#85DF77'
                            ],
                            hoverBackgroundColor: [
                                '#FF6384',
                                '#FB2828',
                                '#85DF77'
                            ]
                        }]
                    }
                    }
                        width={500}
                        height={300} />}
            </div>
        </div>
    )
}

export default Country
