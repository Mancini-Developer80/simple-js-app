// I created the array of Pokemon objects | name - height - types

let pokemonList = [
    { name: 'Arbok', height: 1.4, types: ['fairy', 'grass'] },
    { name: 'Kadabra', height: 1.5, types: ['fighting', 'psychic'] },
    { name: 'Charizard', height: 1.6, types: ['steel', 'bug'] }
];

// Iterating over each object of pokemonList array
// If height > 1.5 outputing alternative text

for (let i = 0; i < pokemonList.length; i++) {
    let name = pokemonList[i].name;
    let height = pokemonList[i].height;

    let textInside = height > 1.5 ?
        `<p>Name <span class="card-name ">: ${name}</span> (Height: ${height}) - Wow, that's big! </p>` :
        `<p>Name <span class="card-name ">: ${name}</span> (Height: ${height})</p>`;
    
    document.write(`<div class="card">${textInside}</div>`);
        
}
