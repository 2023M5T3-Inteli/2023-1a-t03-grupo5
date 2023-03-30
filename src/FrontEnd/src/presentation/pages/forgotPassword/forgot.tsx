import React, { useState } from "react"
import "./forgot-styles.scss"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

import "./forgot-styles.scss"

import Input from "../../components/input/input"
import Button from "../../components/button/button"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Lakitu from "/public/image-lakitu.png"

const Forgot = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [step, setStep] = useState(1)

    const validate = (e: any) => {
        e.preventDefault()

        if (step === 1) {
            if (email) {
                setStep(2)
                toast.success("E-mail sent")
            }
            else {
                toast.error("Incorrect e-mail")
            }
        }
        else {
            if (!token && !password && !confirmPassword) {
                toast.error("Fill in the fields")
            }
            else if (!token) {
                toast.error("Fill in the token field")
            }
            else if (!password || !confirmPassword) {
                toast.error("Fill in the password fields")
            }
            else if (password !== confirmPassword) {
                toast.error("Password fields do not match")
            }
            else {
                toast.success("Password changed with success")
                navigate("/login")
            }
        }
    }

    const returnPage = () => {
        if (step === 1) {
            navigate("/login")
        }
        else {
            setStep(1)
        }
    }

    const step1 = () => {
        return (
            <>
                <div className='backIcon' onClick={() => returnPage()}>
                    <ArrowBackIcon />
                </div>

                <h1 className="title">Forgot your password?</h1>
                <p className="textForgot">Type your email to redifine your password</p>
                <div className="input-container">
                    <form onSubmit={validate}>
                        <p>Email</p>
                        <Input value={email} size="large" type="email" placeholder="E-mail" onChange={(value: string) => setEmail(value)} />
                    </form >
                </div>
                <Button type="default" size="medium" text="Send" onClick={(e: any) => validate(e)} />
            </>
        )
    }

    const step2 = () => {
        return (
            <>
                <div className='backIcon' onClick={() => returnPage()}>
                    <ArrowBackIcon />
                </div>

                <h1 className="title">Forgot your password?</h1>
                <div className="input-container">
                    <form onSubmit={validate}>
                        <p>Token</p>
                        <Input value={token} size="large" type="text" placeholder="Token" onChange={(value: string) => setToken(value)} />
                    </form >
                </div>
                <div className="input-container">
                    <form onSubmit={validate}>
                        <p>New password</p>
                        <Input value={password} size="large" type="password" placeholder="New password" onChange={(value: string) => setPassword(value)} />
                    </form >
                </div>
                <div className="input-container">
                    <form onSubmit={validate}>
                        <p>Confirm new password</p>
                        <Input value={confirmPassword} size="large" type="password" placeholder="Confirm password" onChange={(value: string) => setConfirmPassword(value)} />
                    </form >
                </div>
                <Button type="default" size="medium" text="Send" onClick={(e: any) => validate(e)} />
            </>
        )
    }

    return (
        <div className="forgot">
            <div className="grid-7 container left-side">
                {step === 1 && step1()}
                {step === 2 && step2()}
            </div>

            <div className="grid-5 container right-side">
                <div className="motivation-container">
                    <h2 className="text">LEARN &</h2>
                    <h2 className="text">DISCOVER</h2>
                    <h2 className="text"> WHILE YOU’RE</h2>
                    <h2 className="text">WORKING!</h2>
                </div>
                <img className="lakitu-image" src={Lakitu} alt="" />
            </div>
        </div >
    )
}
export default Forgot;
