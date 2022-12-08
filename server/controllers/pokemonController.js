const knex = require('knex')(require('../knexfile'));
const axios = require('axios');
const express = require('express');

const updatePokemonList = () => {
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

exports.getAllPokemon = (req, res) => {
    knex('pokemonList')
    .select('*')
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => 
        res.status(400).send('error retrieving list pf pokemon')
    );

}

exports.getIndividualPokemon = (req, res) => {
    knex('pokemonList')
    .where({id: req.params.id})
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => 
        res.status(400).send('error retrieving list pokemon with this ID')
    );
}

exports.getPokemonMoves = (req, res) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}/`)
    .then((data) => {
        moveArray = data.data.moves

        const moveList = moveArray.map((move) => {
            moveObj = {
                name: move.move.name,
                url: move.move.url
            }

            return moveObj
        })

        res.json(moveList)
    })
}