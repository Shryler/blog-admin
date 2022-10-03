import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArticleDetailScreen() {

    const {id} = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch("http://blog.api/article/"+id, {
                method: "POST",
                body: JSON.stringify({with: ['appuser','theme', 'image', 'comment', {tag: "article_tag"}]})
            })
            .then(resp => resp.json())
            .then(json => { 
                setArticle(json)
            });

    }, [id]);

    return ( <>
        <h1>Détail de l'article : {article?.title}</h1>
        <span>publié le : {new Date(article?.created_at).toLocaleString()}</span>
        <span className="ms-3">par : {article?.author?.pseudo}</span>
        <div>Thème : {article?.theme?.title}</div>
        <div>Mots-clés : 
            {
                article?.tags_list.map(tag => {
                    return <span className="badge bg-secondary ms-2">{tag.title}</span>;
                })
            }
        </div>
        <br/>
        <textarea disabled style={{width:'100%', resize: 'none'}} rows="6" defaultValue={article?.content}></textarea>
        {article?.images_list.map(image => {
            return <img src={image.src} alt={image.alt} style={{width:'200px'}} className="me-1"/>
        })}
        <br/><br/>
        <h4>Commentaires</h4>
        {article?.comments_list.map(comment => {
            return (
                <div>
                    <span>{comment.title}</span> le :{new Date(comment.created_at).toLocaleString()} <br/>
                    <textarea disabled style={{width:'60%', resize: 'none'}} rows="4" defaultValue={comment.content}></textarea>
                </div>)
            
        })}

    </> );
}

export default ArticleDetailScreen;