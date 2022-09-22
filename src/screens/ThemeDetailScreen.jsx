import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ThemeDetailScreen() {

    const { id } = useParams();
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/themeDetail/"+id)
            .then(resp => resp.json())
            .then(json => {
                setTheme(json);
            });
    }, [id]);

    return (<>
        <div className='mb-5'>
            <h1>Détail du thème : {theme?.title}</h1>
            <img src={theme?.img_src} alt={theme?.title} />
        </div>

        <h3>Liste des articles</h3>
        {theme?.articles_list.map(article => {
            return (
                <div key={article?.Id_article}>
                    <div><b>{article?.title}</b> <em>Publié le {new Date(article.created_at).toLocaleString()}</em>
                <span className="ms-2">par {article?.appuser?.pseudo}</span></div>
                </div>
            );
        })}
    </>
    );
}

export default ThemeDetailScreen;