import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserTeam.scss';
import UserTeamPokemon from '../../components/userTeamPokemon/UserTeamPokemon'

function UserTeam( {props, deleteTeam} ) {
    const apiUrl = process.env.react_app_api_url
    const [teamName, setTeamName] = useState([])

    useEffect(() => {
        axios(`${apiUrl}/team/${props[0].team_id}`)
        .then((res) => {
            setTeamName(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (teamName.length < 1) {
        return <div>loading</div>;
    }

    return (
        <section className='teamcard'>
            <div className='teamcard-title'>
                <h1 className='teamcard-title__name'>{teamName[0].team_name}</h1>
                <button className='teamcard-title__delete' onClick={() => {deleteTeam(teamName[0].id)}}>Release Team: {teamName[0].team_name} </button>
            </div>
            
            <div className='teamcard-container'>
                {props.map((member) => {

                    return (
                        
                        <UserTeamPokemon member={member} />
                    )
                })}
            </div>
        </section>
    )
}

export default UserTeam;