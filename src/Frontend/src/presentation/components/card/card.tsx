import React, {useEffect} from 'react'
import { Project } from '../../../shared/lib/types'

import './card-styles.scss'

const Card: any = (props: any) => {

  // useEffect(() => {
  //   if (props.status == "Finalizado") {
  //     document.getElementById('circle')!.style.backgroundColor = 'red'
  //   }
    
  //   console.log(props.status)
  // }, [])

  return (
    <div className='card'>
      <div className='bodyCard'>
        <div className="container">
          <div className='firstContainer'>
            <div>
              <h2 className='title'>{props.title}</h2>
            </div>
            
            <div className='status'>
              <div className='people'>
                <p>{props.peoples}</p>
                <span><img width={24} src='../../../public/user.png'></img></span>
              </div>
              <div className='statusDiv'>
                <p>{props.status}</p>
                {props.status == "Finalizado"?<span className='redCircle' id='circle'></span>:<span className='greenCircle'></span>}
              </div>
            </div>
            
          </div>
          <div className='secondContainer'>
            <p className='description'>{props.description}</p>
          </div>
          <div className='favIconDiv'>
            <div><img width={28} src='/star.png'/></div>
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
