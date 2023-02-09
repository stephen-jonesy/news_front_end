import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/Header.scss"
import { getTopicCategories } from "../utils/api";

function Header() {
    const [showNav, setShowNav] = useState(false);
    const [topics, settopics] = useState([]);
    console.log(topics);
    useEffect(() => {
        getTopicCategories()
        .then((topicsArray) => {
            settopics(topicsArray);
        })
    }, []);

    return (  
        <nav className="header navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <Link to={`/`} className="navbar-brand" >News App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShowNav(!showNav)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end ${showNav === true ? "show" : ""}`}id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link  to={`/?topic=coding`}>Coding</Link></li>
                    <li className="nav-item"><Link to={`/?topic=cooking`}>Cooking</Link></li>
                    <li className="nav-item"><Link to={`/?topic=football`}>Football</Link></li>
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Header;