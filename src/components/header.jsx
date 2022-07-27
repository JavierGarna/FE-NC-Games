import { Link, useLocation } from 'react-router-dom';
import { useContext } from "react";
import userContext from "../contexts/userContext";
import { useEffect } from "react";
import { useState } from 'react';
import { getCategories } from "../api";
import { BeatLoader } from 'react-spinners';

const Header = () => {
    const location = useLocation();
    const { loggedUser, setLoggedUser, headerLoading, pageLoading, setHeaderLoading} = useContext(userContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((cat) => {
            setCategories(cat);
            setHeaderLoading(false);
        })
    }, []);

    if (location.pathname === '/') {
        if(pageLoading || headerLoading) {
            return (
                <div className='loading-page'>
                    <h1 className='loading-header'>GAME REVIEW</h1>
                    <BeatLoader color="#1a1e9e" size={30}/>  
                </div>
            )
        }
    }

    return <header className="header">
        <Link to={`/`} className='head'>
            <h1>
                GAME REVIEW
            </h1>
        </Link>
        <ul className="nav">
            {categories.map((category) => {
                return <Link to={`/${category.slug}`} key={category.slug} className='categories'>{category.slug}</Link>
            })}
        </ul>
        <section className='header-user-section'>
        {loggedUser ? (
            <article className="loggedUser-info">
                <Link to={`/users`} className="users-link">
                    <img className="loggedUser-img" src={loggedUser.avatar_url} alt="user image"/>
                </Link>
                <button className='logout-button' onClick={() => {setLoggedUser("")}}>Log Out</button>
            </article>
        ) : (
            <Link to={`/users`} className="users-link">
                <button className='signup-button'>Sign Up</button>
            </Link>
        )}
        </section>
    </header>
};

export default Header;