import { useContext } from "react";
import { useEffect } from "react";
import { ArticlesContext } from "../articlesContext";
import { getArticlesAPI } from "../utils/api";
import ArticleCards from "./ArticleCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";
import '../scss/Articles.scss';
import { Button, ButtonGroup } from "@mui/material";


function Articles() {
    const {articles, setArticles} = useContext(ArticlesContext)
    const [isLoading, setIsLoading] = useState(true);
    const buttons = [
        <Button key="one">One</Button>,
        <Button key="two">Two</Button>,
    ];
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
        <section className={`articles container p-3 mt-5`}>
            <div className="articles-header-container mb-3">
                <h2 className="ms-3 mb-43">Latest articles</h2>
                <ButtonGroup aria-label="medium button group" className="me-3">
                    {buttons}
                </ButtonGroup>
            </div>

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