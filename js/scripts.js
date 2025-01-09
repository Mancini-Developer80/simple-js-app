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
            pokemon.hasOwnProperty('url')) {
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
                // console.log(pokemon);
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
        const body = document.querySelector('body');
        pokemonRepository.loadDetails(item).then(function () {
            
            const wrapper = document.createElement('div');
            const pokemonObject = document.createElement('div');
            const closeButton = document.createElement('div');
            const title = document.createElement('h1');
            const height = document.createElement('h2');
            const img = document.createElement('img');

            
            wrapper.classList.add('wrapper');
            pokemonObject.classList.add('pokemon-object');
            closeButton.classList.add('close');
            img.classList.add('pokemon-img');

            title.innerText = item.name[0].toUpperCase() + item.name.slice(1);
            height.innerText = item.height;
            closeButton.innerText = 'X';
            img.setAttribute('src', item.imageUrl);

            wrapper.appendChild(pokemonObject);
            pokemonObject.appendChild(closeButton);
            pokemonObject.appendChild(title);
            pokemonObject.appendChild(height);
            pokemonObject.appendChild(img);
            body.appendChild(wrapper);

            closeButton.addEventListener('click', () => {
                wrapper.style.display = 'none';
            })

            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('wrapper')) {
                    wrapper.style.display = 'none';
                }
                
            })

            window.addEventListener('keyup', (e) => {
                if (e.key === 'Escape') {
                    wrapper.style.display = 'none';
                };
            })


            // console.log(item);
            // console.log(item.name)
            // console.log(item.height)
            // console.log(item.url)
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


