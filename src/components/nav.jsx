import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getCategories } from "../api";

const Nav = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((cat) => {
            setCategories(cat);
        })
    }, []);


    return (
        <ul className="nav">
            {categories.map((category) => {
                return <Link to={`/${category.slug}`} key={category.slug} className='categories'>{category.slug}</Link>
            })}
        </ul>
    )
};

export default Nav;