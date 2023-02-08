import { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/Header.scss"

function Header() {
    const [showNav, setShowNav] = useState(false);

    return (  
        <nav className="header navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <Link to={`/`} className="navbar-brand" >News App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShowNav(!showNav)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end ${showNav === true ? "show" : ""}`}id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Topics
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ margin: 0 }}>
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Header;