import { useContext } from "react";
import { useEffect } from "react";
import { ArticlesContext } from "../articlesContext";
import { getArticlesAPI } from "../utils/api";
import ArticleCards from "./ArticleCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";

function Articles() {
    const {articles, setArticles} = useContext(ArticlesContext)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArticlesAPI()
        .then((articles) => {
            setArticles(articles);
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
        <section className={`articles container mt-2 ${isLoading === false ? "display-enabled" : ""}`}>
            <h2>articles</h2>
            <div className="row g-3">
                {
                    articles.map((article => {
                       return <ArticleCards key={article.article_id} article={article}/>
                       
                    }))
                }
            </div>

        </section>
     );
}

export default Articles;