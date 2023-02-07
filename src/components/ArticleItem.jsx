import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticleAPI } from "../utils/api";

function ArticleItem() {
    const { article_id } = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState({});

    useEffect(() => {
        getSingleArticleAPI(article_id)
        .then((article) => {
            console.log(article);
            setArticle(article);
            setIsLoading(false);

        });
        
    }, []);

    if(isLoading === true) {
        return (
            <Box sx={{ display: 'flex', width: "100%", minHeight: "300px"}}>
              <CircularProgress sx={{margin: "auto"}} />
            </Box>
        ); 
        
    }
    return ( 
        <article className="container">
            <div className="card mt-3">
            <img src={article.article_img_url} className="card-img-top" alt={`${article.title}`} />
                <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.body}</p>
                </div>
            </div>        
        </article>

    );
}

export default ArticleItem;