import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserByNameAPI } from "../utils/api";
import "../scss/Comment.scss";

function Comment({comment}) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserByNameAPI(comment.author)
        .then((userData) => {
            setUser(userData);
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
        <li className="comment card p-3 mb-3" key={comment.comment_id}>
            <section className="d-flex">
                <div className="comment-icon" style={{backgroundImage: `url(${user.avatar_url})`}}></div>
                <h3 className="ms-2">{user.username}</h3>
            </section>

            
            <p>{comment.body}</p>
        
        </li>
    );
}

export default Comment;