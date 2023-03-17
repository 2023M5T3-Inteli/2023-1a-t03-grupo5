import React from 'react'
import { Project } from '../../../shared/lib/types'

import UserIcon from '/public/user.png'
import ArrowRight from '/public/arrow-right.png'

import './card-styles.scss'

const Card: any = (props: any) => {
  return (
    <div className='card'>
      <div className='body-card'>
        <div className="container">
          <div className='grid-8 name-project'>
            <h2 className='title'>{props.title}</h2>
            <p className='description'>{props.description}</p>
          </div>
          <div className='grid-4 status'>
            <div className='people'>
              <p>50</p>
              <span>
                <img width={24} src={UserIcon} />
              </span>
            </div>
            <div className='status-div'>
              <p>Status</p>
              <span className='green-circle'></span>
            </div>
          </div>
        </div>
        <div className='more-details'>
          <div className='details-left'>
            <p className='more-details-text'>More Details</p>
          </div>
          <div className='details-right'>
            <div>
              <img src={ArrowRight}></img></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card
