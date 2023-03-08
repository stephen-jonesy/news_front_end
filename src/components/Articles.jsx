import { useContext } from "react";
import { useEffect } from "react";
import { ArticlesContext } from "../articlesContext";
import { getArticlesAPI } from "../utils/api";
import ArticleCards from "./ArticleCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";
import '../scss/Articles.scss';
import { useNavigate, useSearchParams } from "react-router-dom";
import ArticlesForm from "./ArticlesForm";
import { ErrorContext } from "../errorContext";
import { Pagination } from "@mui/material";

function Articles() {
    let [searchParams] = useSearchParams();
    const {articles, setArticles} = useContext(ArticlesContext);
    const [articlePages, setArticlePages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('created_at');
    const [order, setOrder] = useState('desc');
    const topicQuery = searchParams.get('topic'); 
    const sortByQuery = searchParams.get('sort_by'); 
    const pageQuery = searchParams.get('page'); 
    const {errors, setErrors} = useContext(ErrorContext);

    const navigate = useNavigate();
    useEffect(() => {
        getArticles(topicQuery, sortByQuery, order);

    }, [topicQuery, sortByQuery, order]);

    useEffect(()=> {
        getArticles(pageQuery);

    }, [pageQuery]);
    
    const getArticles = () => {
        getArticlesAPI(topicQuery?.toLowerCase(), sortByQuery, order, pageQuery)
        .then((data) => {
            setArticles(data.articles);
            setArticlePages(parseInt(data.articles_count) / 12);
            setIsLoading(false);
            window.scrollTo(0, 0);

            if (!sortByQuery) {
                setSort("created_at");

            }

        })
        .catch((err) => {
            setErrors((previousState)=> {
                return [
                    ...previousState,
                    {
                        id: Date.now(),
                        message: err.response.data.message,
                        status: err.response.status
                    }
                    
                ]
            })
        })
    }

    const handleChange = (event, value) => {
        return navigate(
            `?page=${value}`

        );
    }

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
            {articlePages > 1 ?
                <Pagination count={articlePages} onChange={handleChange} className="pagination mt-3" />
                :
                null
            }

        </section>
     );
}

export default Articles;