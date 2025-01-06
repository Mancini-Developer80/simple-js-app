// Creating an IIFE to preserve global state
const pokemonRepository = function () {
    // array of Pokemon objects | name - height - types
    let pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    // to run for adding new pokemon object in the list

    function showLoadingMessage() {
        const loadingMessage = document.createElement('div');
        loadingMessage.id = 'loadingMessage';
        loadingMessage.innerText = 'Loading...';
        document.body.appendChild(loadingMessage);
    }
    
    function hideLoadingMessage() {
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) {
            document.body.removeChild(loadingMessage);
        }
    }

    

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            pokemon.hasOwnProperty('name') &&
            pokemon.hasOwnProperty('url')) // &&
            // pokemon.hasOwnProperty('types')) { 
            {
            pokemonList.push(pokemon)
        } else {
            alert('this is not an pokemon object!!')
        }
    };

    function LoadList() {
        showLoadingMessage()
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name : item.name,
                    url: item.url,
                };
                console.log(pokemon);
                add(pokemon);
            });
            hideLoadingMessage()
        }).catch(function (e) {
            console.error(e)
            hideLoadingMessage()
        })
    };

    function loadDetails(item) {
        showLoadingMessage()
        let url = item.url;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // adding details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage()
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage()
        })
    }

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
        const pokemonUrl = document.createElement('h3');
        const button = document.createElement('button');

        button.addEventListener('click', function () {
			showDetails(pokemon);
		})

        button.innerText = "Click Here";
        pokemonName.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        pokemonUrl.innerText = pokemon.url;
        button.classList.add('btn');

        pokemonItem.appendChild(pokemonName);
        pokemonList.appendChild(pokemonItem)
        pokemonContainer.appendChild(pokemonItem).appendChild(button);

    };

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item)
        });
        
    }

    return {
        add,
        getAll,
        filter,
        addListItem,
        LoadList,
        loadDetails,
        showDetails
    };
}();

// creating a variable containing all the pokemon object in a list
// outputing the Pokemon list running addLIstItem in forEach

pokemonRepository.LoadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});


