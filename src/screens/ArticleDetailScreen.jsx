import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetailScreen() {

    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/article/" + id, {
            method: "POST",
            body: JSON.stringify({ with: ['appuser', 'theme', 'image', 'comment', { tag: "article_tag" }] })
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
                <div><b>Mots-clés :</b> 
                    {
                        article?.tags_list.map(tag => {
                            return <span key={tag.Id_tag} className="badge bg-secondary ms-2">{tag.title}</span>;
                        })
                    }
                </div><br />
                <p>{article?.content}</p>
                <em>Publié le : {dateConverter(article?.created_at)}</em> par <b>{article?.appuser?.pseudo}</b>
                <p>Thème : {article?.theme?.title}</p>
                <img src={article?.image?.src} alt={article?.image?.src} />
                <h3>Commentaires</h3>
                {article?.comments_list.map(comment => {
                    return (
                        <div key={comment.Id_comment} className="commentaire">
                            <p>{comment.title}</p>
                            <em>Publié le {new Date(comment.created_at).toLocaleString()}</em>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ArticleDetailScreen;