import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function TagScreen() {

    const [tags, setTags] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        fetch("http://blog.api/tag")
            .then(resp => resp.json())
            .then(json => {
                json = json.sort((a, b) => {
                    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
                });
                setTags(json);
            });
    }, [])

    useEffect(() => { // Permet de mettre le focus sur l'input text
        inputRef.current?.focus()
    })

    const addTag = () => {
        setIsValid(true);
    }

    const navigate = useNavigate();

    return (<>
        <div className="container d-flex justify-content-center flex-column align-items-center">
            <h1>Liste des tags</h1>
            <button type="button" className="btn btn-success m-2" onClick={addTag} disabled={isValid}>+ Nouveau tag</button>
            <div className={isValid ? "m-2 d-flex w-50 justify-content-center d-block" : "m-2 d-flex justify-content-center d-none"}>
                <input
                    type="text"
                    className="w-100"
                    placeholder="Saisir un nouveau tag"
                    ref={inputRef}
                    onChange={() => setIsValid(inputRef.current?.value.trim() !== "")} />
                <button type="button" className="btn btn-success mx-2" name="tagV" disabled={isValid}>V</button>
                <button type="button" className="btn btn-danger" name="tagX">X</button>
            </div>
            <table>
                <tbody>
                    {tags.map(tag => {
                        return (<tr key={tag.Id_tag} onClick={() => { navigate(`/tag/${tag.Id_tag}`); }}>
                            <td>{tag.title}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>

    </>);
}

export default TagScreen;
