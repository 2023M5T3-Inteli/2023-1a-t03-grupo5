import React, { useEffect, useState } from "react"
import Logo from "/public/imgDell.png"
import ImgLogin from "/public/img-tela-login.png"
import "./ranking.styles.scss"
import { Link } from "react-router-dom"
import UserService from "../../../main/services/userService"
import { toast } from "react-toastify"
import Loading from "../../components/loading/loading"


//404 page
let Ranking = () => {
    const [loading, setLoading] = useState(true)
    const [ranking, setRanking] = useState<any>([])

    const getRanking = async () => {
        const response: any = await UserService.getRanking()

        if (response.status === 200) {
            setRanking(response.data)
            setLoading(false)
        }
        else {
            toast.error("Error to loading ranking")
        }
    }

    useEffect(() => {
        getRanking()
    }, [])

    return (
        <div className="ranking">
            {loading && <Loading />}
            <div className="container-ranking">
                {/* Ranking Title */}
                <div className="title-div">
                    <h1 className="title">Ranking</h1>
                    <div><img src={"/award.png"} /></div>
                </div>
                {/* Ranking Table */}
                <div>
                    <p style={{ "marginLeft": "140px", "marginTop": "48px", "marginBottom": "-24px" }}>
                        <span style={{ "color": "white" }}>Você está na posição {ranking.position}</span>
                    </p>
                    <div className="table-div">
                        <div className="container">
                            {
                                ranking.ranking &&
                                ranking.ranking.map((item: any, index: any) => {
                                    return (
                                        <div className="container-table">
                                            <div className="first-container">
                                                <p className="name-ranking">{index + 1}. {item.name}</p>
                                                <div className="award-first-container">
                                                    <img width={32} src="/award.png"></img>
                                                    <p>{item.points}</p>
                                                </div>
                                            </div>
                                            <div className="second-container">
                                                <button className="btn-second-container">See Profile</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>

        </div>

    )
}
export default Ranking
