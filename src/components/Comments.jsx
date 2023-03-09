import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getCommentsByArticle, postArticleComment } from "../utils/api";
import Comment from "./Comment";
import "../scss/Comments.scss"
import { ErrorContext } from "../errorContext";

function Comments({articleId}) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newCommentIsLoading, setNewCommentIsLoading] = useState(false);
    const [textInput, setTextInput] = useState("");
    const {errors, setErrors} = useContext(ErrorContext);
 

    useEffect(() => {
        getCommentsByArticle(articleId)
        .then((commentsData) => {
            if (commentsData) {
                setComments(commentsData);

            }
            setIsLoading(false);

        })
    }, []);

    const formHandler = (e) => {
        e.preventDefault();
        const username = "happyamy2016";
        const body = textInput;
        setNewCommentIsLoading(true);

        postArticleComment(articleId,{username, body})
        .then((comment) => {
            setComments((previousState)=> {
                return [
                    comment,
                    ...previousState
                ]
            });
            setTextInput("");
            setNewCommentIsLoading(false);

            
        })
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
            setNewCommentIsLoading(false);


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
        <>
            <section className="container mt-4">
                <h2>Comments</h2>
                <ul className="mt-4">
                    <li className="comment card p-3 mb-3">
                        <form onSubmit={formHandler}>

                            <TextField 
                                id="outlined-multiline-static"
                                label="Add a comment"
                                multiline
                                rows={4}
                                sx={{backgroundColor: "#f5f5f5", width: "100%"}}
                                value={textInput}
                                onChange={(e)=>setTextInput(e.target.value)}
                            />
                            <div className="form-btn-container">
                                <Button className="mt-2" variant="outlined" type="submit" disabled={!/\S+/g.test(textInput)}>
                                    {newCommentIsLoading === false 
                                    ?
                                    "Post"
                                    :
                                    <Box >
                                        <CircularProgress sx={{width: "20px"}}  />
                                    </Box>
                                    }
                                    
                                
                                </Button>

                            </div>
                        </form>

            
                    </li>
                    {comments.length === 0 ? 
                        <p>
                            There are no comments yet. Post one and be the first!
                        </p>
                        :
                        comments.map(comment => {
                            return (
                                <Comment key={comment.comment_id} comment={comment} setIsLoading={setIsLoading} setComments={setComments} />
                            )
    
                        })

                    }

                </ul>
            </section>

        </>

    );
}

export default Comments;