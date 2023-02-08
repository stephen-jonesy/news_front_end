
import axios from 'axios';

const newsAPI = axios.create({
    baseURL: `https://news-server-zfky.onrender.com/api`,
    timeout: 10000,
    header: { 'Content-type': 'application/json'}
})

export const getArticlesAPI = () => {
    return newsAPI.get(`/articles`).then((res)=> {
        
        return res.data.articles;
    })
}

export const getSingleArticleAPI = (article_id) => {
    return newsAPI.get(`/articles/${article_id}`).then((res)=> {
        
        return res.data.article;
    })
}

export const getUserByNameAPI = (author) => {
    return newsAPI.get(`/users/${author}`).then((res)=> {
        return res.data.user;
    })
}

export const getCommentsByArticle = (articleId) => {
    return newsAPI.get(`/articles/${articleId}/comments`).then((res)=> {
        return res.data.comments;
    })
}

export const patchArticleVotes = (articleId, direction) => {
    const accumulator = direction === "decrement" ? -1 : 1;
    return newsAPI.patch(`/articles/${articleId}`, { "inc_votes": accumulator })
    .then((res)=> {
        return res.data.article;
    })
}

