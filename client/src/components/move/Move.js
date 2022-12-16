import './Move.scss';
import axios from 'axios';
import {useState} from 'react';


function Move({name, addMove}) {
    const apiUrl = process.env.react_app_api_url

    const [moveInfo, setMoveInfo] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const displayInfo = (name) =>{
        setIsOpen(!isOpen);
        
        axios.get(`${apiUrl}/pokemon/move/${name}`)
        .then((res) => {
            setMoveInfo(res.data[0]);
        })  
    }  

    return (
        <section className='move-container'>
            <div className='move-title'>
                <p className='move-title__text'>{name}</p>
                <div className='move-title__buttons'>
                    <button className='move-title__info' onClick={() => {displayInfo(name)}}></button>
                    <button className='move-title__add' onClick={() => {addMove(name)}}>Add Move</button>
                </div>
               
            </div>

            <div className={`${isOpen? 'display': 'hide'}`}>
                <div className='move-container-info'>
                    <p className='move-container-info__title'>Power:</p>
                    <p className='move-container-info__text'>{moveInfo?.power}</p>
                </div>
                <div className='move-container-info'>
                    <p className='move-container-info__title'>Type:</p>
                    <p className={`move-container-info__type ${moveInfo?.type}`}>{moveInfo?.type}</p>
                </div>
                <div className='move-container-info'>
                    <p className='move-container-info__title'>Accuracy:</p>
                    <p className='move-container-info__text'>{moveInfo?.accuracy}</p>
                </div>
                <div className='move-container-info'>
                    <p className='move-container-info__title'>PP:</p>
                    <p className='move-container-info__text'>{moveInfo?.power_points}</p>
                </div>
                <div className='move-container-info'>
                    <p className='move-container-info__title'>Priority:</p>
                    <p className='move-container-info__text'>{moveInfo?.priority}</p>
                </div>
                 <div className='effect-container'>
                    <p className='move-container-info__title'>Effect:</p>
                    <p className='move-container-info__text'>{moveInfo?.effect}</p>
                </div>
            </div>
        </section>
    )
}

export default Move;