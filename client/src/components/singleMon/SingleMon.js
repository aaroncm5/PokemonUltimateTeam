import './SingleMon.scss';

function SingleMon( {ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite } ) {

    return (
        <section className="pokemon-container">
            <div className="pokemon-sprite">
                <img className="pokemon-sprite__image" src={sprite} alt="sprite of pokemon" />
                <p className="pokemon-sprite__name">{name}</p>
            </div>
            
            <div className='pokemon-button'>
                <button className="pokemon-button__add">Add</button>
                <button className="pokemon-button__details">Details</button>
            </div>
            
        </section>
    )
}

export default SingleMon;