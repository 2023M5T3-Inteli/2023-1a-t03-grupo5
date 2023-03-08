import React from "react"
import Logo from "/public/imgDell.png"
import ImgLogin from "/public/img-tela-login.png"
import "./login-styles.scss"

let TelaLogin = () => {
    const botaoConfirma = () => {
        alert("botão de confirmar");
    }

    return (
        <div id="login">
            <div className="grid-5 container">
                {/* <div id="lado_esquerdo"> */}
                <img className="logo" src={Logo} alt="" />
                <p>Entre com</p>
                <input className="email" type="text" placeholder="E-mail" />
                <input type="text" placeholder="Senha" />
                <a href="">Esqueceu a senha?</a>
                <button id="confirma-botao" onClick={botaoConfirma} >Confirma</button>
                {/* </div> */}
            </div>

            <div className="grid-7 container">
                <img className="banner-login" src={ImgLogin} alt="" />
            </div>
        </div>
    )
}

export default TelaLogin;