import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ThemeScreen() {

    const [themes, setThemes] = useState([]);
    useEffect(() => {
        fetch("http://blog.api/theme")
            .then(resp => resp.json())
            .then(json => {
                json = json.sort((a,b) => {
                    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                });
                setThemes(json);
            });
    }, [])

    const navigate = useNavigate();

    return (<>
        <h1>Liste des thèmes</h1>
        <table >
            <tbody className="d-flex flex-wrap">
                {themes.map(theme => {
                    return (<tr key={theme.Id_theme} onClick={() => { navigate(`/theme/${theme.Id_theme}`);}}>
                        <td>{theme.title}</td>
                        <img src={theme.img_src} alt={theme.title} className="img-thumbnail"/>
                        <td></td>
                    </tr>);
                })}
            </tbody>
        </table>
    </>);
}

export default ThemeScreen;
