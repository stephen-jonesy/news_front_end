import { useContext } from "react";
import { useEffect } from "react";
import { ArticlesContext } from "../articlesContext";
import { getArticlesAPI } from "../utils/api";
import ArticleCards from "./ArticleCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";
import '../scss/Articles.scss';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import ArticlesForm from "./ArticlesForm";


function Articles() {
    let [searchParams, setSearchParams] = useSearchParams();
    const {articles, setArticles} = useContext(ArticlesContext)
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('desc');
    const topicQuery = searchParams.get('topic'); 
    const sortByQuery = searchParams.get('sort_by'); 

    useEffect(() => {
        getArticlesAPI(topicQuery?.toLowerCase(), sortByQuery, order)
        .then((articles) => {

            setArticles(articles);
            setIsLoading(false);
            if (!sortByQuery) {
                setSort("")

            }

        });
        
    }, [topicQuery, sortByQuery, order]);

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
                <h2 className="ms-3 mb-4 pt-2">
                    {
                        topicQuery
                        ?
                        `Articles by topic: ${topicQuery}`
                        :
                        "Latest articles"
                    }                
                </h2>
                <ArticlesForm sort={sort} setSort={setSort} order={order} setOrder={setOrder} topicQuery={topicQuery} />



            </div>

            <div className="row g-3">
                {
                    articles
                    ?
                    articles.map((article => {
                        return <ArticleCards key={article.article_id} article={article}/>
                        
                     }))
                    :
                    <p className="ms-3 mb-4 pt-2">Opps, Topic does not exist!</p>
                    

                }
            </div>

        </section>
     );
}

export default Articles;