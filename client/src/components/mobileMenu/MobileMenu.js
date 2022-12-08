import './MobileMenu.scss';
import {Link} from 'react-router-dom';
import close from '../../assets/icons/close.svg'

function MobileMenu( {show, onClose} ) {

    if (!show) {
        return null
    }

    return(
        <nav className='mobile-nav'>
            <div className='mobile-nav__header'>
                <p className='mobile-nav__header-text'>Menu</p>
                <img className='mobile-nav__header-text' onClick={onClose} src={close} alt="X symbol to close page" />
            </div>
            <ul className='mobile-nav-list'>
                <Link to='/'>Home</Link>
                <Link to='/'>login/Signup</Link>
                <Link to='/'>Community</Link>
                <Link to='/'>FAQ</Link>
            </ul>
        </nav>
    )
}

export default MobileMenu;