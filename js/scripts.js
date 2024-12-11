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
    // to run to get all the pokemon in the List
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

    function addListItem(pokemon) {
        const pokemonContainer = document.querySelector('.pokemon-app');
        const pokemonList = document.createElement('ul');
        const pokemonItem = document.createElement('li');
        const pokemonName = document.createElement('h2');
        const pokemonHeight = document.createElement('h3');
        const button = document.createElement('button');

        button.addEventListener('click', function () {
			showDetails(pokemon);
		})

        button.innerText = "Click Here";
        pokemonName.innerText = pokemon.name;
        pokemonHeight.innerText = pokemon.height;
        button.classList.add('btn');

        pokemonItem.appendChild(pokemonName).appendChild(pokemonHeight);
        pokemonList.appendChild(pokemonItem)
        pokemonContainer.appendChild(pokemonItem).appendChild(button);

    };

    function showDetails(pokemon) {
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Types: ${pokemon.types.join(', ') }`);
        
    }

    return {
        add,
        getAll,
        filter,
        addListItem
    };
}();

// creating a variable containing all the pokemon object in a list
// outputing the Pokemon list running addLIstItem in forEach 
let pokemons = pokemonRepository.getAll().forEach(pokemonRepository.addListItem);

