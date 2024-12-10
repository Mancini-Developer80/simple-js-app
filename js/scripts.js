// Creating an IIFE to preserve global state
const pokemonRepository = function () {
    // array of Pokemon objects | name - height - types

    let pokemonList = [
        { name: 'Arbok', height: 1.4, types: ['fairy', 'grass'] },
        { name: 'Kadabra', height: 1.5, types: ['fighting', 'psychic'] },
        { name: 'Charizard', height: 1.6, types: ['steel', 'bug'] }
    ];
    // to run for adding new pokemon object in the list
    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            pokemon.hasOwnProperty('name') &&
            pokemon.hasOwnProperty('height') &&
            pokemon.hasOwnProperty('types')) {
            
            pokemonList.push(pokemon)
        } else {
            alert('this is not an pokemon object!!')
        }
    };
    // to run to gett all the pokemon in th List
    function getAll() {
        return pokemonList;
    };

    function filter(property, value) {
        return pokemonList.filter(pokemon => {
            if (property === 'types') {
                return pokemon[property].includes(value);
            } else {
                return pokemon[property] === value;
            }
        });
    };

    return {
        add,
        getAll,
        filter
    };
}();

// creating a variable containing all the pokemon object in a list
let pokemons = pokemonRepository.getAll()

// looping in the pokemons variable to extract values
pokemons.forEach(pokemon => {
    let textInside = pokemon.height > 1.5 ?
        `<p>Name <span class="card-name ">: ${pokemon.name}</span> (Height: ${pokemon.height}) - Wow, that's big! </p>` :
        `<p>Name <span class="card-name ">: ${pokemon.name}</span> (Height: ${pokemon.height})</p>`;

    document.write(`<div class="card">${textInside}</div>`)

});