import React from 'react'
import Button from '../../../../components/button/button'
import './FinishProject-styles.scss'

type Props = {
  closeModal: Function;
  finish: Function
}

const FinishProject = (props: Props) => {
  return (
    <div id='finish-project'>
      <h2>Finish Project</h2>
      <p>You really want to finish the project?</p>
      <div className="finish-buttons">
        <Button text="Yes, finish" size='medium' type='cancel'  onClick={() => props.finish()}/>
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()}/>
      </div>
    </div>
  )
}

export default FinishProject