import { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import "../scss/ArticleVotes.scss"
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

function ArticleVotes({votes, updateArticleVote}) {

    const [buttonClicked, setButtonClicked] = useState("");

    const clickHandler = (e) => {
        setButtonClicked(e.target.name);
        updateArticleVote(e.target.name, e.target.value);

    }

    return ( 
        <section className="article-votes">

            <IconButton className="vote-icon">
                <StyledBadge badgeContent={votes} color="secondary">
                    <HowToVoteIcon  />
                </StyledBadge>
            </IconButton>
            <Button variant="text" onClick={clickHandler} name="decrement" value={votes} >
                <ThumbDownIcon style={{ color: `${buttonClicked === "decrement"? "262665" : "838e9e"}`}} />

            </Button>
            <Button variant="text" onClick={clickHandler} name="increment" value={votes}>
                <ThumbUpIcon style={{ color: `${buttonClicked === "increment"? "262665" : "838e9e"}`}} />
            </Button>

        </section>
    );
}

export default ArticleVotes;