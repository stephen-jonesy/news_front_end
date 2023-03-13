import { Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByNameAPI, getSingleArticleAPI, patchArticleVotes, getRelatedArticles } from "../utils/api";
import '../scss/ArticleItem.scss';
import Comments from "./Comments";
import ArticleVotes from "./ArticleVotes";
import { ErrorContext } from "../errorContext";
import ArticleCards from "./ArticleCard";

function ArticleItem() {
    const { article_id } = useParams(); 
    const {errors, setErrors} = useContext(ErrorContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        window.scrollTo(0,0);
        getSingleArticleAPI(article_id)
        .then((article) => {
            setArticle(article);
            return Promise.all([getUserByNameAPI(article.author), getRelatedArticles(article.topic)]);

        })
        .then(([user, relatedArticles]) => {
            setIsLoading(false);
            setAuthor(user);
            setRelatedArticles(()=> {
                return relatedArticles.filter(article => {
                    console.log(article.article_id);
                    return article.article_id !== parseInt(article_id)});
            })
        })

        .catch((err) => {
            if(err.response.status === 404) {
                return navigate('/page_not_found');

            }
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
        
    }, [article_id]);

    const updateArticleVote = (direction, votes) => {
        let votesInt = parseInt(votes)
        setArticle(()=> {
            return {...article, votes: 
                direction === "increment" 
                ?
                votesInt + 1
                :
                votesInt - 1
            
            }
        })
        patchArticleVotes(article_id, direction)
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
            setArticle(()=> {
                return {...article, votes: votesInt
                
                }
            })

        })

    }

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
                    <section className="col-md-8 col-12 ">
                        <div className="main-article-card card mt-3 p-3">
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
                        <ArticleVotes votes={article.votes} updateArticleVote={updateArticleVote} />
                        <Comments articleId={article.article_id} />

                    </section>    
                    <section className="col-md-4 col-12">
                        <div className="related-articles mt-3 p-3">
                        <h2 >Related Articles</h2>
                       <div className="row g-3">
                       {
                            relatedArticles.map((article => {
                                return <ArticleCards key={article.article_id} article={article} isGridView={false}/>
                            }))
                        }
                       </div>
                        </div>


                    </section>

                </div>
            </section>
    
        </article>

    );
}

export default ArticleItem;