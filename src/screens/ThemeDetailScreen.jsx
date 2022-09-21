import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ThemeDetailScreen() {

    const { id } = useParams();
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/theme/" + id)
            .then(resp => resp.json())
            .then(json => {
                setTheme(json);
            });
    }, [id])

    return (
        <div>
            <h1>Détail du mot-clé : {theme?.title}</h1>
        </div>
    );
}

export default ThemeDetailScreen;