import React from 'react'
import Button from '../../../../components/button/button'
import './modalConfirm-styles.scss'

type Props = {
  closeModal: Function;
  confirm: Function;
}

const ModalConfirm = (props: Props) => {
  return (
    <div id='confirm-modal'>
      <h2 className='send'>Do you really want to remove application answer?</h2>
      <div className="confirm-buttons">
        <Button text="Remove answer" size='medium' type='cancel' onClick={() => props.confirm()}/>
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()}/>
      </div>
    </div>
  )
}

export default ModalConfirm