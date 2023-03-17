import React, {useEffect, useState} from "react";
import Logo from "/public/imgDell.png";
import ImgLogin from "/public/img-tela-login.png";
import "./ranking.styles.scss";
import { Link } from "react-router-dom";


//404 page
let Ranking = () => {

    const [pages, setPages] = useState<any>()
    const [busy, setBusy] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const [ranking1, setRanking1] = useState<any>([])

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
        {
            name: "Victor",
            points: 25
        },
    ]

   

    //let pages = [[{}, {}, {}, {}, {}, {}]]

    let i = 0;

    useEffect(() => {
        const length = ranking.length

        const qntPerPage = 6

        const qntPages = Math.ceil(length / qntPerPage)

        const pagesTeste = []

        if (length > qntPerPage) {
            for (let i = 0; i < qntPages; i++) {
                pagesTeste.push(ranking.slice(i * qntPerPage, (i + 1) * qntPerPage));
            }
        } else {
            pagesTeste.push(ranking)
        }
        setPages(pagesTeste)
        setBusy(false)
    }, [])

    useEffect(() => {
        console.log(currentPage)
        if (busy) setRanking1([])
        else {setRanking1(pages[currentPage])}
    }, [currentPage])

    return (
        <div className="bodyRanking">
            <div className="containerRanking">
                {/* Ranking Title */}
                <div className="titleDiv">
                    <h1 className="title">Ranking</h1>
                    <div><img src = {"/award.png"}/></div>
                </div>
                {/* Ranking Filter */}
                <div>
                    <div className="filterDiv">
                        <div className="filterInputDiv">
                            <input className="inputFilter" placeholder="Search by name"></input>
                            <div className="iconInputFilter"><img width={28} src={"/search.png"}/></div>
                        </div>
                        <div className="filterInputDiv">
                            <input className="inputFilter" placeholder="Filter"></input>
                            <div className="iconInputFilter"><img width={28} src={"/filter.png"}/></div>
                        </div>
                    </div>
                </div>
                {/* Ranking Table */}
                <div>
                    <div className="tableDiv">
                        <div className="container">
                            {
                                ranking1.map((item: any, index: any) => {
                                    return (
                                        <div className="containerTable">
                                            <div className="firstContainer">
                                                <p className="nameRanking">{index + 1}. {item.name}</p>
                                                <div className="awardFirstContainer">
                                                    <img width={32} src="/award.png"></img>
                                                    <p>{item.points}</p>
                                                </div>
                                            </div>
                                            <div className="secondContainer">
                                                <button className="btnSecondContainer">See Profile</button>
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
                    <div className="paginationDiv">
                        <div className="pages">
                            {
                                busy ? <div>Carregando...</div> :
                                pages.map((index: any) => {
                                    i++
                                    return (
                                        <div className="page">
                                            <button onClick={() => setCurrentPage(i-1)}>{i}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
export default Ranking;
