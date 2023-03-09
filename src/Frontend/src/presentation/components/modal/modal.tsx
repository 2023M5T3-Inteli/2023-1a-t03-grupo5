import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react'
import './modal-styles.scss'

import backArrow from '/back-arrow.png'

type Props = {
  closeArrow: boolean;
  closeModal: Function;
  content: ReactJSXElement
}

const Modal = (props: Props) => {
  return (
    <div className='modal'>
      {/* <div>Modal</div> */}
      <div className="modal-container">
        {
          props.closeArrow &&
          <img src={backArrow} alt="seta para voltar" className='backIcon' onClick={() => props.closeModal()} />
        }
        {
          props.content
        }
      </div>
    </div>
  )
}

export default Modal