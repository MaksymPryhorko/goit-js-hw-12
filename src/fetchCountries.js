import Notiflix from 'notiflix';
import countryTpl from './country.hbs'
import countriesListTpl from './countriesList.hbs'
import getRefs from './get-refs'


export default function fetchCountries(eventValue) {
    
    if (eventValue.trim('') === '') {
        return;
    };

    const refs = getRefs();

    fetch(`https://restcountries.eu/rest/v2/name/${eventValue}?fields=name;capital;population;flag;languages`)
        .then(response => {
            if (response.ok) {
                return response.json()
            };
            return response.reject(Notiflix.Notify.failure('Oops, there is no country with that name'));
})
    .then(countries => {

        if (countries.length > 10) {
            paintMarkup(refs.countryListRef, '');
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        };

        if (countries.length > 1 && countries.length < 11) {
            paintMarkup(refs.countryInfoRef,'');
            const markupCountriesList = countries.map(countriesListTpl).join('');
            paintMarkup(refs.countryListRef, markupCountriesList)
            return;
        };

        if (countries.length === 1) {
            paintMarkup(refs.countryListRef, '');
            const markupCountry = countries.map(countryTpl).join('');
            paintMarkup(refs.countryInfoRef, markupCountry);
        };

    })
    .catch(error => {
        console.log(error)
    });

    function paintMarkup(markupLocation, markupValue) {
        return markupLocation.innerHTML = markupValue;
    };
};
