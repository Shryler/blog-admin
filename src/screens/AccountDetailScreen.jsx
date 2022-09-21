import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AccountDetailScreen() {

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/appuser/" + id, {
            method: "POST",
            body: JSON.stringify({with:['account', 'role']})
        })
            .then(resp => resp.json())
            .then(json => {
                setUser(json);
            });
    }, [id])

    return (
        <div>
            <h1>Détail de l'utilisateur : {user?.pseudo}</h1>
            <div className="container">
                <b>Email : </b>{user?.account?.login} <br />
                <b>Rôle : </b>{user?.role?.title}
            </div>
        </div>
    );
}

export default AccountDetailScreen;