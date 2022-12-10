import './TeamMember.scss';
// import {Link} from 'react-router-dom';


function TeamMember( {ability1, ability2, attack, defense, special_attack, special_defense, speed, id, name, type1, type2, sprite, moves } ) {

    return (
        <section className="member-container">
            <div className="member-sprite">
                <img className="member-sprite__image" src={sprite} alt="sprite of pokemon" />
                <p className="member-sprite__name">{name}</p>
            </div>
        </section>
    )
}

export default TeamMember;