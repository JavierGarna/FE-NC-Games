import Nav from "./nav";
import { Link } from 'react-router-dom';

const Header = () => {
    return <header className="header">
        <Link to={`/`} className='head'>
            <h1>
                GAME REVIEW
            </h1>
        </Link>
        <Nav/>
        <Link to={`/users`} className="users-link">
            <button>Sign Up</button>
        </Link>
    </header>
};

export default Header;