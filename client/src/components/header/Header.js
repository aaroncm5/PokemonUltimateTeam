import logo from '../../assets/Logo/Logo.png';
import {Link} from 'react-router-dom';
import './Header.scss'

function Header() {

    return (
        <header className='header'>
            <div className='header-logo'>
                <a className='header-logo__icon' href="/">
                    <img className='header-logo__icon-image' src={logo} alt="/" />
                </a>
                
            </div>
            <nav className='nav'>
                <ul className='nav-list'>
                    <Link to='/'>Home</Link>
                    <Link to='/'>login/Signup</Link>
                    <Link to='/'>Community</Link>
                    <Link to='/'>FAQ</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;


