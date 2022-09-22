import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TagDetailScreen() {

    const { id } = useParams();
    const [tag, setTag] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/tag/" + id, {
            method: "POST",
            body: JSON.stringify({ with: [{ "article": "article_tag" }] })
        })
            .then(resp => resp.json())
            .then(json => {
                setTag(json);
            });
    }, [id])

    return (
        <div>
            <h1>Détail du mot-clé : {tag?.title}</h1>
            <div className="container">
                <h3>Liste des articles reliés</h3>
                {
                    tag?.articles_list.map(article => {
                        return (
                                <p><strong>{article?.title}</strong> - <span>Publié le : {article.created_at}</span></p>
                            )
                    })
                }
            </div>
        </div>
    );
}

export default TagDetailScreen;