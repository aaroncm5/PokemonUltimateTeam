const knex = require('knex')(require('../knexfile'));
const axios = require('axios');
const { json } = require('express');
const express = require('express');
const {uuid} = require('uuidv4');

exports.getAllTeams = (req, res) => {
    knex('pokemon')
    .select('*')
    .then((data) => {
        const allTeams = data
        const teamIdsWithObject = [...new Map(allTeams.map((member) => [member.team_id, member])).values()]
        const teamIds = []
        for (let i = 0; i < teamIdsWithObject.length; i++) {
            teamIds.push(teamIdsWithObject[i].team_id)
        }
        const AllTeamsArray = []
       const teamArray =  teamIds.map(id => {
            
          return allTeams.filter((element)=>{
                return element.team_id == id
            })
            
        });
        
        res.status(200).send(teamArray)

    })
    .catch((err) => 
        res.status(400).send(err)
    );
}


exports.getUserTeam = (req, res) => {
    knex('pokemon')
    .select('*')
    .from('pokemon')
    .where({user_id: req.params.userId})
    .then((data) => {
        const allTeams = data
        const teamIdsWithObject = [...new Map(allTeams.map((member) => [member.team_id, member])).values()]
        const teamIds = []
        for (let i = 0; i < teamIdsWithObject.length; i++) {
            teamIds.push(teamIdsWithObject[i].team_id)
        }
        const AllTeamsArray = []
       const teamArray =  teamIds.map(id => {
            
          return allTeams.filter((element)=>{
                return element.team_id == id
            })
            
        });
        
        res.status(200).send(teamArray)
    })
    .catch((err) => 
        res.status(400).send(err)
    );
}

exports.getTeamName = (req, res) => {
    knex('teams')
    .where({id: req.params.teamId})
    .select('*')
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => 
        res.status(400).send(err)
    );
}