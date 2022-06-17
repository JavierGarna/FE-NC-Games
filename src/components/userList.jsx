import { useEffect, useState } from "react";
import { getUsers } from "../api";
import UserCard from "./userCard";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((fetchUsers) => {
            setUsers(fetchUsers)
        });
    }, []);

    return (
        <main>
            <section className="user-list">
                {users.map((user) => {
                    return (
                        <article className="user-list-article" key={user.username}>
                            <UserCard user={user}/>
                        </article>
                    )
                })}
            </section>
        </main>
    )
};

export default UserList;