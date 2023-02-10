
import axios from 'axios';

const newsAPI = axios.create({
    baseURL: `https://news-server-zfky.onrender.com/api`,
    header: { 'Content-type': 'application/json'}
})

export const getArticlesAPI = (topic, sort_by, order) => {

    return newsAPI.get(`/articles`, {
        params: {
            topic,
            sort_by,
            order
        }
    }).then((res)=> {
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

export const postArticleComment = (articleId, newComment) => {
    return newsAPI.post(`articles/${articleId}/comments`, newComment)
    .then((res)=> {
        return res.data.comment;
    })
}

export const getTopicCategories = () => {
    return newsAPI.get(`topics`)
    .then((res)=> {
        return res.data.topics;
    })
}

export const deleteCommentById = (commentId) => {
    return newsAPI.delete(`/comments/${commentId}`)
    .then((res)=> {
        console.log(res);
    })
    
}
