import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './navbar-styles.scss'
import Logo from '../../../../public/logo.png'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  page: number,
  changePage: Function
}

const Navbar: any = (props: Props) => {
  const [profileOpened, setProfileOpened] = useState(false)

  const user = {
    photo: 'https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg',
    name: 'Pedro',
  }

  const menu = [
    {
      name: 'Project',
      link: '/'
    },
    {
      name: 'Profile',
      link: '/profile'
    },
    {
      name: 'Ranking',
      link: '/ranking'
    },
    {
      name: 'Applies',
      link: '/applies'
    },
  ]
  return (
    <div className='container'>
      <div className="grid-3">
        <img src={Logo} alt="dell logo" />
      </div>
      <div className="grid-6 menu-items">
        {
          menu.map((item, index) => {
            return (
              <Link to={item.link} className={`item ${props.page == index && 'active'}`} onClick={() => props.changePage(index)}>{item.name}</Link>
            )
          })
        }
      </div>
      <div className="grid-3">
        <div className="profile">
          <div onClick={() => setProfileOpened(!profileOpened)}>
            <div className='select'>
              <img className='logo' src={user.photo} alt="profile photo" />
              {user.name}
              <KeyboardArrowDownIcon />
            </div>
          </div>

          {
            profileOpened && (
              <div className="options">
                <div>Sair</div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar