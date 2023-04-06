import React, { useState } from 'react'
import Button from '../../../../components/button/button'
import Input from '../../../../components/input/input';
import './feedbackRegistrantion-styles.scss'

type Props = {
  closeModal: Function;
  confirm: Function;
}

const FeedbackRegistrantion = (props: Props) => {
  const [feedback, setFeedback] = useState("")

  const submit = (e?: any) => {
    if(e) {
      e.preventDefault()
    }

    if (feedback.length > 0) {
      props.confirm(feedback)
    }
  }

  return (
    <div id='feedback'>
      <h2 className='send'>Send feedback</h2>
      <form onSubmit={submit}>
        <label className='feedback'>Feedback*</label>
        <Input value={feedback} type="text" placeholder='Write the reasons for refusal' size='large' onChange={(value: string) => setFeedback(value)}/>
      </form>

      <div className="feedback-buttons">
        <Button text="Refuse apply" size='medium' type='cancel' onClick={() => submit()} />
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()} />
      </div>
    </div>
  )
}

export default FeedbackRegistrantion