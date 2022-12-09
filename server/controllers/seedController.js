const knex = require('knex')(require('../knexfile'));
const axios = require('axios');
const express = require('express');

exports.updatePokemonList = (req, res) => {
    const pokemonArray = []
    for (i=1; i<151; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        pokemonArray.push(pokemonUrl);
    }

    axios.all(pokemonArray.map((pokemon) => axios.get(pokemon)))
    .then(axios.spread((...data) => {

        const newPokemon = data.map((mons) => {
            pokemon = {
                id: mons.data.id,
                name: mons.data.name,
                hp: mons.data.stats[0].base_stat,
                attack: mons.data.stats[1].base_stat,
                defense: mons.data.stats[2].base_stat,
                special_attack: mons.data.stats[3].base_stat,
                special_defense: mons.data.stats[4].base_stat,
                speed: mons.data.stats[5].base_stat,
                ability1: mons.data.abilities[0].ability.name,
                ability2: mons.data.abilities[1]?.ability.name,
                sprite: mons.data.sprites.other.home.front_default,
                type1: mons.data.types[0].type.name,
                type2: mons.data.types[1]?.type.name
            }

            return pokemon
        }) 
        res.json(newPokemon)
    }))
}

exports.getAllMoves = (req, res) => {
    const movesArray = []
    for (i=800; i<827; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/move/${i}/`;
        movesArray.push(pokemonUrl);
    }

    axios.all(movesArray.map((move) => axios.get(move)))
    .then(axios.spread((...data) => {

        const newMoves = data.map((moves) => {
            pokemon = {
                id: moves.data.id,
                name: moves.data.name,
                power: moves.data.power,
                priority: moves.data.priority,
                power_points: moves.data.pp,
                accuracy: moves.data.accuracy,
                effect: moves.data.effect_entries[0]?.short_effect,
                type: moves.data.type.name
            }

            return pokemon
        }) 
        res.json(newMoves)
    }))
}

// exports.getDefaultInfo = (req, res) => {
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}/`)
//     .then((data) => {

//         pokemon = {
//             id: data.data.id,
//             name: data.data.name,
//             hp: data.data.stats[0].base_stat,
//             attack: data.data.stats[1].base_stat,
//             defense: data.data.stats[2].base_stat,
//             special_attack: data.data.stats[3].base_stat,
//             special_defense: data.data.stats[4].base_stat,
//             speed: data.data.stats[5].base_stat,
//             ability1: data.data.abilities[0].ability.name,
//             ability2: data.data.abilities[1]?.ability.name,
//             sprite: data.data.sprites.other.home.front_default,
//             type1: data.data.types[0].type.name,
//             type2: data.data.types[1]?.type.name,
//             moves: [data.data.moves[0].move.url,
//             data.data.moves[1]?.move.url,
//             data.data.moves[2]?.move.url,
//             data.data.moves[3]?.move.url]
//         }

//         res.json(pokemon)
//     })
// }

exports.getPokemonWithMoves = (req, res) => {
    const pokemonArray = []
    for (i=130; i<151; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        pokemonArray.push(pokemonUrl);
    }

    axios.all(pokemonArray.map((pokemon) => axios.get(pokemon)))
    .then(axios.spread((...data) => {

        const newPokemon = data.map((mons) => {

            const learnedMoves = []
            const pokeMoves = mons.data.moves.map((move) => {
                learnedMoves.push(move.move.name)
            })

            pokemon = {
                id: mons.data.id,
                name: mons.data.name,
                hp: mons.data.stats[0].base_stat,
                attack: mons.data.stats[1].base_stat,
                defense: mons.data.stats[2].base_stat,
                special_attack: mons.data.stats[3].base_stat,
                special_defense: mons.data.stats[4].base_stat,
                speed: mons.data.stats[5].base_stat,
                ability1: mons.data.abilities[0].ability.name,
                ability2: mons.data.abilities[1]?.ability.name,
                sprite: mons.data.sprites.other.home.front_default,
                type1: mons.data.types[0].type.name,
                type2: mons.data.types[1]?.type.name,
                moves: JSON.stringify(learnedMoves)
                
            }

            return pokemon
        }) 
        res.json(newPokemon)
    }))
}