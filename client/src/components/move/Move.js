import './Move.scss';
import axios from 'axios';
import {useState} from 'react';


function Move({name, addMove}) {
    const [moveInfo, setMoveInfo] = useState(null)

    const [isOpen, setIsOpen] = useState(false)    // console.log(newName)

    const displayInfo = (name) =>{
        setIsOpen(!isOpen);
        
        axios.get(`http://localhost:8080/pokemon/move/${name}`)
        .then((res) => {
            setMoveInfo(res.data[0]);
        })  
    }  

    return (
        <section className='move-container'>
            <div className='move-title'>
                <p className='move-title__text'>{name}</p>
                <div className='move-title__buttons'>
                    <button className='move-title__info' onClick={() => {displayInfo(name)}}>See Move Info</button>
                    <button className='move-title__add' onClick={() => {addMove(name)}}>Add Move</button>
                </div>
               
            </div>

            <div className={`${isOpen? 'display': 'hide'}`}>
                <p>power: {moveInfo?.power}</p>
                <p>effect: {moveInfo?.effect}</p>
                <p>accuracy: {moveInfo?.accuracy}</p>
                <p>pp: {moveInfo?.power_points}</p>
                <p>priority: {moveInfo?.priority}</p>
            </div>
        </section>
    )
}

export default Move;