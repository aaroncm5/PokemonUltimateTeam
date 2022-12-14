import './SingleMon.scss';
import {Link} from 'react-router-dom';


function SingleMon( {ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite, addMon } ) {

    return (
        <section className="pokemon-container">
            <div className="pokemon-sprite">
                <img className="pokemon-sprite__image" src={sprite} alt="sprite of pokemon" />
                <p className="pokemon-sprite__name">{name}</p>
            </div>
            
            <div className='pokemon-button'>
                <button onClick={() => {addMon(id)}} className="pokemon-button__add">Add</button>
                <Link className='details__link' to={`/details/${id}`}>
                    <button className="pokemon-button__details">Details</button>
                </Link>
                
            </div>
            
        </section>
    )
}

export default SingleMon;