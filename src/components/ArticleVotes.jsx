import { useState } from "react";

function ArticleVotes({votes, updateArticleVote}) {
    const [incramentButtonToggle, setIncramentButtonToggle] = useState(false);
    const [decrementButtonToggle, setDecrementButtonToggle] = useState(false);

    const clickHandler = (e) => {
        updateArticleVote(e.target.name, e.target.value)
        e.currentTarget.disabled = true;
        if (e.target.name === "increment") {
            setIncramentButtonToggle(true)
            setDecrementButtonToggle(false)
            
        }
        else {
            setDecrementButtonToggle(true)
            setIncramentButtonToggle(false)
        }

    }

    return ( 
        <ul className="p-3 list-group">
            <li className="list-group-item p-3 d-flex">

                <p className="mb-0">Article votes:</p>

                <p>{votes}</p>
                <button onClick={clickHandler} name="decrement" value={votes} disabled={decrementButtonToggle}>-</button>
                <button onClick={clickHandler} name="increment" value={votes} disabled={incramentButtonToggle}>+</button>


            </li>
        </ul>
    );
}

export default ArticleVotes;