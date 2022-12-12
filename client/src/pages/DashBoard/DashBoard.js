import './DashBoard.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);

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
            })
            .catch((error) => {
                console.log(error);
                setFailedAuth(true);
            });
    }, []);


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
            <h1 className="dashboard__title">
                Dashboard
            </h1>

            <p>Welcome back, {user.user_name}</p>

            <h2>My Profile</h2>
            <p>Email: {user.user_email}</p>
            <p>Name: {user.user_name}</p>
            <p>userNmae: {user.user_username}</p>

            <button className="dashboard__logout" onClick={handleLogout}>
                Log out
            </button>
        </main>
    );
}

export default Dashboard;
