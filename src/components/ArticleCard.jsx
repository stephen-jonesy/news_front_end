function ArticleCards({article}) {

    return ( 
        <div className="col-lg-3 col-md-4 col-12">
            <div className="card" >
                <img src={article.article_img_url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a  className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
}

export default ArticleCards;