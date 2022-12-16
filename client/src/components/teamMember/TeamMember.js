import './TeamMember.scss';


function TeamMember( {ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite, moves } ) {

    return (
        <section className="member-container">
            <div className="member-sprite">
                <img className="member-sprite__image" src={sprite} alt="sprite of pokemon" /> 
            </div>
            <div className='member-basic'>
                <p className="member-basic__name">{name}</p>  
                <div className='member-basic__type'>
                    <p className={`member-basic__type-text ${type1}`} >{type1}</p>
                    <p className={`member-basic__type-text ${type2}`}>{type2}</p>
                </div>
            </div>
            
                <div className='member-moves'>
                    <p className='member-moves__text'>{moves[0]}</p>
                    <p className='member-moves__text'>{moves[1]}</p>
                    <p className='member-moves__text'>{moves[2]}</p>
                    <p className='member-moves__text'>{moves[3]}</p>
                </div>
        </section>
    )
}

export default TeamMember;