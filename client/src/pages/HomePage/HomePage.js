import './HomePage.scss';
import SingleMon from '../../components/singleMon/SingleMon';
import axios from 'axios';
import { useState, useEffect } from 'react';


function HomePage() {
    const [team, setTeam] = useState([]);
    // const [unfinished, setunfinished] = useState([])

    const addToTeamDefault = (id) => {

        if (team.length > 5) {
            return
        }

        axios.get(`http://localhost:8080/pokemon/${id}/default`)
        .then((res) => {
            setTeam([...team, res.data[0]]);
        })
    }

    console.log(team)



    
    const [pokeList, setPokeList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/pokemon/all`)
        .then((res) => {
            setPokeList(res.data);
        })
    }, [], pokeList)

    if (pokeList.length < 1) {
        return(
            <div>loading</div>
        )
    }



    return(
        <section className='container'>

            
            <div className='create-team'>
                <h1 className='create-team__title'>Team Name Here</h1>
                <div className='create-team'>
                    <div className='create-team-1'>mon1</div>
                    <div className='create-team-1'>mon2</div>
                    <div className='create-team-1'>mon3</div>
                    <div className='create-team-1'>mon4</div>
                    <div className='create-team-1'>mon5</div>
                    <div className='create-team-1'>mon6</div>
                </div>
                <button>Save Team</button>

            </div>
            
            <div>
                {pokeList.map((pokemon) => {
                    const { ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite } = pokemon

                    return (
                        <SingleMon
                        key={id}
                        addMon={addToTeamDefault}
                        ability1={ability1}
                        ability2={ability2}
                        attack={attack}
                        defense={defense}
                        special_attack={special_attack}
                        special_defense={special_defense}
                        speed={speed}
                        id={id}
                        name={name}
                        type1={type1}
                        type2={type2}
                        sprite={sprite}
                        />
                    )

                })}
            </div>
            
        </section>
    )
}

export default HomePage;