import React from 'react'
import { Link } from 'react-router-dom'
import './home-styles.scss'

const Home: React.FC = () => {
  return (
    <div>
      <h1>Título</h1>
      <p>Descrição</p>
      <img width={200} height={200} src="https://www.google.com.br/google.jpg" alt="" />
      <Link to={'/login'}>
        <button>Ir para o Login</button>
      </Link>
    </div>
  )
}

export default Home