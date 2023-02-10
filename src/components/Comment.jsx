import { Box, Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteCommentById, getUserByNameAPI } from "../utils/api";
import "../scss/Comment.scss";
import { ErrorContext } from "../errorContext";

function Comment({comment, setComments}) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {errors, setErrors} = useContext(ErrorContext);

    useEffect(() => {
        getUserByNameAPI(comment.author)
        .then((userData) => {
            setUser(userData);
            setIsLoading(false);

        })
    }, []);

    const clickHandler = (commentId) => {

        setComments((previousState)=> {
            const newState = previousState.filter((comment)=> {
                return comment.comment_id !== commentId
            })
            return newState;
        })

        deleteCommentById(commentId)
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

        })
    }

    if (isLoading === true) {
        return (
            <Box sx={{ display: 'flex', width: "100%", minHeight: "300px"}}>
              <CircularProgress sx={{margin: "auto"}} />
            </Box>
        ); 
    }
    return (  
        <li className="comment card p-3 mb-3" key={comment.comment_id}>
            <section className="d-flex">
                <div className="comment-icon" style={{backgroundImage: `url(${user.avatar_url})`}}></div>
                <h3 className="ms-2">{user.username}</h3>
                {
                    comment.author === "happyamy2016"
                    ?
                    <Button style={{justifySelf: "end"}} onClick={() => clickHandler(comment.comment_id)}>x</Button>
                    :
                    ""
                }
            </section>

            
            <p>{comment.body}</p>
        
        </li>
    );
}

export default Comment;