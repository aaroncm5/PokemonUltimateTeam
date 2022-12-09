import './Move.scss';
import axios from 'axios';
import {useState, useEffect} from 'react';


function Move({name, url}) {
    const [moveInfo, setMoveInfo] = useState(null)

    const [isOpen, setIsOpen] = useState(false)
    // console.log(url)


    const displayInfo = () =>{
        setIsOpen(!isOpen);
        
        axios.get(url)
        .then((res) => {
            // console.log(res.data)
            setMoveInfo(res.data);
        })  
    }    

    return (
        <section className='move-container'>
            <div className='move-title'>
                <p className='move-title__text'>{name}</p>
                <div className='move-title__buttons'>
                    <button className='move-title__info' onClick={displayInfo}>See Move Info</button>
                    <button className='move-title__add'>Add Move</button>
                </div>
               
            </div>

            <div className={`${isOpen? 'display': 'hide'}`}>
                <p>{moveInfo?.name}</p>
                <p>damage type: {moveInfo?.damage_class.name}</p>
                <p>power: {moveInfo?.power}</p>
                <p>effect: {moveInfo?.effect_entries[0].short_effect}</p>
                <p>accuracy: {moveInfo?.accuracy}</p>
                <p>pp: {moveInfo?.pp}</p>
                <p>priority: {moveInfo?.priority}</p>
            </div>
        </section>
    )
}

export default Move;