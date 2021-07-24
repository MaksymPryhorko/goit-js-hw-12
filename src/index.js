import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import getRefs from './get-refs'


const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputRef.addEventListener('input', debounce((e) => {
    const eventValue = e.target.value;
    fetchCountries(eventValue);
}, DEBOUNCE_DELAY));

