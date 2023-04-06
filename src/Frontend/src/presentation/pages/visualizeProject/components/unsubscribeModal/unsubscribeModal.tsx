import React from 'react'
import Button from '../../../../components/button/button'
import './unsubscribeModal-styles.scss'

type Props = {
  closeModal: Function;
  unsubscribe: Function
}

const UnsubscribeModal = (props: Props) => {
  return (
    <div id='unsubscribe-project'>
      <h2>Unsubscribe to Project</h2>
      <p>You really want to unsubscribe of the project?</p>
      <div className="unsubscribe-buttons">
        <Button text="Yes, Unsubscribe" size='medium' type='cancel'  onClick={() => props.unsubscribe()}/>
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()}/>
      </div>
    </div>
  )
}

export default UnsubscribeModal