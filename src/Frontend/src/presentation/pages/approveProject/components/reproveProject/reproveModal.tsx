import React, { useState } from 'react'
import Button from '../../../../components/button/button'
import Input from '../../../../components/input/input';
import './reproveModal-styles.scss'

type Props = {
  closeModal: Function;
  confirm: Function;
}

const ReproveModal = (props: Props) => {
  const [message, setMessage] = useState("")

  const submit = (e?: any) => {
    if(e) {
      e.preventDefault()
    }

    if (message.length > 0) {
      props.confirm()
    }
  }

  return (
    <div id='reprove-modal'>
      <h2 className='send'>Reprove Project</h2>
      <form onSubmit={submit}>
        <label className='reprove-modal'>Message*</label>
        <Input value={message} type="text" placeholder='Write the reasons for reprove' size='large' onChange={(value: string) => setMessage(value)}/>
      </form>

      <div className="reprove-modal-buttons">
        <Button text="Refuse apply" size='medium' type='cancel' onClick={() => submit()} />
        <Button text="Cancel" size='medium' type='default' onClick={() => props.closeModal()} />
      </div>
    </div>
  )
}

export default ReproveModal