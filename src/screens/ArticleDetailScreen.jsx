import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetailScreen() {

    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/article/" + id, {
            method: "POST",
            body: JSON.stringify({with: ['appuser', 'theme']})
        })
            .then(resp => resp.json())
            .then(json => {
                setArticle(json);
            });
    }, [id])

    function dateConverter(date) {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
        return newDate;
    }

    return (
        <div>
            <h1>Détail de l'article : {article?.title}</h1>
            <div className='container'>
                <p>{article?.content}</p>
                <em>Publié le : {dateConverter(article?.created_at)}</em> par <b>{article?.appuser?.pseudo}</b>
                <p>Thème : {article?.theme?.title}</p>
            </div>
        </div>
    );
}

export default ArticleDetailScreen;