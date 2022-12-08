import logo from '../../assets/Logo/Logo.png';
import menu from '../../assets/icons/menu.png'
import {Link} from 'react-router-dom';
import {useState} from 'react';
import './Header.scss'
import MobileMenu from '../mobileMenu/MobileMenu';

function Header() {

    const [show, setShow] = useState(false);

    const handleClick = (status) => {
        setShow(status)
    }

    const closeMenu = () => {
        setShow(false)
    }

    return (
        <header className='header'>
            <div className='header-logo'>
                <a className='header-logo__icon' href="/">
                    <img className='header-logo__icon-image' src={logo} alt="/" />
                </a>
                
            </div>
            <div className='mobile-menu'>
                <img onClick={() => handleClick(true)} className='mobile-menu__icon' src={menu} alt="" />
                <MobileMenu onClose={closeMenu} show={show}/>
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


