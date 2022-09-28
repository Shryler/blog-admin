import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ArticleScreen() {

    function dateConverter(date) {
      let newDate = new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return newDate;
    }

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        fetch("http://blog.api/article/0", {
            method: "POST",
            body: JSON.stringify({with: ['appuser', 'theme']})
        })
            .then(resp => resp.json())
            .then(json => {
                json = json.sort((a,b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                });
                setArticles(json);
            });
    }, [])

    const navigate = useNavigate();

    return (<>
        <h1>Liste des articles</h1>
        <table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Date de publication</th>
                <th>Auteur</th>
                <th>Thème</th>
            </tr>
        </thead>
            <tbody>
                {articles.map(article => {
                    return (<tr key={article.Id_article} onClick={() => { navigate(`/article/${article.Id_article}`); }}>
                        <td>{article.title}</td>
                        <td>{dateConverter(article.created_at)}</td>
                        <td>{article?.appuser?.pseudo}</td>
                        <td>{article?.theme?.title}</td>
                    </tr>);
                })}
            </tbody>
        </table>
    </>);
}

export default ArticleScreen;