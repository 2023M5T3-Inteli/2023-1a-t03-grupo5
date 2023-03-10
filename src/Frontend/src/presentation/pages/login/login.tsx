import React from "react"
import Logo from "/public/imgDell.png"
import ImgLogin from "/public/img-tela-login.png"
import "./login-styles.scss"
import { Link } from "react-router-dom"

type Props = {
    changePage: Function
}

let TelaLogin = (props: Props) => {
    return (
        <div id="login">
            <div className="grid-5 container">
                {/* <div id="lado_esquerdo"> */}
                <img className="logo" src={Logo} alt="" />
                <p>Entre com</p>
                <input className="email" type="text" placeholder="E-mail" />
                <input type="text" placeholder="Senha" />
                <a className="forget" href="">Esqueceu a senha?</a>
                <Link to={'/'}>
                    <button id="confirma-botao" onClick={() => props.changePage(0)}>Confirma</button>
                </Link>
                {/* </div> */}
            </div>

            <div className="grid-7 container">
                <img className="banner-login" src={ImgLogin} alt="" />
            </div>
        </div>
    )
}

export default TelaLogin;