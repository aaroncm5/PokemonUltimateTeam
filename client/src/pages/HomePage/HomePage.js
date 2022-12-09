import './HomePage.scss';
import SingleMon from '../../components/singleMon/SingleMon';
import axios from 'axios';
import { useState, useEffect } from 'react';


function HomePage() {
    const [team, setTeam] = useState([]);
    const [unfinished, setunfinished] = useState(null)

    const addToTeamDefault = (id) => {
        axios.get(`http://localhost:8080/pokemon/${id}/defaultInfo`)
        .then((res) => {
            setunfinished(res.data);
        })
    }



    
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

            
            <div>
                <h1>Team Name Here</h1>
                <div>
                    <div>mon1</div>
                    <div>mon2</div>
                    <div>mon3</div>
                    <div>mon4</div>
                    <div>mon5</div>
                    <div>mon6</div>
                    <button>Save Team</button>
                </div>

            </div>
            
            <div>
                {pokeList.map((pokemon) => {
                    const { ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite } = pokemon

                    return (
                        <SingleMon
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