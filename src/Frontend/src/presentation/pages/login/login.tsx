import React, { useEffect } from "react"
import Logo from "/public/imageDell.png"
import Lakitu from "/public/image-lakitu.png";
import ImgLogin from "/public/img-tela-login.png"
import "./login-styles.scss"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import cookie from 'react-cookies'
import Input from "../../components/input/input";

// import cors from "cors"

type Props = {
    changePage: Function;
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {
            console.log(email);
            console.log(pass)
            const response = await axios.post(
                "http://localhost:3001/auth/login", {
                email: email,
                password: pass
            });

            props.changePage(0)

            console.log(response)

            cookie.save("token", response.data.token)

            // props.validate()

            props.changePage(0)

            window.location.href = '/'

            console.log(email, pass);

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect limita a execução da função handleSubmit, o [] no final faz com execute apenas uma vez 
    // useEffect(() => {
    //     handleSubmit();
    // }, [])

    return (
        <div className="login">
            <div className="grid-7 container left-side">
                <img className="logo" src={Logo} alt="" />
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <p>Email</p>
                        <Input size="large" type="email" placeholder="E-mail" value={email} onChange={(value: string) => setEmail(value)} />
                    </form >
                </div>
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <p>Password</p>
                        <Input size="large" type="password" placeholder="Senha" value={pass} onChange={(value: string) => setPass(value)} />
                        <a className="forget" href="">Forget the password?</a>
                    </form>
                </div>
                <button id="confirma-botao" onClick={(e: any) => {
                    // submit()
                    handleSubmit(e)
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