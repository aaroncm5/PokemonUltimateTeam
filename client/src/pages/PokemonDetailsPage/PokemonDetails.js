import './PokemonDetails.scss';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    RadialLinearScale
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Move from '../../components/move/Move';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    RadialLinearScale
)


function PokemonDetails() {
    const {pokeId} = useParams();
    const [currentPokemon, setCurrentPokemon] = useState({});
    const [pokemonMoveList, setPokemonMoveList] = useState([]);
    const [customMoveList, setCustomMoveList] =useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/pokemon/${pokeId}`)
        .then(res => {
            setCurrentPokemon(res.data[0]);
            setPokemonMoveList(JSON.parse(res.data[0].moves))
        })
        .catch(error => {
            console.log(error)
        })
    }, [pokeId])

    const addMove = (move) => {
        if (customMoveList.length > 3) {
            return
        }

        setCustomMoveList([...customMoveList, move])
    }

    const clearMoves = () => {
        setCustomMoveList([]);
    };

    console.log(customMoveList);

    // set data and data styles for radar chart
    const data= {
        labels: [`Hp: ${currentPokemon.hp}`,
            `Atk: ${currentPokemon.attack}`,
            `Sp_Atk: ${currentPokemon.special_attack}`, 
            `Spd: ${currentPokemon.speed}`,
            `Sp_Def: ${currentPokemon.special_defense}`, 
            `Def: ${currentPokemon.defense}`
        ],
        datasets: [{
            label: currentPokemon.name,
            data: [currentPokemon.hp, currentPokemon.attack,currentPokemon.special_attack,currentPokemon.speed,currentPokemon.special_defense,currentPokemon.defense],
            // backgroundColor: 'black',
            // borderColor: 'white',
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    }

    // set chart styles and scales for radar chart
    const options={
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'white'
                },
                pointedLabels: {
                    backdropColor: 'white'	
                },
                grid: {
                    color: 'white'
                },
                title: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 250,
                ticks: {
                   display: false
                }
            }
        }
    }

    return (
        <section className='details'>
            <div className='details-button'>
                <button className='details-button__add'>ADD TO TEAM</button>
                <button onClick={() => {clearMoves()}} className='details-button__clear'>Clear Moves</button>
            </div>
            
            
            <div className='details-details'>
                <img className='details-details__sprite' src={currentPokemon.sprite} alt="" />
                <h1 className='details-details__name'>{currentPokemon.name}</h1>
                <div className='details-details-type'>
                    <h3 className='details-details__text'>{currentPokemon.type1}</h3>
                    <h3 className='details-details__text'>{currentPokemon.type2}</h3>
                </div>
                <div className='details-details-type'>
                    <h3 className='details-details__text'>{currentPokemon.ability1}</h3>
                    <h3 className='details-details__text'>{currentPokemon.ability2}</h3>
                </div>
                <div className='details-custom__moves'>
                    {customMoveList.map((move) => {
                        return (
                            <p>{move}</p>
                        )
                    })}
                </div>
            </div>

            <div className='details-stats'>
                <Radar data = {data} options={options} />
            </div>
            <div className='details-moves'>
                <h2 className='details-moves__title'>Move List</h2>
                {pokemonMoveList.map((move) => {
                    return(
                        <Move addMove={addMove} name={move} key={move}/>
                    )
                })}
            </div>
        </section>
    )
}

export default PokemonDetails;