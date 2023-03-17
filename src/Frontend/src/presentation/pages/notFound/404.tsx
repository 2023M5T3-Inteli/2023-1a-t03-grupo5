import React from "react";
import Logo from "/public/imgDell.png";
import ImgLogin from "/public/img-tela-login.png";
import "./404.scss";
import { Link } from "react-router-dom";


//404 page
let NotFound = () => {
    return (
        <div style={{"height": "100vh"}}>
            <div id="not-found">
                <div className="imageLakitu">
                    <img src="../../../public/Lakitu404.png"></img>
                </div>
                <div className="text404">
                    <h1 className="h1404">Oops!</h1>
                    <h1 className="h1404">Page not found :(</h1>
                    <h1 className="h1404">404</h1>
                    <Link to={"/"}><button className="btn404">Voltar</button></Link>
                </div>
            </div>
        </div>
        
    )
}
export default NotFound;
