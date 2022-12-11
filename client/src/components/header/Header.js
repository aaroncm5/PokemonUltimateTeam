import logo from '../../assets/Logo/Logo.png';
import menu from '../../assets/icons/menu.png'
import {NavLink} from 'react-router-dom';
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
                <img className='mobile-menu__icon' onClick={() => handleClick(true)} src={menu} alt="" />
                <MobileMenu onClose={closeMenu} show={show}/>
            </div>
            <nav className='nav'>
                <ul className='nav-list'>
                    <NavLink className='nav-list__item' to='/'>Home</NavLink>
                    <NavLink className='nav-list__item' to='/login'>Login</NavLink>
                    <NavLink className='nav-list__item' to='/community'>Community</NavLink>
                    <NavLink className='nav-list__item' to='/faq'>FAQ</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header;


