import React from "react";
import Logo from "/public/imgDell.png";
import ImgLogin from "/public/img-tela-login.png";
import "./404.scss";
import { Link } from "react-router-dom";


//404 page
let NotFound = () => {
    return (
        <div id="not-found">
        <div className="not-found__container">
            <h1 className="not-found__title">404</h1>
            <h2 className="not-found__subtitle">Página não encontrada</h2>
            <Link to="/">
            <button className="not-found__button">Voltar</button>
            </Link>
        </div>
        </div>
    )
}
export default NotFound;
