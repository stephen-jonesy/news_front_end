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
    let [searchParams, setSearchParams] = useSearchParams();
    const {articles, setArticles} = useContext(ArticlesContext);
    const [articlePages, setArticlePages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('created_at');
    const [order, setOrder] = useState('desc');
    const topicQuery = searchParams.get('topic'); 
    const sortByQuery = searchParams.get('sort_by'); 
    const pageQuery = searchParams.get('page'); 
    const {errors, setErrors} = useContext(ErrorContext);

    useEffect(() => {
        getArticles();

    }, [topicQuery, sortByQuery, order, pageQuery]);

    
    const getArticles = () => {
        setIsLoading(true);

        getArticlesAPI(topicQuery?.toLowerCase(), sortByQuery, order, pageQuery)
        .then((data) => {
            setArticles(data.articles);
            setArticlePages(Math.ceil(parseInt(data.articles_count) / 12));
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
        searchParams.set('page', value)
        setSearchParams(searchParams)
    }

    return ( 
        <section className={`articles container p-3 my-5`}>
            <div className="articles-header-container mb-3">
                {
                    topicQuery
                    ?
                    <h2 className="ms-3 mb-4 pt-2">Articles by topic:<span className="brand-text"> {topicQuery.charAt(0).toUpperCase() + topicQuery.slice(1)}</span></h2>
                    :
                    <h2 className="ms-3 mb-4 pt-2">Latest articles</h2>
                }                
                <ArticlesForm sort={sort} setSort={setSort} order={order} setOrder={setOrder} topicQuery={topicQuery} />



            </div>

            {isLoading && articles.length === 0
                ? 
                <Box sx={{ display: 'flex', width: "100%", minHeight: "300px"}}>
                <CircularProgress sx={{margin: "auto"}} />
                </Box>
                :
                <div>
                <div className={`articles-list-container row g-3 ${isLoading && articles.length > 0 ? "show" : ""}`}>
                {
                    articles
                    ?
                    articles.map((article => {
                        return <ArticleCards key={article.article_id} article={article} isGridView={true}/>
                        
                     }))
                    :
                    <p className="ms-3 mb-4 pt-2">Opps, Topic does not exist!</p>
                    

                }
                </div>
                {articlePages > 1 ?
                    <Pagination count={articlePages} page={pageQuery ? parseInt(pageQuery) : 1} onChange={handleChange} className="pagination mt-3" />
                    :
                    null
                }
                </div>

            
            }



        </section>
     );
}

export default Articles;