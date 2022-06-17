import { useContext } from "react";
import userContext from "../contexts/userContext";

const UserCard = ({ user }) => {
    const { setLoggedUser } = useContext(userContext);

    const handleClick = () => {
        setLoggedUser(user.username);
        alert(`Logged in as ${user.username}`);
    };

    return (
        <li>
            <button onClick={handleClick}>
                <div>
                    <img className="user-card-img" src={user.avatar_url} alt={user.username}/>
                </div>
                <div>
                    <p className="user-card-name">{user.name}</p>
                </div>
            </button>
        </li>
    )
};

export default UserCard;