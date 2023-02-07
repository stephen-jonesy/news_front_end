
import axios from 'axios';

const productsAPI = axios.create({
    baseURL: `https://news-server-zfky.onrender.com/api`
})

export const getArticlesAPI = () => {
    return productsAPI.get(`/articles`).then((res)=> {
        
        return res.data.articles;
    })
}
