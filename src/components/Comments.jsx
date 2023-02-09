import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getCommentsByArticle, postArticleComment } from "../utils/api";
import Comment from "./Comment";
import "../scss/Comments.scss"
import { ErrorContext } from "../errorContext";

function Comments({articleId}) {
    const [comments, setComments] = useState([]);
    console.log(comments);
    const [isLoading, setIsLoading] = useState(true);
    const [textInput, setTextInput] = useState("");
    const {errors, setErrors} = useContext(ErrorContext);

    useEffect(() => {
        getCommentsByArticle(articleId)
        .then((commentsData) => {
            setComments(commentsData);
            setIsLoading(false);

        })
    }, []);

    const formHandler = (e) => {
        e.preventDefault();
        console.log(textInput);
        const username = "happyamy2016";
        const body = textInput;

        postArticleComment({username, body})
        .then((comment) => {
            console.log(comment);
            setComments((previousState)=> {
                return [
                    comment,
                    ...previousState
                ]
            });
            setTextInput("");
            
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
                                <Button className="mt-2" variant="outlined" type="submit">Post</Button>

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