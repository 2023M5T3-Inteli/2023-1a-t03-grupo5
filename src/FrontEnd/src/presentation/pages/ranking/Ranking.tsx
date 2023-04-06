import React, {useEffect, useState} from "react";
import Logo from "/public/imgDell.png";
import ImgLogin from "/public/img-tela-login.png";
import "./ranking.styles.scss";
import { Link } from "react-router-dom";
import UserService from "../../../main/services/userService";


//404 page
let Ranking = () => {

    const [ranking1, setRanking1] = useState<any>([]);

    const ranking = [
        {
            name: "Felipe Saladys",
            points: 25
        },
        {
            name: "Pedro",
            points: 20
        },
        {
            name: "João",
            points: 15
        },
        {
            name: "Mariana",
            points: 10
        },
        {
            name: "Luisa",
            points: 5
        },
        {
            name: "Victor",
            points: 25
        },
    ]

    const getRanking = async () => {
        console.log("getRanking")	

        const response:any = await UserService.getRanking();

        setRanking1(response.data);

        console.log(response.data);
    }

    useEffect(() => {
        getRanking();
        // setRanking1(ranking);
    }, []);

    return (
        <div className="ranking">
            <div className="container-ranking">
                {/* Ranking Title */}
                <div className="title-div">
                    <h1 className="title">Ranking</h1>
                    <div><img src = {"/award.png"}/></div>
                </div>
                {/* Ranking Filter */}
                <div>
                    <div className="filter-div">
                        <div className="filter-input-div">
                            <input className="input-filter" placeholder="Search by name"></input>
                            <div className="icon-input-filter"><img width={28} src={"/search.png"}/></div>
                        </div>
                        <div className="filter-input-div">
                            <input className="input-filter" placeholder="Filter"></input>
                            <div className="icon-input-filter"><img width={28} src={"/filter.png"}/></div>
                        </div>
                    </div>
                </div>
                {/* Ranking Table */}
                <div>
                    <p style={{"marginLeft": "140px", "marginTop": "48px", "marginBottom": "-24px"}}>
                        <span style={{"color": "white"}}>Você está na posição {ranking1.position}</span>
                    </p>
                    <div className="table-div">
                        <div className="container">
                            {
                                ranking1.ranking &&
                                ranking1.ranking.map((item: any, index: any) => {
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
                            {/* <div className="containerTable">
                                <div className="firstContainer">
                                    <p className="nameRanking">1. Felipe Saladys</p>
                                    <div className="awardFirstContainer">
                                        <img width={32} src="/award.png"></img>
                                        <p>25</p>
                                    </div>
                                </div>
                                <div className="secondContainer">
                                    <button className="btnSecondContainer">See Profile</button>
                                </div>
                            </div> */}
                        </div>         
                    </div>
                </div>
                <div>
                    <div className="pagination-div">
                        <div className="pages">
                            {/* {
                                busy ? <div>Carregando...</div> :
                                pages.map((index: any) => {
                                    i++
                                    return (
                                        <div className="page">
                                            <button onClick={() => setCurrentPage(i-1)}>{i}</button>
                                        </div>
                                    )
                                })
                            } */}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
export default Ranking;
