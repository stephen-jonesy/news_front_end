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
import { useSearchParams } from "react-router-dom";


function Articles() {
    const {articles, setArticles} = useContext(ArticlesContext)
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const sortByQuery = searchParams.get('topic'); // "title"

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        console.log(sortByQuery);
        getArticlesAPI(sortByQuery)
        .then((articles) => {
            setArticles(articles);
            setIsLoading(false);

        });
        
    }, [sortByQuery]);

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
                <h2 className="ms-3 mb-4 pt-2">Latest articles</h2>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="me-3">
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

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