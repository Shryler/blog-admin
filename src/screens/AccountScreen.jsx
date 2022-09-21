import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountScreen() {

    const [appUsers, setappUsers] = useState([]);

    useEffect(() => {
        fetch("http://blog.api/appuser/" + 0, {
            method: "POST",
            body: JSON.stringify({ with: ['account', 'role'] })
        })
            .then(resp => resp.json())
            .then(json => {
                json = json.sort((a, b) => {
                    return a.pseudo.toLowerCase() > b.pseudo.toLowerCase() ? 1 : -1
                });
                setappUsers(json);
            });
    }, [])

    const navigate = useNavigate();

    return (<>
        <h1>Liste des comptes utilisateurs</h1>
        <table>
            <thead>
                <tr>
                    <th>Pseudo</th>
                    <th>Email</th>
                    <th>Rôle</th>
                </tr>
            </thead>
            <tbody>
                {appUsers.map(appUser => {
                    return (<tr key={appUser?.Id_appUser} onClick={() => { navigate(`/account/${appUser?.Id_appUser}`); }}>
                        <td>{appUser?.pseudo}</td>
                        <td>{appUser?.account?.login}</td>
                        <td>{appUser?.role?.title}</td>
                    </tr>);
                })}
            </tbody>
        </table>
    </>);
}

export default AccountScreen;