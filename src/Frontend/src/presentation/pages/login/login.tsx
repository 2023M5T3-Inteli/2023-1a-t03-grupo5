import React, { useEffect } from "react"
import Logo from "/public/imageDell.png"
import Lakitu from "/public/image-lakitu.png";
import ImgLogin from "/public/img-tela-login.png"
import "./login-styles.scss"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import cookie from 'react-cookies'

// import cors from "cors"

type Props = {
    changePage: Function
}

let TelaLogin = (props: Props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const navigate = useNavigate()


    // const submit = () => {
    //     //alert(`Email: ${email}, Senha: ${pass} `);
    // }

    // async é usada para indicar que a função é assíncrona e que retornará uma promessa.
    // faz uma requisição HTTP POST usando a biblioteca Axios para uma URL específica e com alguns dados no corpo da requisição.

    const handleInput = async () => {
        try {
            console.log(email);
            console.log(pass)
            const response = await axios.post(
                "http://localhost:3001/auth/login", {
                email: email,
                password: pass
            });

            console.log(response)

            cookie.save("token", response.data.token)

            navigate("/")

            console.log(email, pass);

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect limita a execução da função handleInput, o [] no final faz com execute apenas uma vez 
    // useEffect(() => {
    //     handleInput();
    // }, [])

    return (
        <div id="login">
            <div className="grid-7 container left-side">
                <img className="logo" src={Logo} alt="" />
                <p>Email</p>
                <input className="email" type="text" placeholder="E-mail" value={email} onChange={(eventInput) => setEmail(eventInput.target.value)} />
                <p>Password</p>
                <input className="pass" type="password" placeholder="Senha" value={pass} onChange={(eventPassword) => setPass(eventPassword.target.value)} />
                <a className="forget" href="">Forget the password?</a>
                <button id="confirma-botao" onClick={() => {
                    // submit()
                    handleInput();
                    props.changePage(0)
                }}>Login</button>

            </div>

            <div className="grid-5 container right-side">
                <h1 className="motivation-text">LEARN &</h1>
                <h1 className="motivation-text">DISCOVER</h1>
                <h1 className="motivation-text"> WHILE YOU’RE</h1>
                <h1 className="motivation-text">WORKING!</h1>
                <img className="lakitu-image" src={Lakitu} alt="" />
            </div>
        </div >

    )
}

export default TelaLogin;