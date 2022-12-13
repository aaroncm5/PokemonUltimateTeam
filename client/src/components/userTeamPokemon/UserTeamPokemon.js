import './UserTeamPokemon'


function UserTeamPokemon( {member} ) {

    return (
        <section className="member-container">
            <div className="member-sprite">
                <img className="member-sprite__image" src={member.sprite} alt="sprite of pokemon" /> 
            </div>
            <div className='member-basic'>
                <p className="member-basic__name">{member.name}</p>  
                <div className='member-basic__type'>
                    <p className={`member-basic__type-text ${member.type1}`} >{member.type1}</p>
                    <p className={`member-basic__type-text ${member.type2}`}>{member.type2}</p>
                </div>
            </div>
            
                <div className='member-moves'>
                    <p className='member-moves__text'>{member.move1}</p>
                    <p className='member-moves__text'>{member.move2}</p>
                    <p className='member-moves__text'>{member.move3}</p>
                    <p className='member-moves__text'>{member.move4}</p>
                </div>
        </section>
    )
}

export default UserTeamPokemon