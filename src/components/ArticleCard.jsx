import { HowToVote } from "@mui/icons-material";
import { Badge, Chip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import "../scss/ArticleCard.scss";
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

function ArticleCards({article}) {

    const date = new Date(article.created_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 


    return ( 
        <div className="article-card col-lg-3 col-md-4 col-12">
            <Link to={`/article/${article.article_id}`} className="card" >
                <div className="img-card-container">
                    <img src={article.article_img_url} className="card-img-top" alt={`${article.title}`} />
                    <IconButton className="vote-icon">
                        <StyledBadge badgeContent={article.votes} color="secondary">
                            <HowToVote  />
                        </StyledBadge>
                    </IconButton>
                    <IconButton className="comment-icon">
                        <StyledBadge badgeContent={article.comment_count} color="secondary" >
                            <MailIcon  />
                        </StyledBadge>
                    </IconButton>
                    <Chip label={`Published: ${date}`} color="primary" variant="outlined" />


                </div>
                <div className="card-body mt-2">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.body.substring(0,100)}...</p>
                </div>
            </Link>
        </div>
    );
}

export default ArticleCards;