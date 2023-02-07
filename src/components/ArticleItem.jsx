import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByNameAPI, getSingleArticleAPI } from "../utils/api";
import '../scss/ArticleItem.scss';
import Comments from "./Comments";

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
            return getUserByNameAPI(article.author)
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

    const date = new Date(article.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

    return ( 
        <article className="article-item">
            <div className="article-header" style={{backgroundImage: `url(${article.article_img_url})`}}></div>

            <section className="container">
            
                <div className="row g-3">
                    <section className="col-sm-8 col-12 ">
                        <div className="card mt-3 p-3">
                            <h2 className="card-title ">{article.title}</h2>
                            <p className="card-text">{article.body}</p>
                            <section className="card-details d-flex ">
                                <div className="d-flex">
                                    <p className="mb-0 me-1">Date published:</p>
                                    <div className="article-by-container d-flex">
                                        <p>{date}</p>
                                    </div>

                                </div>

                                <div className="d-flex">
                                    <p className="mb-0 me-1">Article by: </p>
                                    <div className="article-by-container d-flex">
                                        <div className="author-image" style={{backgroundImage: `url(${author.avatar_url})`}}></div>
                                        <p>{author.username}</p>
                                    </div>

                                </div>


                            </section>
                        </div>
                        <ul className="p-3 list-group">
                            <li className="list-group-item p-3 d-flex">

                                <p className="mb-0">Article votes:</p>

                                <p>{article.votes}</p>

                            </li>


                        </ul>
                    </section>    
                    <section className="col-md-4 col-12">
                       <h2 className="mt-3">Related Articles</h2>

                    </section>

                </div>
            </section>
            <Comments articleId={article.article_id} />
    
        </article>

    );
}

export default ArticleItem;