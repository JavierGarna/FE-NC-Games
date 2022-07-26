import Nav from "./nav";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import userContext from "../contexts/userContext";

const Header = () => {
    const { loggedUser, setLoggedUser } = useContext(userContext);

    return <header className="header">
        <Link to={`/`} className='head'>
            <h1>
                GAME REVIEW
            </h1>
        </Link>
        <Nav/>
        {loggedUser ? (
            <article className="loggedUser-info">
                <img className="loggedUser-img" src={loggedUser.avatar_url} alt="user image"/>
                <button onClick={() => {setLoggedUser("")}}>Log Out</button>
            </article>
        ) : (
            <Link to={`/users`} className="users-link">
                <button>Sign Up</button>
            </Link>
        )}
    </header>
};

export default Header;