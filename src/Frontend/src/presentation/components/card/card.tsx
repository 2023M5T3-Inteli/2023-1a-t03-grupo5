import React from 'react'
import { Project } from '../../../shared/lib/types'

import './card-styles.scss'

const Card: any = (props: any) => {
  return (
    <div className='card'>
      <div className='bodyCard'>
        <div className="container">
          <div className='grid-8 nameProject'>
            <h2 className='title'>{props.title}</h2>
            <p className='description'>{props.description}</p>
          </div>
          <div className='grid-4 status'>
            <div className='people'>
              <p>50</p>
              <span><img width={24} src='../../../public/user.png'></img></span>
            </div>
            <div className='statusDiv'>
              <p>Status</p>
              <span className='greenCircle'></span>
            </div>
          </div>
        </div>
        <div className='moreDetails'>
          <div className='detailsLeft'>
            <p className='moreDetailsText'>More Details</p>
          </div>
          <div className='detailsRight'>
            <div><img src='../../../public/arrow-right.png'></img></div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Card
