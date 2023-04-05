import React from 'react'

import UserIcon from '/public/user.png'
import ArrowRight from '/public/arrow-right.png'
import StarIcon from '/public/star.png'

import './card-styles.scss'

const Card: any = (props: any) => {

  return (
    <div className='card'>
      <div className='body-card'>
        <div className="container">
          <div className='first-container'>
            <div>
              <h2 className='title'>{props.name}</h2>
            </div>

            <div className='status'>
              <div className='people'>
                <p>{props.applies.length}</p>
                <span>
                  <img width={24} src={UserIcon} />
                </span>
              </div>
              <div className='status-div'>
                <p>{props.status === "Approved" ? "On going" : "Finished"}</p>
                {
                  props.status === "Finished" ?
                    <span className='red-circle'></span> :
                    <span className='green-circle'></span>
                }
              </div>
            </div>

          </div>
          <div className='second-container'>
            <p className='description'>{props.description}</p>
          </div>
          <div className='fav-icon-div'>
            <div><img width={28} src={StarIcon} /></div>
          </div>
        </div>

        <div className='more-details'>
          <div className='details-left'>
            <p className='more-details-text'>More Details</p>
          </div>
          <div className='details-right'>
            <div>
              <img src={ArrowRight} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card
