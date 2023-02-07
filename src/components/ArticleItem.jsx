import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleAuthorAPI, getSingleArticleAPI } from "../utils/api";
import '../scss/ArticleItem.scss';

function ArticleItem() {
    const { article_id } = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});

    useEffect(() => {
        getSingleArticleAPI(article_id)
        .then((article) => {
            setArticle(article);
            setIsLoading(false);
            return getArticleAuthorAPI(article.author)
        })
        .then((user) => {
            setAuthor(user);
            return user;
        })
        
    }, []);

    if(isLoading === true) {
        return (
            <Box sx={{ display: 'flex', width: "100%", minHeight: "300px"}}>
              <CircularProgress sx={{margin: "auto"}} />
            </Box>
        ); 
        
    }
    
    return ( 
        <article className="article-item">
            <div className="article-header" style={{backgroundImage: `url(${article.article_img_url})`}}></div>

            <section className="container">
            
                <div className="row">
                    <section className="col-8 card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.body}</p>
                        </div>
                    </section>    
                    <section className="col-4 card mt-3">
                        <h3>{author.username}</h3>
                        <div className="author-image" style={{backgroundImage: `url(${author.avatar_url})`}}></div>

                    </section>
                </div>
            </section>
    
        </article>

    );
}

export default ArticleItem;