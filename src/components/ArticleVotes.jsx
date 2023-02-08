function ArticleVotes({votes, updateArticleVote}) {

    const clickHandler = (e) => {
        updateArticleVote(e.target.name, e.target.value)
        
    }

    return ( 
        <ul className="p-3 list-group">
            <li className="list-group-item p-3 d-flex">

                <p className="mb-0">Article votes:</p>

                <p>{votes}</p>
                <button onClick={clickHandler} name="decrement" value={votes}>-</button>
                <button onClick={clickHandler} name="increment" value={votes}>+</button>


            </li>
        </ul>
    );
}

export default ArticleVotes;