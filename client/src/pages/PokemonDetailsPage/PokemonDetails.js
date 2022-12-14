import './PokemonDetails.scss';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    RadialLinearScale,
    Filler
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Move from '../../components/move/Move';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    RadialLinearScale,
    Filler
)


function PokemonDetails() {
    const apiUrl = process.env.react_app_api_url
    const {pokeId} = useParams();
    const [currentPokemon, setCurrentPokemon] = useState({});
    const [pokemonMoveList, setPokemonMoveList] = useState([]);
    const [customMoveList, setCustomMoveList] = useState([]);
    const [team, setTeam] = useState([])
    const navigate = useNavigate();

    // check if there is a team in local storage
    useEffect(() => {
        if (sessionStorage.getItem('team') !== null) {
          const storedTeam = sessionStorage.getItem('team')
          setTeam(JSON.parse(storedTeam))
        }
    }, [])

    // grab all info from the database about pokemon selected from home page
    useEffect(() => {
        axios.get(`${apiUrl}/pokemon/${pokeId}`)
        .then(res => {
            setCurrentPokemon(res.data[0]);
            setPokemonMoveList(JSON.parse(res.data[0].moves))
        })
        .catch(error => {
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeId])

    // add a move to pokemon move list
    const addMove = (move) => {
        if (customMoveList.length > 3) {
            return
        }

        setCustomMoveList([...customMoveList, move])
    }

    // add pokemon to local storage to be displayed on home page
    const addToTeamCustom = (id, moves) => {
        if (team.length > 5) {
            return;
        }

        axios.get(`http://localhost:8080/${id}/default`)
        .then((res) => {
            const customPokemon = res.data[0];
            if (moves.length) {
                delete customPokemon.moves ;
                customPokemon.moves = moves
            }
            sessionStorage.setItem("team", JSON.stringify([...team, customPokemon]))
            navigate('/')
        })
    }

    // clear moves from the moves array
    const clearMoves = () => {
        setCustomMoveList([]);
    };

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
                    color: 'grey'
                },
                pointLabels: {
                    font: {
                        size: 15,
                        color: '#FFFFFFF'
                    }
                },
                grid: {
                    color: 'grey'
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
                <button onClick={() => {addToTeamCustom(currentPokemon.id, customMoveList)}} className='details-button__add'>+</button>
            </div>
            
            <div className='pokemon-info-container'>
                <div className='details-details'>
                    <img className='details-details__sprite' src={currentPokemon.sprite} alt="" />
                    <h1 className='details-details__name'>{currentPokemon.name}</h1>
                    <div className='details-details-type'>
                        <h3 className='details-details-type__title'>Type:</h3>
                        <div className='details-details-type__container'>
                            <h3 className={`details-details__text ${currentPokemon.type1}`}>{currentPokemon.type1}</h3>
                            <h3 className={`details-details__text ${currentPokemon.type2}`}>{currentPokemon.type2}</h3>
                        </div>
                        
                    </div>
                    <div className='details-details__ability'>
                        <h3 className='details-details__ability-title'>Ability:</h3>
                        <div className='details-details__ability-container'>
                            <h3 className='details-details__ability-text'>{currentPokemon.ability1}</h3>
                            <h3 className='details-details__ability-text'>{currentPokemon.ability2}</h3> 
                        </div>
                        
                    </div>
                    <div className='details-custom__moves'>
                        <h3 className='details-custom__moves-title'>Moves</h3>
                        <div className='details-custom__moves-list'>
                            {customMoveList.map((move) => {
                                return (
                                    <p className='details-custom__moves-list-name'>{move}</p>
                                )
                            })}
                        </div>
                        <button className='details-custom__moves-clear' onClick={() => {clearMoves()}} ></button>
                    </div>
                </div>
                <div className='details-stats'>
                    <h3 className='details-stats__title'>Stats</h3>
                    <Radar data = {data} options={options} />
                </div>
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