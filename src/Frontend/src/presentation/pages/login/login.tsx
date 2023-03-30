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
import { toast } from 'react-toastify';
import UserService from "../../../main/services/userService";
import Button from "../../components/button/button";


// import cors from "cors"

type Props = {
    changePage: Function;
}

let TelaLogin = (props: Props) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const response = await UserService.auth(email, pass)

        if (response.statusCode === 401) {
            toast.error("Email or password incorrect")
        }
        else {
            props.changePage(0)
            navigate('/')
            toast.success("Logged with success")
        }
    }

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
                        <Link to={"/forgotPassword"}>
                            <p className="forget">Forget the password?</p>
                        </Link>
                    </form>
                </div>
                <Button type="default" size="medium" text="Login" onClick={(e: any) => { handleSubmit(e) }} />
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