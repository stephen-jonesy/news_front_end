import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getCommentsByArticle } from "../utils/api";
import Comment from "./Comment";

function Comments({articleId}) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCommentsByArticle(articleId)
        .then((commentsData) => {
            setComments(commentsData);
            setIsLoading(false);

        })
    }, []);
    if (isLoading === true) {
        return (
            <Box sx={{ display: 'flex', width: "100%", minHeight: "300px"}}>
              <CircularProgress sx={{margin: "auto"}} />
            </Box>
        ); 
    }
    return ( 
        <>
            <section className="container mt-4">
                <h2>Comments</h2>
                <ul className="mt-4">
                    {comments.length === 0 ? 
                        <p>
                            There are no comments yet. Post one and be the first!
                        </p>
                        :
                        comments.map(comment => {
                            return (
                                <Comment key={comment.comment_id} comment={comment} setIsLoading={setIsLoading}/>
                            )
    
                        })

                    }

                </ul>
            </section>

        </>

    );
}

export default Comments;