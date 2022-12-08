import './HomePage.scss';
import SingleMon from '../../components/singleMon/SingleMon';
import axios from 'axios';
import { useState, useEffect } from 'react';


function HomePage() {
    const [team, setTeam] = useState([]);


    
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



    console.log(pokeList);
    return(
        <section className='container'>
            {pokeList.map((pokemon) => {
                const { ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite } = pokemon

                return (
                    <SingleMon
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
        </section>
    )
}

export default HomePage;