
import axios from 'axios';

const productsAPI = axios.create({
    baseURL: `https://news-server-zfky.onrender.com/api`
})

export const getArticlesAPI = () => {
    return productsAPI.get(`/articles`).then((res)=> {
        
        return res.data.articles;
    })
}

export const getSingleArticleAPI = (article_id) => {
    console.log(article_id);
    return productsAPI.get(`/articles/${article_id}`).then((res)=> {
        
        return res.data.article;
    })
}
