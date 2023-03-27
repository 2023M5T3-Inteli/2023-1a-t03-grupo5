import React from 'react'
import Button from '../../components/button/button'
import './feedbackRegistrantion-styles.scss'

type Props = {
  closeModal: Function
}

const FeedbackRegistrantion = (props: Props) => {
  return (
    <div id='feedback'>
      <h2 className='send'>Send feedback</h2>
      <label className='Feedback'>Feedback</label>
      <input type="text" className='text' name='text' />
      <div className="delete-buttons">
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()}/>
      </div>
    </div>
  )
}

export default FeedbackRegistrantion