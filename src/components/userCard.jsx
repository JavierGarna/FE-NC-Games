import { useContext } from "react";
import userContext from "../contexts/userContext";

const UserCard = ({ user }) => {
    const { setLoggedUser } = useContext(userContext);

    const handleClick = () => {
        setLoggedUser(user);
        alert(`Logged in as ${user.username}`);
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
    };

    return (
        <li className="user-list">
            <button className="user-info" onClick={handleClick}>
                <div>
                    <img className="user-card-img" src={user.avatar_url} alt={user.username}/>
                    <p className="user-card-name">{user.name}</p>
                </div>
            </button>
        </li>
    )
};

export default UserCard;