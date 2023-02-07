
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
    return productsAPI.get(`/articles/${article_id}`).then((res)=> {
        
        return res.data.article;
    })
}

export const getArticleAuthorAPI = (author) => {
    return productsAPI.get(`/users/${author}`).then((res)=> {
        return res.data.user;
    })
}


