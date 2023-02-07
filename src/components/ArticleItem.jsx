import { useParams } from "react-router-dom";

function ArticleItem() {
    const { article_id } = useParams(); 
    console.log(article_id);
    return ( 
        <article className="container">
            Single article page
        </article>

    );
}

export default ArticleItem;