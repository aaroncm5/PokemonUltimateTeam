import './DashBoard.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserTeam from '../../components/userTeam/UserTeam'

function Dashboard() {
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [userTeams, setUserTeams] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return setFailedAuth(true);
        }

        // get user info from database
        axios.get('http://localhost:8080/users/current', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setUser(response.data);
            sessionStorage.setItem('userId', response.data.id)
            return axios.get(`http://localhost:8080/team/user/${response.data.id}`)
        })
        .then((res) => {
            setUserTeams(res.data)
        })
        .catch((error) => {
            console.log(error);
            setFailedAuth(true);
        });
    }, []);

    const deleteTeam = (id) => {
        axios.delete(`http://localhost:8080/team/${id}`)
        .then(() => {
            const userId = sessionStorage.getItem('userId')
            return axios.get(`http://localhost:8080/user/${userId}`)
        })
        .then ((res) => {
            setUserTeams(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }



    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        setUser(null);
        setFailedAuth(true);
    };

    if (failedAuth) {
        return (
            <main className="dashboard">
                <p>You must be logged in to see this page.</p>
                <p><Link to="/login">Log in</Link></p>
            </main>
        );
    }

    if (user === null) {
        return (
            <main className="dashboard">
                <p>Loading...</p>
            </main>
        );
    }


    return (
        <main className="dashboard">
            <div className='dashboard-container'>
                <h1 className='dashboard-container__title'>Profile</h1>
                <div className='dashboard-container__info'>
                    <p className='dashboard-container__info-text'>Government Name:   {user.user_name}</p>
                    <p className='dashboard-container__info-text'>Trainer Name:   {user.user_username}</p>
                </div>
                

                <button className="dashboard__button" onClick={handleLogout}>
                    Log out
                </button>
            </div>

            <section className='dashboard-teams'>
                {userTeams.map((team) => {

                    return(
                        <div>
                            <UserTeam props={team} deleteTeam={deleteTeam}/>
                        </div>
                    )
                })}
                

            </section>
            
        </main>
    );
}

export default Dashboard;
