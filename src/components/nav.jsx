// import { useContext } from "react";
// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import { getCategories } from "../api";
// import userContext from "../contexts/userContext";

// const Nav = () => {
//     const {setHeaderLoading} = useContext(userContext);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         getCategories().then((cat) => {
//             setCategories(cat);
//             setHeaderLoading(false);
//         })
//     }, []);

//     return (
//         <ul className="nav">
//             {categories.map((category) => {
//                 return <Link to={`/${category.slug}`} key={category.slug} className='categories'>{category.slug}</Link>
//             })}
//         </ul>
//     )
// };

// export default Nav;