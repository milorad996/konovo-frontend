import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/slice";
import './../css/navbar.css';

function NavbarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className='header-container'>
            <nav className='nav-container'>
                <div className='nav-brand'>
                    KonovoTask.rs
                </div>
                <div className='links-container'>
                    <ul className='nav-links'>
                        <li><Link to="/products">Proizvodi</Link></li>
                    </ul>
                    <button className='logout-button' onClick={handleLogout}>Odjavi se</button>
                </div>
            </nav>
        </header>
    );
}

export default NavbarComponent;
