import React from "react";
import "./forgot-styles.scss";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";

import "./forgot-styles.scss"


//404 page
let Forgot = () => {
    return (
        <>
            <div className="login">
            <div className="grid-7 container left-side">
                <h1 className="forgot">Forgot your password?</h1>
                <p className="textForgot">Type your email to redifine your password</p>
                <div className="input-container">
                    <form>
                        <p>Email</p>
                        <Input size="large" type="email" placeholder="E-mail" />
                    </form >
                </div>
                <button id="confirma-botao">Enviar</button>
            </div>

            <div className="grid-5 container right-side">
                <img className="lakitu-image" src={"/image-lakitu.png"} alt="" />
            </div>
        </div >
        </>
    )
}
export default Forgot;
