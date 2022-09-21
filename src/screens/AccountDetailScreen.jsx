import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AccountDetailScreen() {

    const { id } = useParams();
    const [account, setAccount] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/account/" + id)
            .then(resp => resp.json())
            .then(json => {
                setAccount(json);
            });
    }, [id])

    return (
        <div>
            <h1>Détail du mot-clé : {account?.login}</h1>
            <div className="container">
                <h2>{account?.login}</h2>
                <em>{account?.password}</em>
            </div>
        </div>
    );
}

export default AccountDetailScreen;