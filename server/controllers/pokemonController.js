const knex = require('knex')(require('../knexfile'));
const axios = require('axios');
const { json } = require('express');
const express = require('express');
const {uuid} = require('uuidv4');

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

exports.moveDetails = (req, res) => {
    knex('moves')
    .where({name: req.params.name})
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => 
        res.status(400).send('error retrieving list pokemon with this ID')
    );
}

exports.getDefaultPokemon =(req, res) => {
    knex('pokemonList')
    .where({id: req.params.id})
    .select('*')
    .then((data) => {
       
        const moveData = JSON.parse(data[0].moves)
        const setMoves = [moveData[Math.floor(Math.random() * (moveData.length - 0) + 0)], 
            moveData[Math.floor(Math.random() * (moveData.length - 0) + 0)], 
            moveData[Math.floor(Math.random() * (moveData.length - 0) + 0)], 
            moveData[Math.floor(Math.random() * (moveData.length - 0) + 0)]
        ]

        data[0].moves = setMoves        
        res.status(200).send(data)
    })
    .catch((err) => 
        res.status(400).send(err)
    );
}

exports.postTeam = (req, res) => {

    console.req.body

    knex('teams')
}
