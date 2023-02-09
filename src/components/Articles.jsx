import { useContext } from "react";
import { useEffect } from "react";
import { ArticlesContext } from "../articlesContext";
import { getArticlesAPI } from "../utils/api";
import ArticleCards from "./ArticleCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";
import '../scss/Articles.scss';
import {FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";


function Articles() {
    const {articles, setArticles} = useContext(ArticlesContext)
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const topicQuery = searchParams.get('topic'); 
    const sortByQuery = searchParams.get('sort_by'); 
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSort(event.target.value);
        return navigate(
            topicQuery
            ?
            `/?topic=${topicQuery}&sort_by=${event.target.value}`
            :
            `/?sort_by=${event.target.value}`

        );
    };

    useEffect(() => {
        getArticlesAPI(topicQuery?.toLowerCase(), sortByQuery)
        .then((articles) => {

            setArticles(articles);
            setIsLoading(false);
            if (!sortByQuery) {
                setSort("")

            }

        })
        
    }, [topicQuery, sortByQuery]);

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
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="me-3">
                    <div>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                    sx={{width: "120px"}}
                    >
                    <MenuItem value={"votes"} type="submit">
                        Votes
                    </MenuItem>
                    <MenuItem value={"comment_count"}>
                        Engagment
                    </MenuItem>
                    <MenuItem value={"created_at"}>
                        date
                    </MenuItem>
                    </Select>

                    </div>
                    
                </FormControl>

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