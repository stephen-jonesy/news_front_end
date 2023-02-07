import { Link } from "react-router-dom";

function ArticleCards({article}) {

    return ( 
        <div className="col-lg-3 col-md-4 col-12">
            <Link to={`/article/${article.article_id}`} className="card" >
                <img src={article.article_img_url} className="card-img-top" alt={`${article.title}`} />
                <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.body.substring(0,100)}...</p>
                </div>
            </Link>
        </div>
    );
}

export default ArticleCards;