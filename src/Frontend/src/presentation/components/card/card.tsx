import React from 'react'
import { Project } from '../../../shared/lib/types'

import './card-styles.scss'

const Card: any = (props: any) => {
  console.log(props)
  return (
    <div className='card'>
      <div className="container">
        <h2 className='title'>{props.title}</h2>
        <p className='description'>{props.description}</p>
        <span className='vacancies'>
          {props.vacancies}
          {/* <span className='info'>X vancancies to devs</span> */}
        </span>
        <span className='date'>Schedule to start: {props.startDate}</span>
      </div>
    </div>
  )
}

export default Card
